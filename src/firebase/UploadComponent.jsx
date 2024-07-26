import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UploadComponent = ({ categoryId }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [alternativeName, setAlternativeName] = useState("");
  const [source, setSource] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage,`documents/${categoryId}/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      const docRef = doc(db, "folders","docs");
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, { categories: {} });
      }

      await updateDoc(docRef, {
        [`categories.${categoryId}.documents`]: arrayUnion({
          name: file.name,
          alternativeName: alternativeName || file.name,
          category: categoryId,
          source: source || "Unknown",
          url,
          createdAt: new Date().toISOString(),
          author: "Admin",
          type: file.type,
          size: file.size,
        }),
      });

      setFile(null);
      setAlternativeName("");
      setSource("");
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Input className="hover:cursor-pointer" type="file" onChange={handleFileChange} />
    
      <Input
      className="my-2"
        type="text"
        placeholder="Alternative Name"
        value={alternativeName}
        onChange={(e) => setAlternativeName(e.target.value)}
      />
      <Input
      className="my-2"
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <Button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};

export default UploadComponent;
