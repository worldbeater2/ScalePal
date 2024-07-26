import React, { useState, useEffect } from "react"; // Import React and hooks.
import { getDocs, collection, deleteDoc, doc, setDoc, updateDoc, getDoc } from "firebase/firestore"; // Import Firestore functions.
import { db } from "@/firebase/firebase"; // Import Firestore database configuration.
import UploadComponent from "@/firebase/UploadComponent"; // Import the UploadComponent for file uploads.
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  // State variables to manage categories, selected category, documents, and new category name.
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  // useEffect to fetch categories from Firestore when the component mounts.
  useEffect(() => {
    const fetchCategories = async () => {
      // Fetch all documents in the "folders" collection.
      const querySnapshot = await getDocs(collection(db, "folders"));
      const folderDocs = querySnapshot.docs;

      // Extract categories from the fetched documents.
      const fetchedCategories = [];
      folderDocs.forEach((doc) => {
        const data = doc.data();
        Object.keys(data.categories).forEach((key) => {
          fetchedCategories.push({ id: key, ...data.categories[key] });
        });
      });

      // Update the state with fetched categories.
      setCategories(fetchedCategories);
    };

    fetchCategories(); // Call the fetchCategories function.
  }, []); // Empty dependency array ensures this runs only once when the component mounts.

  // useEffect to fetch documents of the selected category from Firestore.
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!selectedCategory) return; // Exit if no category is selected.

      // Fetch documents in the selected category.
      const querySnapshot = await getDocs(
        collection(db, `folders/${selectedCategory}/documents`)
      );
      const fetchedDocuments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update the state with fetched documents.
      setDocuments(fetchedDocuments);
    };

    fetchDocuments(); // Call the fetchDocuments function.
  }, [selectedCategory]); // Depend on selectedCategory, run when it changes.

  // Handle category selection change.
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value; // Get the selected category ID.
    setSelectedCategory(selectedCategoryId); // Update the selected category state.
    setDocuments([]); // Clear documents when category changes.
  };

  // Handle document deletion.
  const handleDelete = async (docId) => {
    // Delete the document from Firestore.
    await deleteDoc(doc(db, `folders/${selectedCategory}/documents/${docId}`));
    // Update state to remove deleted document.
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== docId));
  };

  // Placeholder for document edit functionality.
  const handleEdit = (docId) => {
    // Implement edit functionality here.
    // For example, open a modal with a form to edit the document details.
  };

  // Handle adding a new category.
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return; // Exit if the new category name is empty.

    // Create a category ID from the name by converting to lowercase and replacing spaces with hyphens.
    const newCategoryId = newCategoryName.toLowerCase().replace(/\s+/g, "-");

    try {
      // Reference to the "folders/docs" document.
      const docRef = doc(db, "folders", "docs");
      // Get the document snapshot.
      const docSnap = await getDoc(docRef);

      // If the document doesn't exist, create it with an empty categories object.
      if (!docSnap.exists()) {
        await setDoc(docRef, { categories: {} });
      }

      // Update the categories object with the new category.
      await updateDoc(docRef, {
        [`categories.${newCategoryId}`]: { name: newCategoryName },
      });

      // Update state with the new category.
      setCategories([...categories, { id: newCategoryId, name: newCategoryName }]);
      setNewCategoryName(""); // Clear the input field.
      alert("Category added successfully!"); // Notify the user.
    } catch (error) {
      console.error("Error adding category:", error); // Log any errors.
      alert("Failed to add category."); // Notify the user of failure.
    }
  };

  

  return (
<div className="flex flex-row h-screen justify-center items-center p-10 font-outfit bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(/assets/13.jpg)` }}>
    <div className="p-12  bg-transparent h-[600px] w-[600px] rounded-lg border border-stone-950 ">
      <h2 className="text-xl font-bold mb-4 font-outfit flex flex-row justify-center ">Admin Dashboard</h2>
      
      {/* Category selection dropdown */}
      <div className="mb-4 font-outfit">
        <Label htmlFor="category" className="mr-3">Select Category</Label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add new category form */}
      <div className="mb-4">
        <h3 className="text-sm mb-1 font-normal font-outfit">Add New Category</h3>
        <Input
          type="text"
          placeholder="New Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button className="mt-2"  onClick={handleAddCategory}>Add Category</Button>
      </div>

      {/* Show UploadComponent if a category is selected */}
      {selectedCategory && <UploadComponent categoryId={selectedCategory} />}
      
      {/* Documents list */}
      <div className="mt-8">
        <h3 className="">Documents</h3>
        {documents.length > 0 ? (
          <ul>
            {documents.map((document) => (
              <li key={document.id} className="mb-2">
                <span>{document.name}</span>
                <button
                  className="ml-4 text-red-500"
                  onClick={() => handleDelete(document.id)}
                >
                  Delete
                </button>
                <button
                  className="ml-2 text-blue-500"
                  onClick={() => handleEdit(document.id)}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No documents found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
