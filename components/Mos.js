import { useState, useEffect } from 'react';
import mqtt from 'mqtt';

export default function MqttPublisher() {
  const [message, setMessage] = useState('');
  const [client, setClient] = useState(null);

  useEffect(() => {
    const mqttClient = mqtt.connect('ws://64.23.134.94:9001');
    setClient(mqttClient);

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  const sendMessage = () => {
    if (client) {
      client.publish('test/topic', message);
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center p-40 ">
      <div className="bg-blue-200 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">MQTT Publisher</h1>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        
        <button
          onClick={sendMessage}
          className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Send Message
        </button>

        <p className="mt-4 text-gray-600 text-center">{message ? `Message: ${message}` : 'Enter a message to publish'}</p>
      </div>
    </div>
  );
}
