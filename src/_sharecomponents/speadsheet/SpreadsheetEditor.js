import React, { useState } from 'react';
import Spreadsheet from 'react-spreadsheet';

const SpreadsheetEditor = () => {
  // Initialize the data as a 32x7 grid filled with empty strings
  const [data, setData] = useState(
    Array(32).fill().map(() => Array(7).fill('')) // 32 rows, 7 columns filled with empty strings
  );

  // Handle the data change in the spreadsheet
  const handleDataChange = (newData) => {
    setData(newData); // Update state with the modified data
  };

  // Handle saving the data as a string (JSON format or simple string)
  const handleSave = () => {
    const stringifiedData = JSON.stringify(data); // Convert the data to a JSON string
    console.log('Saved Data as String:', stringifiedData);

    // Here, you can send the stringified data to your backend or store it locally
  };

  return (
    <Spreadsheet
        data={data} // Pass the data as a prop
        onChange={handleDataChange} // Handle cell changes
      />
  );
};

export default SpreadsheetEditor;
