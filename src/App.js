// import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import User from "./components/getUser/User";
import Add from "./components/addUser/Add";
import Edit from "./components/updateUser/Edit";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <Add />,
    },
    {
      path: "/edit/:id",
      element: <Edit />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <>
      <RouterProvider router={route}> </RouterProvider>
    </>
  );
}

export default App;
