import "./App.css";
import { UserProvider } from "./contexts/usercontext";
import { RouterProvider } from "react-router-dom";
import { Router } from "./components/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = Router();
  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
      <ToastContainer />
    </>
  );
}

export default App;
