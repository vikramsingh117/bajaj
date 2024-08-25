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
      <div key={option.value} style={{ marginTop: '20px' }}>
        <h3 style={{ color: '#333' }}>{option.label}</h3>
        <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
          {JSON.stringify(responseData[option.value], null, 2)}
        </pre>
      </div>
    ));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#0070f3' }}>Enter JSON Input</h1>
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        rows="5"
        style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' }}
        placeholder='{
  "data": ["1", "2", "3", "a", "b", "C", "d"]
}'
      />
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      <button onClick={handleSubmit} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Submit
      </button>

      {responseData && (
        <>
          <h2 style={{ color: '#0070f3' }}>Select Response Data</h2>
          <Select
            isMulti
            options={options}
            onChange={handleSelectChange}
            closeMenuOnSelect={false}
            styles={{
              container: (provided) => ({
                ...provided,
                marginTop: '10px',
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 9999,
              }),
            }}
          />
          <div style={{ marginTop: '20px' }}>
            {renderResponse()}
          </div>
        </>
      )}
    </div>
  );
}
