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
import NotFound from "../Components/NotFound";
import Loader from "../Components/Loader";
import AboutUs from "../pages/AboutUs/AboutUs";
import Trust from "../pages/Home/Trust";
import ContactSection from "../pages/Contract/ContractSection";
import Dashboard from "../Layout/Dashboard";
import Blogs from "../pages/blogs/Blogs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    hydrateFallback: <Loader></Loader>,
    children: [
      {
        index: true,
        loader: () =>
          fetch("https://study-mate-server-tau.vercel.app/studyPartner"),
        Component: Home,
        hydrateFallback: <Loader></Loader>,
      },
      {
        path: "/register",
        Component: Register,
      },
       {
        path: "/login",
        Component: Login,
      },
      {
        path: "/aboutUs",
        Component: AboutUs,
      },
     
      {
        path: "/contract",
        Component: ContactSection,
      },
      {
        path: "/blogs",
        Component: Blogs,
      },
     
      {
        path: "/findPartner",
        element:<FindPartners></FindPartners>
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/partnerDetails/:id",
        loader: ({ params }) =>
          fetch(
            `https://study-mate-server-tau.vercel.app/studyPartner/${params.id}`
          ),
        Component: PartnerDetails,
      },
    ],
  },

  {
    path:"/dashboard",
    Component:Dashboard,
    children : [
      {
        path: "/dashboard/myConnection",
        loader: () => fetch("https://study-mate-server-tau.vercel.app/request"),
        element: (
          <PrivateRoute>
            <MyConnection></MyConnection>
          </PrivateRoute>
        ),
        hydrateFallback: <Loader></Loader>,
      },
      {
        path: "/dashboard/create-partner",
        element: (
          <PrivateRoute>
            <CreatePartnerProfile></CreatePartnerProfile>
          </PrivateRoute>
        ),
        hydrateFallback: <Loader></Loader>,
      },
    ]
  },

  {
    path: "/partnerDetails/:/*",
    Component: NotFound,
  },
  {
    path: "/*",
    Component: NotFound,
  },
]);
