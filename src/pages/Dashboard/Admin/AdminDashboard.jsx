import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import UploadComponent from "@/firebase/UploadComponent";

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "folders"));
      const folderDocs = querySnapshot.docs;

      const fetchedCategories = [];
      folderDocs.forEach((doc) => {
        const data = doc.data();
        Object.keys(data.categories).forEach((key) => {
          fetchedCategories.push({ id: key, ...data.categories[key] });
        });
      });

      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
  };

  return (
    <div className="p-10">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-4">
        <label htmlFor="category">Select Category</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {selectedCategory && <UploadComponent categoryId={selectedCategory} />}
    </div>
  );
};

export default AdminDashboard;

