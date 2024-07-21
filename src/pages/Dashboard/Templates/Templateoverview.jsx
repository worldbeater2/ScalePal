import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";



const TemplateOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValidId, setIsValidId] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "folders"));
        const folderDocs = querySnapshot.docs;

        if (folderDocs.length > 0) {
          const fetchedCategories = [];
          folderDocs.forEach((doc) => {
            const data = doc.data();
            Object.keys(data.categories).forEach((key) => {
              fetchedCategories.push({ id: key, ...data.categories[key] });
            });
          });
          setCategories(fetchedCategories);
        } else {
          setIsValidId(false);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isValidId) {
    return (
      <div>
        No data found for ID: {id}
        <button onClick={() => navigate("/dashboard/templates")}>
          Go back to Templates
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10">
    {categories.map((category) => (
      <Card
        key={category.id}
        className="w-[200px] hover:cursor-pointer p-5 text-prussianblue hover:border-prussianblue hover:bg-prussianblue hover:text-white"
      >
        <Link to={`/dashboard/templates/${category.id}/documents`}>
      
          <CardHeader className="flex flex-row items-center justify-center">
            <CardTitle className="text-sm font-semibold md:text-sm ml-2 hover:cursor-pointer">
              {category.name}
            </CardTitle>
          </CardHeader>
        </Link>
        
      </Card>
    ))}
  </div>
  );
};

export default TemplateOverview;
