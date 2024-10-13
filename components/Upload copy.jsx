import React, { useState } from 'react';
import mqtt from 'mqtt';

const UploadFormMq = () => {
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
    
    const client = mqtt.connect('ws://64.23.134.94:9001');

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      
      const reader = new FileReader();
      reader.onload = function() {
        const fileData = new Uint8Array(reader.result); // Convert file to binary
        client.publish('file/print', fileData);  // Publish to 'file/print' topic
        setMessage('File uploaded and sent for printing.');
      };
      reader.readAsArrayBuffer(file);  // Read file as an ArrayBuffer
    });

    client.on('error', (error) => {
      setMessage('Failed to connect to MQTT broker: ' + error.message);
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Upload PDF to Print</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-lg text-gray-600 border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out"
        />
        <button
          type="submit"
          className="w-full py-3 px-6 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200 ease-in-out"
        >
          Upload and Print
        </button>
      </form>
      {message && (
        <p className="mt-6 text-lg text-center text-green-600 font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

export default UploadFormMq;
