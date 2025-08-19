import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Css/AddProduct.module.css";
import { useNavigate } from "react-router-dom";

export default function Addproduct() {
  const initialProd = {
    p_name: "",
    price: "",
    stocks: "",
    atrributes: {},
  };
  const Navigate=useNavigate()

  const [prod, setProd] = useState(initialProd);
  const [cat, setCat] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [catid, setCatid] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get("http://localhost:8080/api/getcat");
        setCat(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories();
  }, []);

  function handleChange(e) {
    if (e.target.name === "category") {
      setCatid(e.target.value);
      return;
    }
    setProd({ ...prod, [e.target.name]: e.target.value });
  }

  async function handleAddCat(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/addcat?category=${newCat}`
      );
      setCat([...cat, res.data]);
      setShowAdd(false);
      setNewCat("");
    } catch (err) {
      console.log("Error adding category:", err);
    }
  }

  function handleAddAttribute(e) {
    e.preventDefault();
    if (newKey && newValue) {
      const updatedAttributes = { ...prod.atrributes, [newKey]: newValue };
      setProd({ ...prod, atrributes: updatedAttributes });
      setNewKey("");
      setNewValue("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!prod.p_name || !prod.price || !prod.stocks || !catid) {
      alert("Please fill all fields and select a category");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/addprod?c_id=${catid}`,
        prod
      );
      console.log("Product added:", res.data);
      setProd(initialProd);
      setCatid("");
    } catch (err) {
      console.log("Error adding product:", err);
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add New Product</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Product Name</label>
        <input
          className={styles.input}
          name="p_name"
          type="text"
          value={prod.p_name}
          onChange={handleChange}
        />

        <label className={styles.label}>Price</label>
        <input
          className={styles.input}
          name="price"
          type="number"
          value={prod.price}
          onChange={handleChange}
        />

        <label className={styles.label}>Available Stocks</label>
        <input
          className={styles.input}
          name="stocks"
          type="number"
          value={prod.stocks}
          onChange={handleChange}
        />

        <label className={styles.label}>Select Category</label>
        <select
          className={styles.select}
          name="category"
          value={catid}
          onChange={handleChange}
        >
          <option value="">Select the category</option>
          {cat.map((c) => (
            <option key={c.id} value={c.id}>
              {c.category}
            </option>
          ))}
        </select>

        <button
          type="button"
          className={styles.addCatButton}
          onClick={() => setShowAdd(true)}
        >
          + Add New Category
        </button>

        {showAdd && (
          <div className={styles.newCategoryBox}>
            <h3>Enter New Category</h3>
            <input
              className={styles.input}
              type="text"
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
            />
            <button className={styles.addButton} onClick={handleAddCat}>
              Add Category
            </button>
          </div>
        )}

        <h3 className={styles.subheading}>Attributes:</h3>
        <div className={styles.attributesList}>
          {Object.keys(prod.atrributes).map((key) => (
            <p key={key}>
              {key}: {prod.atrributes[key]}
            </p>
          ))}
        </div>

        <div className={styles.addAttributeSection}>
          <h4>Add Attribute</h4>
          <input
            className={styles.input}
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="Enter key"
          />
          <input
            className={styles.input}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter value"
          />
          <button className={styles.addButton} onClick={handleAddAttribute}>
            Add Attribute
          </button>
        </div>

        <button type="submit" className={styles.submitButton}>
          Add Product
        </button>
      </form>
      <button className={styles.addButton} onClick={()=>Navigate('/')}>Home</button>
    </div>
  );
}
