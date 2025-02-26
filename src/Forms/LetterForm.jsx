import { useState } from "react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { summarizeText } from "../utils/summarize";
import { motion } from "framer-motion";

const LetterForm = ({ onFormDataChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    receiver: "",
    receiver2: "",
    date: "",
    subject: "",
    respected: "",
    signatory1: "",
    signatory2: "",
    signatory3: "",
    signatory4: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onFormDataChange(updatedData);
  };

  const handleSummarize = async () => {
    const inputText = `
      Receiver: ${formData.receiver}
      Message: ${formData.message}
    `;
    try {
      const summary = await summarizeText(inputText);
      handleChange({ target: { name: "subject", value: summary } });
    } catch (error) {
      console.error(error);
    }
  };

  const mainFields = [
    { label: "To,", name: "receiver", type: "textarea" },
    { label: "Through,", name: "receiver2", type: "textarea" },
    { label: "Date", name: "date", type: "date" },
    { label: "Subject", name: "subject", type: "text" },
    { label: "Respected", name: "respected", type: "text" },
    { label: "Message", name: "message", type: "textarea" },
  ];

  const signatoryFields = [
    { label: "Signatory 1", name: "signatory1" },
    { label: "Signatory 2", name: "signatory2" },
    { label: "Signatory 3", name: "signatory3" },
    { label: "Signatory 4", name: "signatory4" },
  ];

  return (
    <div className="space-y-6">
      {/* Main Fields */}
      <div className="grid grid-cols-1 gap-6">
        {mainFields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <Label
              htmlFor={field.name}
              className="text-sm font-medium text-gray-700"
            >
              {field.label}
            </Label>
            {field.type === "textarea" ? (
              <Textarea
                id={field.name}
                name={field.name}
                rows={4}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full "
                placeholder={`Enter ${field.label.toLowerCase()}...`}
              />
            ) : (
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={`Enter ${field.label.toLowerCase()}...`}
                className="w-full "
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Signatories Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100"
      >
        {signatoryFields.map((field, index) => (
          <div key={field.name} className="space-y-2">
            <Label
              htmlFor={field.name}
              className="text-sm font-medium text-gray-700"
            >
              {field.label}
            </Label>
            <Textarea
              id={field.name}
              name={field.name}
              rows={3}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full "
              placeholder={`Enter ${field.label.toLowerCase()}...`}
            />
          </div>
        ))}
      </motion.div>

      {/* Generate Subject Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-end pt-4"
      >
        <Button
          onClick={handleSummarize}
          type="button"
          className="w-full transition-colors"
        >
          Generate Subject
        </Button>
      </motion.div>
    </div>
  );
};

export default LetterForm;
