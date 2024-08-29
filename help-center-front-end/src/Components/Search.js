import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/card/${keyword}`);
      setResults(response.data);
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No data found matching the provided keyword.");
        setResults([]);
      } else {
        setError("An error occurred while retrieving the data.");
      }
    } finally {
      setKeyword("");
    }
  };
  return (
    <div className="h-screen flex flex-col">
      <div className="w-full h-3/5 bg-violet-100 flex flex-col items-center justify-center py-10">
        <h1 className="text-5xl text-center text-black font-semibold mb-10">
          How Can We Help
        </h1>
        <div className="w-1/2">
          <label className="input input-bordered flex items-center justify-between h-14">
            <input
              type="text"
              className="grow placeholder-black text-left text-md"
              placeholder="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <svg
              className="w-14 h-5 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              onClick={handleSearch}
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </label>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>

      <div className="">
        <div className="container grid grid-cols-1 md:grid-cols-2 mx-auto px-52 gap-5 py-10">
          {results.length > 0 && results.map((result, index) => (
            <div key={index} className="card bg-gray-100 w-full h-56 border-solid border-2 rounded-none border-gray-300">
              <div className="card-body">
                <h2 className="card-title">{result.title}</h2>
                <p>{result.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
