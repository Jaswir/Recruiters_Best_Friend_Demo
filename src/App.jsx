import { useState } from 'react'
import React from 'react';


function App() {
  const [file, setFile] = useState(null); // State to hold the uploaded file

  // Function to handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Function to handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files[0]);
  };

  // Function to handle drag over
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (

    <div class="flex flex-col items-center justify-center w-full">

      <input type="file" id="file-input" name="file-input" class="py-5" />

      <textarea
        class="flex w-1/3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px] py-2"
        id="input"
        placeholder="Enter your text here."
      ></textarea>

      <div class="flex flex-row items-center py-5">
        <input
          type="search"
          id="text-input"
          name="text-input"
          class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Ask question..."
          required
        />

        <button class="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
          Send
        </button>
      </div>

    </div>
  );
}

export default App
