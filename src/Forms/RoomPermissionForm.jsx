import { useState } from "react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { summarizeText } from "../utils/summarize";
import { motion } from "framer-motion";

export const RoomPermissionForm = ({ onFormDataChange }) => {
  const [formData, setFormData] = useState({
    society: "",
    eventName: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
    toTime: "",
    roomNumber: "",
    department: "",
    eventDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onFormDataChange(updatedData);
  };

  const handleSummarize = async () => {
    const inputText = `
      Society: ${formData.society}
      Event Name : ${formData.eventName}
      on Date: ${formData.fromDate} to ${formData.toDate}
      Timings of the event will be from : ${formData.fromTime} to ${formData.toTime}
      Room Number: ${formData.roomNumber}
      Department: ${formData.department}
      for the interested students of the college.
    `;
    try {
      const summary = await summarizeText(inputText);
      handleChange({ target: { name: "eventDescription", value: summary } });
    } catch (error) {
      console.error(error);
    }
  };

  const formFields = [
    { label: "Name of Society", name: "society", type: "text" },
    { label: "Event Name", name: "eventName", type: "text" },
    { label: "From Date", name: "fromDate", type: "date" },
    { label: "To Date", name: "toDate", type: "date" },
    { label: "From Time", name: "fromTime", type: "time" },
    { label: "To Time", name: "toTime", type: "time" },
    { label: "Room Number", name: "roomNumber", type: "text" },
    { label: "Department", name: "department", type: "text" },
    {
      label: "Brief Event Description",
      name: "eventDescription",
      type: "textarea",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`space-y-2 ${
              field.type === "textarea" ? "md:col-span-2" : ""
            }`}
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
                className="w-full resize-none "
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-end pt-4"
      >
        <Button onClick={handleSummarize} className="w-full transition-colors">
          Generate Event Description
        </Button>
      </motion.div>
    </div>
  );
};
