import { useState } from "react";
import axios from "axios";
import styles from "../Css/Login.module.css";

export default function Login() {
  const initialData = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialData);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.username === "" || formData.password === "") {
      alert("Enter the username and password");
      return;
    }

    try {
      let res = await axios.post("http://localhost:8080/api/login", formData);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="username" className={styles.label}>
          Enter the Username
        </label>
        <input
          name="username"
          id="username"
          value={formData.username}
          placeholder="Enter the username"
          onChange={handleChange}
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>
          Enter the Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          placeholder="Enter the password"
          onChange={handleChange}
          className={styles.input}
        />

        <button className={styles.button}>Login</button>
      </form>
    </div>
  );
}
