import { useState, useEffect } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./components/ui/select";
import { Label } from "./components/ui/label";
import { RoomPermission } from "./Documents/RoomPermission";
import { Letter } from "./Documents/Letter";
import { RoomPermissionForm } from "./Forms/RoomPermissionForm";
import LetterForm from "./Forms/LetterForm";
import PaperViewer from "./PaperViewer";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  const [formData, setFormData] = useState({});
  const [documentType, setDocumentType] = useState("RoomPermission");
  const [isMobile, setIsMobile] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(async () => {
      const generatePdfBlob = async () => {
        const DocumentComponent =
          documentType === "RoomPermission" ? RoomPermission : Letter;
        const blob = await pdf(
          <DocumentComponent formData={formData} />
        ).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      };

      generatePdfBlob();
    }, 500);

    setDebounceTimer(newTimer);

    return () => {
      clearTimeout(newTimer);
    };
  }, [formData, documentType]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow px-6 py-12 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Docify</h1>
            <p className="text-xl text-muted-foreground">
              Create documents with ease
            </p>
          </div>

          <div className=" bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="flex flex-col lg:flex-row min-h-[700px]">
              {/* Form Section */}
              <div className="lg:w-[400px] p-8 border-r border-gray-100">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="documentType" className="text-gray-700">
                      Select Document Type
                    </Label>
                    <Select
                      onValueChange={setDocumentType}
                      value={documentType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RoomPermission">
                          Room Permission
                        </SelectItem>
                        <SelectItem value="Letter">
                          Application Letter
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {documentType === "RoomPermission" ? (
                    <RoomPermissionForm onFormDataChange={setFormData} />
                  ) : (
                    <LetterForm onFormDataChange={setFormData} />
                  )}
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <PDFDownloadLink
                    document={
                      documentType === "RoomPermission" ? (
                        <RoomPermission formData={formData} />
                      ) : (
                        <Letter formData={formData} />
                      )
                    }
                    fileName={`${documentType}.pdf`}
                  >
                    {({ loading }) => (
                      <Button
                        className="w-full transition-colors"
                        disabled={loading}
                      >
                        {loading ? "Preparing Download..." : "Download PDF"}
                      </Button>
                    )}
                  </PDFDownloadLink>
                </div>
              </div>

              {/* PDF Viewer Section */}
              {!isMobile && pdfUrl && (
                <div className="flex-1 p-8 bg-gray-50 rounded-r-2xl">
                  <div className="h-full">
                    <PaperViewer url={pdfUrl} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
