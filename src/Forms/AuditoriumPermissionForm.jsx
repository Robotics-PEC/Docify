import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { summarizeText } from "../utils/summarize";
import { motion } from "framer-motion";

export const AuditoriumPermissionForm = ({ onFormDataChange }) => {
  const [formData, setFormData] = useState({
    society: "",
    eventName: "",
    fromDateTime: "",
    toDateTime: "",
    eventDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onFormDataChange(updatedData);

    sessionStorage.setItem("formData", JSON.stringify(updatedData));
    sessionStorage.setItem("type", "AuditoriumPermission");
  };

  // const handleSummarize = async () => {
  //   console.log("hi");
  //   const inputText = `
  //     Society: ${formData.society}
  //     Event Name : ${formData.eventName}
  //     Timings of the event will be from : ${formData.fromDateTime} to ${formData.toDateTime}
  //     for the interested students of the college.
  //   `;

  //   console.log({inputText});
  //   try {
  //     const summary = await summarizeText(inputText);
  //     console.log({summary});
  //     // handleChange({ target: { name: "eventDescription", value: summary } });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const formFields = [
    { label: "Name of Club/Tech. Society/NSS/NCC/Department/Others", name: "society", type: "textarea" },
    { label: "Event Name", name: "eventName", type: "textarea" },
    { label: "From Date & Time", name: "fromDateTime", type: "datetime-local" },
    { label: "To Date & Time", name: "toDateTime", type: "datetime-local" },
    {
      label: "Brief Event Description",
      name: "eventDescription",
      type: "textarea",
    }
  ];

  useEffect(() => {
    const type = sessionStorage.getItem("type");

    if(type && type === "AuditoriumPermission") {
      const form = sessionStorage.getItem("formData");

      if(form) {
        const parsed = JSON.parse(form);
        setFormData(parsed);
        onFormDataChange(parsed);
      }
    }
  }, []);

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
    </div>
  );
};
