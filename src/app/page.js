"use client";  // Add this line at the top

import { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const validateJson = (input) => {
    try {
      const parsed = JSON.parse(input);
      if (parsed.data && Array.isArray(parsed.data)) {
        return parsed;
      } else {
        throw new Error('Invalid JSON structure');
      }
    } catch (e) {
      throw new Error('Invalid JSON format');
    }
  };

  const handleSubmit = async () => {
    try {
      const validJson = validateJson(jsonInput);
      setError('');

      const response = await axios.post('/api/bfhl', validJson);
      setResponseData(response.data);
    } catch (error) {
      setError(error.message);
      setResponseData(null);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!responseData || selectedOptions.length === 0) return null;

    return selectedOptions.map(option => (
      <div key={option.value}>
        <h3>{option.label}</h3>
        <pre>{JSON.stringify(responseData[option.value], null, 2)}</pre>
      </div>
    ));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Enter JSON Input</h1>
      <textarea 
        value={jsonInput} 
        onChange={handleInputChange} 
        rows="5" 
        style={{ width: '100%', padding: '10px' }} 
        placeholder='{"data": ["A", "C", "z"]}'
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSubmit} style={{ marginTop: '10px', padding: '10px 20px' }}>
        Submit
      </button>

      {responseData && (
        <>
          <h2>Select Response Data</h2>
          <Select
            isMulti
            options={options}
            onChange={handleSelectChange}
            closeMenuOnSelect={false}
          />
          <div style={{ marginTop: '20px' }}>
            {renderResponse()}
          </div>
        </>
      )}
    </div>
  );
}
