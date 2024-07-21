import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";


const DisplayDocument = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isValidId, setIsValidId] = useState(true);
  
    useEffect(() => {
      const fetchDocuments = async () => {
        try {
          const docRef = doc(db, "folders", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.categories && data.categories[id]) {
              setDocuments(data.categories[id].documents || []);
            } else {
              setIsValidId(false);
            }
          } else {
            setIsValidId(false);
          }
        } catch (error) {
          console.error("Error fetching documents:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchDocuments();
    }, [id]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!isValidId) {
      return (
        <div>
          No data found for category ID: {id}
          <button onClick={() => navigate("/dashboard/templates")}>
            Go back to Templates
          </button>
        </div>
      );
    }
  
    return (
      <div className="p-10">
        <button onClick={() => navigate("/dashboard/templates")} className="mb-4">
          Go back to Templates
        </button>
        <h2 className="text-xl font-bold mb-4">Documents</h2>
        {documents.length > 0 ? (
          <ul>
            {Object.keys(documents).map((docId) => (
              <li key={docId}>
                <a href={documents[docId].url} target="_blank" rel="noopener noreferrer">
                  {documents[docId].name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div>No documents found.</div>
        )}
      </div>
    );
}

export default DisplayDocument;