import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../Css/Category.module.css";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [products, setProducts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getcat")
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const toggleProducts = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
      return;
    }

    setExpandedCategory(categoryId);

    if (!products[categoryId]) {
      axios
        .get(`http://localhost:8080/api/getprodbycat`, {
          params: { id: categoryId },
        })
        .then((response) => {
          setProducts((prevProducts) => ({
            ...prevProducts,
            [categoryId]: response.data,
          }));
          console.log(response.data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Categories</h2>
      <ul className={styles.categoryList}>
        {categories.map((cat) => (
          <li key={cat.id} className={styles.categoryItem}>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryName}>{cat.category}</span>
              <button
                className={styles.toggleButton}
                onClick={() => toggleProducts(cat.id)}
              >
                {expandedCategory === cat.id ? "Hide Products" : "Show Products"}
              </button>
            </div>

            {expandedCategory === cat.id && products[cat.id] && (
              <div className={styles.productList}>
                {products[cat.id].map((prod) => (
                  <div key={prod.id} className={styles.productCard}>
                    <h3 className={styles.productName}>{prod.p_name}</h3>
                    <p className={styles.productPrice}>Price: ₹{prod.price}</p>
                    <p className={styles.productStock}>Stock: {prod.stock}</p>
                    <div className={styles.attributes}>
                      {Object.keys(prod.atrributes).map((key, idx) => (
                        <p key={idx} className={styles.attributeItem}>
                          {key}: {prod.atrributes[key]}
                        </p>
                      ))}
                    </div>
                    <button
                      className={styles.modifyButton}
                      onClick={() => navigate(`/updateproduct/${prod.id}`)}
                    >
                      Modify Product
                    </button>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
