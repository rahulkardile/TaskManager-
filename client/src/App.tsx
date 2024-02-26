import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./components/Header";
import Loader from "./components/Loader";
import AllTodo from "./Pages/AllTodo";

// Lazy
const Login = lazy(()=> import("./Pages/Login"))
const Register = lazy(()=> import("./Pages/Register"))


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task" element={<AllTodo />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
