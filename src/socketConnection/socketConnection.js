import { io } from "socket.io-client";
import { store } from "../redux/store/store";
import {
  setElements,
  updateElementInStore,
  clearWhiteboard,
} from "../redux/slices/whiteboardSlice";

let socket;

// Function to generate a unique ID for elements
const generateUniqueId = () => {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const connectWithSocketServer = () => {
  socket = io("http://localhost:5000");

  socket.on("connect", () => {
    console.log("connected to socket server");
  });

  // Request the current state of the whiteboard when connected
  socket.emit("request-whiteboard-state");

  // Listen for the current whiteboard state
  socket.on("whiteboard-state", (elements) => {
    // console.log("Received whiteboard-state:", elements);

    // Ensure the elements are sanitized to match the structure expected by the backend
    const sanitizedElements = elements.map((element) => ({
      id: element.id || generateUniqueId(),
      type: element.type || "unknown",
      roughElement: element.roughElement || {}, // Ensure roughElement is always present
      x1: element.x1 || 0, // Ensure coordinates are always present
      y1: element.y1 || 0,
      x2: element.x2 || 0,
      y2: element.y2 || 0,
    }));

    // Dispatch the sanitized elements to the Redux store
    store.dispatch(setElements(sanitizedElements));
  });

  // Listen for updates to individual elements
  socket.on("element-update", (elementData) => {
    // console.log("Received element-update:", elementData);
    // Update the specific element in the Redux store
    store.dispatch(updateElementInStore(elementData));
  });

  // Listen for the whiteboard-clear event to clear the whiteboard
  socket.on("whiteboard-clear", () => {
    console.log("Whiteboard cleared");
    store.dispatch(clearWhiteboard());
  });
};

// Emit an element update to the backend
export const emitElementUpdate = (elementData) => {
  // console.log("Emitting element-update:", elementData);
  // Ensure the element data has all necessary properties
  const fullElementData = {
    ...elementData,
    roughElement: elementData.roughElement || {}, // Ensure roughElement is included
    x1: elementData.x1 || 0,
    y1: elementData.y1 || 0,
    x2: elementData.x2 || 0,
    y2: elementData.y2 || 0,
  };

  socket.emit("element-update", fullElementData);
};

// Emit a whiteboard-clear event to clear the whiteboard
export const emitClearWhiteBoard = () => {
  socket.emit("whiteboard-clear");
};

// Close the socket connection
export const closeConnection = () => {
  socket.disconnect();
};
