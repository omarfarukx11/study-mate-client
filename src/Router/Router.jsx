import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import FindPartners from "../pages/Partners/FindPartners";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
        {
            index:true,
            Component:Home,
        },
        {
            path:'/register',
            Component:Register
        },
        {
            path:'/login',
            Component:Login,
        },
        {
            path:"findPartner",
            Component:FindPartners
        }
    ]
  },
]);