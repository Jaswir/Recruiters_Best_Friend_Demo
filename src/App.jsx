import React, { useRef, useState } from 'react';
import axios from 'axios';

function App() {

  const textInputRef = useRef(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {

    const queryInput = textInputRef.current.value;
    console.log('Query:', queryInput);

    setLoading(true);

    axios.get(`https://recruiters-best-friend-backend.vercel.app/query/?prompt=${queryInput}`)
      .then(response => {
        // Handle the response
        console.log(response.data);
        setResponse(response.data.result);
        setLoading(false);
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
        setLoading(false);
      });

  };

  return (

    <div className="flex flex-col items-center justify-center w-full">

      <input type="file" id="file-input" name="file-input" className="py-5" />

      <textarea
        className="flex w-1/2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px] py-2"
        id="input"
        value={response}
      ></textarea>

      <div className="flex flex-row items-center py-5 w-1/2">
        <input
          type="search"
          id="text-input"
          name="text-input"
          className="block w-full p-3 text-sm border text-black border-gray-300 rounded-lg dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your question here"
          ref={textInputRef}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
          onClick={handleButtonClick}
          disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>

    </div>
  );
}

export default App
