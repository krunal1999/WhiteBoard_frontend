import React, { useEffect } from "react";
import Whiteboard from "./components/Whiteboard/Whiteboard";
import {
  connectWithSocketServer,
  closeConnection,
} from "./socketConnection/socketConnection";

function App() {
  useEffect(() => {
    connectWithSocketServer();
    return () => {
      closeConnection();
    };
  }, []);

  return (
    <div>
      <Whiteboard />
    </div>
  );
}

export default App;
