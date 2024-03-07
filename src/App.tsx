import NeoGrid from './Grid';
import styles from './App.module.css'
import { useEffect } from 'react';

const App = () => {
  const title = "Near-Earth Object Overview";

  useEffect(() => {
    document.title = title
  }, []);

  return (
    <div>
      <div className={styles.navbar}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <NeoGrid />
    </div>
  );
}

export default App;
