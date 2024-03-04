import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RootStates } from "../redux/store";
import { useSelector } from "react-redux";

const AllTodo = () => {
    const user = useSelector((state: RootStates) => state).user;
  const [data, setData] = useState([]);

  return (
    <section className="bg-green-200 w-full h-full">
      <div className="bg-red-300 w-[40%] h-[400px]">
      </div>      
      <div className="bg-blue-300-300 w-[70%] h-[70%]"></div>      
    </section>
  );
};

export default AllTodo;
