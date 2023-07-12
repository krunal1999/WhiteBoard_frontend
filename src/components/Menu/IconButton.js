import styles from './menu.module.css'

const IconButton = props => {
  const { src, type } = props;
  return (
    <button className={styles.button}>
      <img src={src} alt='' width='80%' height='80%' />
    </button>
  );
};

export default IconButton;
