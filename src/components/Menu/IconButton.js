import styles from './menu.module.css';

const IconButton = props => {
  const { src, type, handleToolChange, active } = props;
  return (
    <button
      className={active ? styles.button_active : styles.button}
      onClick={() => handleToolChange(type)}
    >
      <img src={src} alt='' width='80%' height='80%' />
    </button>
  );
};

export default IconButton;
