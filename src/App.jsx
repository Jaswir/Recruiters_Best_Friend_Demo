import React, { useRef, useState } from 'react';
import axios from 'axios';

function App() {

  const textInputRef = useRef(null);
  const [company, setCompany] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

  const handleButtonClick = async () => {

    const queryInput = textInputRef.current.value;
    console.log('Query:', queryInput);

    setLoading(true);

    axios.get(
      `https://recruiters-best-friend-backend.vercel.app/query/?prompt=${queryInput}&company=${company}`)
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

  const uploadFile = async () => {

    const formData = new FormData();
    formData.append('uploaded_file', file);

    axios.post(`https://recruiters-best-friend-backend.vercel.app/upload/?company=${company}`,
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const handleFileChange = async (event) => {
    setFile(event.target.files[0]);
  };

  return (

    <div className="flex flex-col items-center justify-center w-full">




      <input className='pt-5' type="file" id="file-input" name="file-input"
        onChange={handleFileChange} />
      <div className="pb-5">

        <input
          type="text"
          placeholder="Enter Company Name"
          className=" border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={company}
          onChange={handleCompanyChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
          onClick={uploadFile}>
          Upload
        </button>
      </div>



      <textarea
        className="flex w-1/2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px] py-2"
        id="input"
        value={response}
        readOnly={true}
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
