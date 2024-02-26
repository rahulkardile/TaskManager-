import { useSelector } from "react-redux";
import AddTask from "../components/AddTask";
import { RootStates } from "../redux/store";

const Home = () => {
  const user = useSelector((state: RootStates) => state).user;

  return (
      <section>
        {
          user.currentUser?.name ? <AddTask /> : <h1 className="m-auto  flex justify-center mt-24">Login is needed</h1>
        }
        
    </section>
  );
};

export default Home;
