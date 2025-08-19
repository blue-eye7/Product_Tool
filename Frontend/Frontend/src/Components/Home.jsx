import { Link, useNavigate } from "react-router-dom";
import styles from "../Css/Home.module.css";
import { useSelector } from "react-redux";

export default function Home() {
  const navigate = useNavigate();

  const { userdata, authed } = useSelector(state => state.LoginReducer);
  if(!authed){
    return(<h1><Link to={'/login'}>Login first</Link></h1>)
  }

  return (
    <div className={styles.container}>
      <h1>welcome:{userdata.name}</h1>
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
