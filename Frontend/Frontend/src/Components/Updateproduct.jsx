import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../Css/UpdateProduct.module.css";

export default function UpdateProduct() {
  const { id } = useParams();
  const [prod, setProd] = useState({});
  const [attributes, setAttributes] = useState({});
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const Navigate=useNavigate()

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get("http://localhost:8080/api/getprod", {
          params: { id },
        });
        setProd(res.data);
        setAttributes(res.data.atrributes || {}); // fix spelling if needed
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    }
    fetch();
  }, [id]);

  function handleAddAttribute(e) {
    e.preventDefault();
    if (newKey && newValue) {
      setAttributes({ ...attributes, [newKey]: newValue });
      setProd({
        ...prod,
        atrributes: { ...prod.atrributes, [newKey]: newValue },
      });
      setNewKey("");
      setNewValue("");
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setProd({ ...prod, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:8080/api/updateprod", prod);
      setProd(res.data);
      alert("Product updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Update Product</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Product Name</label>
        <input
          className={styles.input}
          name="p_name"
          type="text"
          value={prod.p_name || ""}
          onChange={handleInputChange}
        />

        <label className={styles.label}>Price</label>
        <input
          className={styles.input}
          name="price"
          type="text"
          value={prod.price || ""}
          onChange={handleInputChange}
        />

        <label className={styles.label}>Stock</label>
        <input
          className={styles.input}
          name="stocks"
          type="number"
          value={prod.stocks || ""}
          onChange={handleInputChange}
        />

        <h3 className={styles.subheading}>Existing Attributes</h3>
        <div className={styles.attributes}>
          {prod?.atrributes &&
            Object.keys(prod.atrributes).map((key) => (
              <div key={key} className={styles.attributeItem}>
                <span>{key}</span>: <span>{prod.atrributes[key]}</span>
              </div>
            ))}
        </div>

        <div className={styles.addAttributeSection}>
          <h3 className={styles.subheading}>Add New Attribute</h3>
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
          Update Product
        </button>
      </form>
       <button className={styles.submitButton} onClick={()=>Navigate('/')}>Home</button>
    </div>
  );
}
