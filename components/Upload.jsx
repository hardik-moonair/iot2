import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
// import { Button } from 'components/ui';

const UploadForm= () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://f00a-103-72-6-42.ngrok-free.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error || 'An error occurred.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-2xl mb-5">Upload PDF to Print</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-5"
        />
        
        <button onClick={handleSubmit}>
        <h1 >Upload and Print</h1></button>
      </form>
      {message && <p className="mt-5">{message}</p>}
    </div>
  );
};

export default UploadForm;
