import React, { useEffect, useState } from "react";

const Card = () => {
  const [data,setData]=useState([])
  useEffect(()=>{
    fetch('http://localhost:7000/card/')
    .then(res => res.json())
    .then(data => setData(data))
  },[])
  return (
    <div>
      <h1 className="text-center font-bold text-3xl pt-5 ">All Card</h1>
      <div className="container grid grid-cols-1 md:grid-cols-2 mx-auto mt-10 px-52 gap-5">
        {
          data.map((item)=>(
            <div className="card bg-gray-100 w-full h-56 border-solid border-2 rounded-none border-gray-300">
          <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <p>{item.description}</p>
          </div>
        </div>
          ))
        }
      </div>
    </div>
  );
};

export default Card;
