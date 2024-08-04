import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File, Loader2 } from "lucide-react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import mammoth from "mammoth";
import "./DisplayDocument.css";

// Function to parse RTF content to HTML
const parseRTF = (rtfContent) => {
  return mammoth.convertToHtml({
    arrayBuffer: rtfContent,
    preserveEmptyParagraphs: true,
    styleMap: [
      "p[style-name='List Paragraph'] => ul > li:fresh",
      "p[style-name='Bullet'] => ul > li:fresh"
    ]
  })
    .then(result => {
      let processedHTML = result.value
        .replace(/<p>\s*<\/p>/g, '<p>&nbsp;</p>')
        .replace(/<li>\s*<\/li>/g, '<li>&nbsp;</li>');

      return processedHTML;
    })
    .catch(error => {
      console.error("Error parsing RTF content:", error);
      return "";
    });
};

// Function to convert HTML to EditorJS blocks
const parseHTMLToBlocks = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const blocks = [];

  doc.body.childNodes.forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      switch (node.tagName.toLowerCase()) {
        case 'p':
          blocks.push({
            type: 'paragraph',
            data: { text: node.innerHTML }
          });
          break;
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
          blocks.push({
            type: 'header',
            data: {
              text: node.textContent,
              level: parseInt(node.tagName.charAt(1))
            }
          });
          break;
        case 'ul':
        case 'ol':
          blocks.push({
            type: 'list',
            data: {
              style: node.tagName.toLowerCase() === 'ul' ? 'unordered' : 'ordered',
              items: Array.from(node.children).map(li => li.innerHTML)
            }
          });
          break;
        default:
          console.log('Unhandled tag:', node.tagName);
      }
    }
  });

  return blocks;
};

// Main DisplayDocument component
const DisplayDocument = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValidId, setIsValidId] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const editorInstance = useRef(null);
  const editorContainer = useRef(null);
  const { setShowBreadcrumbs } = useOutletContext();

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

  useEffect(() => {
    if (showEditor && selectedDocument) {
      const fetchDocumentContent = async () => {
        try {
          const response = await fetch(selectedDocument.url);
          const arrayBuffer = await response.arrayBuffer();
          const parsedHTML = await parseRTF(arrayBuffer);

          if (editorInstance.current) {
            editorInstance.current.destroy();
          }

          editorInstance.current = new EditorJS({
            holder: editorContainer.current,
            tools: {
              header: {
                class: Header,
                inlineToolbar: ['link']
              },
              list: {
                class: List,
                inlineToolbar: true
              },
              paragraph: {
                class: Paragraph,
                inlineToolbar: true
              }
            },
            data: {
              blocks: parseHTMLToBlocks(parsedHTML)
            },
            onReady: () => {
              console.log('Editor.js is ready to work!');
            },
            onChange: (api, event) => {
              console.log('Content changed');
            },
            autofocus: true,
            placeholder: 'Start writing here...',
            defaultBlock: 'paragraph'
          });
        } catch (error) {
          console.error("Error fetching or parsing content:", error);
        }
      };

      fetchDocumentContent();
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, [showEditor, selectedDocument]);

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
    setShowEditor(true);
    setShowBreadcrumbs(false);
  };

  const handleBackClick = () => {
    setShowEditor(false);
    setSelectedDocument(null);
    setShowBreadcrumbs(true);
  };

  const handleSaveClick = () => {
    console.log("Save button clicked");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-prussianblue" />
      </div>
    );
  }

  if (!isValidId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg mb-4">No data found for category ID: {id}</p>
        <Button
          size="sm"
          onClick={() => navigate("/dashboard/templates")}
          className="bg-prussianblue hover:bg-prussianblue/90 text-white"
        >
          Go back to Templates
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-5 py-8">
      {showEditor && selectedDocument ? (
        <div className="flex flex-col min-h-screen">
          <div className="flex justify-between items-center p-4 bg-gray-100">
            <button
              onClick={handleBackClick}
              className="text-prussianblue hover:underline text-sm font-outfit"
            >
              Back
            </button>
            <h3 className="text-sm font-normal tracking-normal text-prussianblue">
              {selectedDocument.alternativeName || selectedDocument.name}
            </h3>
            <button
              onClick={handleSaveClick}
              className="text-prussianblue hover:underline text-sm font-outfit"
            >
              Save
            </button>
          </div>
          <div className="flex-grow p-4">
            <div ref={editorContainer} className="editor-container w-full" />
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-normal font-semibold text-prussianblue mb-6">
            Explore Documents
          </h2>

          {documents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
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
            <p className="text-lg text-prussianblue">
              No documents found <span className="animate-pulse">😕</span>
            </p>
          )}

          <div className="mt-12 flex flex-row items-end justify-center">
            <Button
              size="sm"
              onClick={() => navigate("/dashboard/templates")}
              className="bg-prussianblue hover:bg-prussianblue/90 text-white"
            >
              Go back to Templates
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayDocument;
