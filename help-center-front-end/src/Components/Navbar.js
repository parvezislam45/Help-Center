import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:7000/card",
       { title, description });
       setIsModalOpen(false);
       toast("Data Posted Successfully")
       setTitle("");
       setDescription("");
      console.log("Data posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  return (
    <div>
      <div className="navbar">
        <div className="bg-black px-5 w-full h-20 rounded-t-2xl">
          <div className="flex flex-1 px-20 items-center justify-start space-x-3">
            <a
              href="/"
              className="flex items-center text-xl font-bold text-white"
            >
              <img
                className="w-10"
                src="https://i.postimg.cc/bNtjxvT6/Screenshot-from-2024-08-29-11-35-51.png"
                alt=""
              />
            </a>
            <a href="/" className="text-xl font-bold text-white">
              Abstract
            </a>
            <a href="/" className=" border-r-2 border-white mx-3 h-8"></a>
            <a href="/" className="text-xl font-semibold text-white">
              Help-Center
            </a>
          </div>
          <div className="flex justify-center gap-5 px-20 items-center">
            <button
              className="btn rounded-none px-6 bg-black text-white"
              onClick={openModal}
            >
              <svg className="w-7 h-7" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7 7V4H8V7H11V8H8V11H7V8H4V7H7Z" fill="white"></path> </svg>
              Add Data
            </button>
            <ul className="menu menu-horizontal px-1 text-white">
              <button className="text-white text-lg font-bold border-2 border-gray-500 px-7 py-2">
                Submit a Request
              </button>
            </ul>
          </div>
          {isModalOpen && (
        <dialog id="my_modal_3" className="modal" open>
        <div className="bg-gray-100 flex justify-center">
          <div className="py-10 px-8 h-96 bg-white rounded shadow-xl relative">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="title" className="block text-gray-800 font-bold">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
                />
              </div>
      
              <div>
                <label htmlFor="description" className="block text-gray-800 font-bold">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
                />
              </div>
      
              <button
                type="submit"
                className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </dialog>
      
      )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
