import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RootStates } from "../redux/store";
import { useSelector } from "react-redux";

const AllTodo = () => {
    const user = useSelector((state: RootStates) => state).user;
  const [data, setData] = useState([]);

  useEffect(() => {
    const Tododata = async () => {
      const res = await fetch("/api/todos/get");
      const data = await res.json();

      setData(data);
    };
    Tododata();
  }, []);

  const handleDelete = async (e) => {
    const res = await fetch(`/api/todos/delete/${e}`, {
        method: "Delete",
    });

    const data = await res.json();
    if (data.success === false) {
        console.log(data.message);
      } else {
        toast.success(`deleted`);
      }

  };

  const handleUpdate = async (e) => {
    const res = await fetch(`/api/todos/update/${e}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({status: true}),
    });

    const data = await res.json();
    if (data.success === false) {
        console.log(data.message);
      } else {
        toast.success(`Updated`);

      }

};

  return (
    <section className="flex justify-evenly flex-wrap gap-4 mx-24 my-28">
      {data.length > 0 && user.currentUser?.name
        ? data.map((item) => (
            <>
              <div className="h-[150px] bg-slate-600 w-[420px] flex justify-between ">
                <div className="">
                  <h1 className="textsm text-white mx-5 my-1">{item.title}</h1>
                  <h3 className="textsm text-white mx-5 my-1">{item.date}</h3>
                  <h3 className="textsm text-red-500 mx-5 my-1">
                    {item?.status === false ? "Proccessing" : "Completed"}
                  </h3>
                  <p className="textsm text-white mx-5 my-1">
                    {item.description}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={()=> handleDelete(item._id)} className="text-red-600">delete</button>
                  <button onClick={() => handleUpdate(item._id)} className="text-green-500">Update Status</button>
                </div>
              </div>
            </>
          ))
        : <h1> There is not tasks </h1>}
    </section>
  );
};

export default AllTodo;
