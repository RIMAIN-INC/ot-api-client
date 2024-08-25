import {createBrowserRouter} from "react-router-dom";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import Home from "../Home";
import AddForm from "../AddForm";
import UpdateForm from "../UpdateForm";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
    },

    {
      path: "sign-in",
      element: <SignIn />,
    },

    {
        path: "home",
        element: <Home />
    },

    {
      path: "home/add-form",
      element: <AddForm />
    },

    {
      path: "home/update-form/:id",
      element: <UpdateForm/>
    }
  ]);

  