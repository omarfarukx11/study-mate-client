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
import DashboardDefault from "../pages/dashboard/DashboardDefault";
import PrivacyPolicy from "../Components/PrivacyPolicy";
import CreateBlog from "../pages/dashboard/CreateBlog";
import BlogDetails from "../pages/blogs/BlogDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    hydrateFallbackElement: <Loader></Loader>,
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
        path: "/aboutUs",
        Component: AboutUs,
        hydrateFallback: <Loader />,
      },
      {
        path: "/blog-details/:id",
        Component: BlogDetails,
        loader: ({params}) => fetch(`https://study-mate-server-tau.vercel.app/allBlogs/${params.id}`),
        hydrateFallback: <Loader />,
      },

      {
        path: "/contract",
        Component: ContactSection,
        hydrateFallback: <Loader />,
      },
      {
        path: "/blogs",
        Component: Blogs,
        hydrateFallback: <Loader />,
      },
      {
        path: "/privacy-policy",
        Component : PrivacyPolicy,
        hydrateFallback: <Loader />,
      },

      {
        path: "/findPartner",
        element: <FindPartners></FindPartners>,
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
    path: "/dashboard",
    element : <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        index: true,
        Component : Profile
        },
      {
        path: "/dashboard/myConnection",
        loader: () => fetch("https://study-mate-server-tau.vercel.app/request"),
        element: (
          <PrivateRoute>
            <MyConnection />
          </PrivateRoute>
        ),
        hydrateFallback: <Loader />,
      },
      {
        path: "/dashboard/create-partner",
        element: (
          <PrivateRoute>
            <CreatePartnerProfile />
          </PrivateRoute>
        ),
        hydrateFallback: <Loader />,
      },
      {
        path: "/dashboard/create-blogs",
        element: (
          <PrivateRoute>
            <CreateBlog></CreateBlog>
          </PrivateRoute>
        ),
        hydrateFallback: <Loader />,
      },
      {
        path: "/dashboard/profile",
        Component: Profile,
      },
    ],
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
    path: "/partnerDetails/:/*",
    Component: NotFound,
  },
  {
    path: "/*",
    Component: NotFound,
  },
]);
