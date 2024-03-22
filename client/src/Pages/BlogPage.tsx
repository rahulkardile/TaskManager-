import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RootStates } from "../redux/store";
import { useSelector } from "react-redux";

const BlogPage = () => {
  const user = useSelector((state: RootStates) => state).user;
  const [data, setData] = useState({
    title: "",
    summary: "",
    content: "",
    user: "",
    cover: "",
  });
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
    <section className="w-[1300px] h-full  flex flex-col justify-start gap-4 items-center">
      {data?.title ? (
        <>
          <div className="w-[70%] overflow-hidden flex justify-center items-center flex-col h-[400px] mt-16">
            <h1 className="text-xl h-[5%] items-cente font-semibold mb-4">
              {data?.title}
            </h1>

            <img
              src={`http://localhost:3300/${data?.cover}`}
              className="w-[85%] h-[55vh] m-auto object-contain"
              alt="img"
            />
          </div>
           { 
                user.currentUser?._id === data.user ? (
                  <button className="bg-indigo-600 p-3 rounded text-white px-7 duration-300 hover:opacity-75">Edit Post</button>
                 ) : ("")
            }
          <div className=" w-[65%] m-auto h-[1500px] mb-20" dangerouslySetInnerHTML={{ __html: data.content }} />        </>
      ) : (
        ""
      )}
    </section>
  );
};

export default BlogPage;
