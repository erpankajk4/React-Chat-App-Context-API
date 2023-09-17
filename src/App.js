import { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children;
  }
  // all the link routes
  const router = createBrowserRouter([
    { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ])
  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer position="top-right"
        autoClose={500}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover={true}
        draggable={true}
      />
    </>
  );
}

export default App;
