import React, { useEffect, useState } from "react";
import img from "../assets/JavaScript.webp";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    const Tododata = async () => {
      const res = await fetch(`/api/post/get/${id}`);
      const data = await res.json();

      setData(data.data);
    };
    Tododata();
  }, []);

  return (
    <section className="w-[1300px] h-full flex flex-col justify-start gap-4 items-center">
      {data?.title ? (
        <>
          <div className="w-[70%] overflow-hidden flex justify-center flex-col h-[400px] mt-16">
           
            <h1 className="text-xl  items-center px-36 h-20 m-20  py-4 font-semibold mb-4">
              {data?.title}
            </h1>

            <img
              src={`http://localhost:3300/${data?.cover}`}
              className="w-[95%] h-full m-auto object-contain"
              alt="img"
            />
          </div>
          <div className=" w-[65%] m-auto h-[1500px] mb-20">
            <p className="text-lg font-semibold mb-4">{data?.summary}</p>
            <p className="text-base]">{data?.content}</p>
          </div>
        </>
      ) : (
        ""
      )}
    </section>
  );
};

export default BlogPage;
