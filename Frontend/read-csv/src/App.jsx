import React, { useState } from "react";
import axios from "axios";
const App = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a CSV file.");

    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/createVariant/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log("Server Response:", res.data);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} />
      <button type="submit">Upload File</button>
    </form>
  );
};

export default App;
