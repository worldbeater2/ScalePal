import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Card } from "@/components/ui/card";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";

const DisplayDocument = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValidId, setIsValidId] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docRef = doc(db, "folders", "docs");
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
        setIsValidId(false);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [id]);

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
    setShowPdf(true);
  };

  const handleBackClick = () => {
    setShowPdf(false);
    setSelectedDocument(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px] mt-6">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (!isValidId) {
    return (
      <div className="mt-6">
        No data found for category ID: {id}
        <div className="mt-5 flex justify-center">
          <Button
            size="sm"
            onClick={() => navigate("/dashboard/templates")}
            className="mb-4 bg-prussianblue hover:bg-prussianblue text-sm bg-opacity-90"
          >
            Go back to Templates
          </Button>
        </div>
      </div>
    );
  }

  if (showPdf && selectedDocument) {

    return (
      <div className="flex flex-col items-center justify-center h-screen mt-7">
        <h3 className="text-sm font-semibold mb-2 text-center font-outfit  text-prussianblue underline">
          {selectedDocument.alternativeName || selectedDocument.name}
        </h3>
        <iframe
          src={`${selectedDocument.url}#toolbar=0`}
          width="793.7px"
          height="1122.52px"
          style={{ border: "none" }}
          title={selectedDocument.name}
        />
        <Button
          size="sm"
          onClick={handleBackClick}
          className="mt-4 bg-prussianblue hover:bg-prussianblue text-sm bg-opacity-90"
        >
          Go back
        </Button>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-base tracking-tighter text-prussianblue font-normal mt-8">
        Explore Documents
      </h2>

      {documents.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10">
          {documents.map((document) => (
            <Card
              key={document.name}
              className="w-[250px] hover:cursor-pointer p-2 flex text-prussianblue hover:border-prussianblue hover:bg-prussianblue hover:text-white"
              onClick={() => handleDocumentClick(document)}
            >
              <File size={24} strokeWidth={1} />
              <CardHeader className="flex flex-row items-center justify-center">
                <CardTitle className="text-sm font-normal md:text-sm ml-2 hover:cursor-pointer">
                  {document.alternativeName || document.name}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-base text-prussianblue mt-6">
          No documents found <span className="animate-pulse">😕</span>.
        </div>
      )}

      <div className="mt-5 flex justify-center">
        <Button
          size="sm"
          onClick={() => navigate("/dashboard/templates")}
          className="mb-4 bg-prussianblue hover:bg-prussianblue text-sm bg-opacity-90"
        >
          Go back to Templates
        </Button>
      </div>
    </>
  );
};

export default DisplayDocument;
