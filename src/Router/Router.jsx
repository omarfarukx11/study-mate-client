import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import FindPartners from "../pages/Partners/FindPartners";
import CreatePartnerProfile from "../pages/Partners/CreatePartnerProfile";
import MyConnection from "../pages/Partners/MyConnection";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "../AuthContext/PrivateRoute";
import PartnerDetails from "../pages/Partners/PartnerDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
        {
            index:true,
            loader: () =>  fetch('http://localhost:3000/studyPartner') ,
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
            path:"/findPartner",
            element:<PrivateRoute>
                <FindPartners></FindPartners>
            </PrivateRoute>
        },
        {
            path:"/createPP",
            Component:CreatePartnerProfile
        },
        {
            path:'/myConnection',
            element:<PrivateRoute>
                <MyConnection></MyConnection>
            </PrivateRoute>,
        },
        {
            path:"/profile",
            Component:Profile
        },
        {
            path:'/partnerDetails/:id',
            loader:({params}) => fetch(`http://localhost:3000/studyPartner/${params.id}`),
            element:<PrivateRoute>
                <PartnerDetails></PartnerDetails>
            </PrivateRoute>
        }
    ]
  },
]);