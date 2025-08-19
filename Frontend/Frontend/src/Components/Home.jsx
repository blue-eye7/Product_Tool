import { useNavigate } from "react-router-dom";
import styles from "../Css/Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Dashboard</h1>
      <div className={styles.buttonGroup}>
        <button
          className={styles.btn}
          onClick={() => navigate("/category")}
        >
          View Categories
        </button>
        <button
          className={styles.btn}
          onClick={() => navigate("/addproducts")}
        >
          Add Products
        </button>
      </div>
    </div>
  );
}
