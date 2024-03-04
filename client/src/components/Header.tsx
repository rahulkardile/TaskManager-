import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootStates } from "../redux/store";
import toast from "react-hot-toast";
import { removerUser } from "../redux/user/UserSlice";
import img from "../assets/avatar.webp"

const Header = () => {
  const user = useSelector((state: RootStates) => state).user;
  console.log(user);
  
const dispatch = useDispatch();

  const handleLogout = async() => {
    const res = await fetch("/api/user/logout")
    const data = await res.json();
    
    dispatch(removerUser());
    console.log(data);
    toast.success("logout Successfull")
    
  }

  return (
    <header className="p-3 bg-black flex justify-between items-center">
      <div className="ml-4">
        <Link to={"/"}>
          <h1 className="text-white flex gap-1 items-center text-3xl font-semibold duration-300  hover:text-orange-500">
             WixBlog
          </h1>
        </Link>
      </div>

      <div className="text-white flex items-center gap-4 text-sm mr-10">
        {user.currentUser?.name ? (
          <>
            <Link to={"/task"} className="duration-200 hover:text-orange-500">
              My Tasks
            </Link>
            <img className="w-8 h-8 rounded-full"  src={img} alt="" />
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link
              to={"/register"}
              className="duration-200 hover:text-orange-500 cursor-pointer"
            >
              Register
            </Link>

            <p className="border border-white py-3" />
            <Link to={"/login"} className="duration-200 hover:text-orange-500">
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
