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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    hydrateFallback: <Loader></Loader>,
    children: [
      {
        index: true,
        loader: () => fetch("https://study-mate-server-tau.vercel.app/studyPartner"),
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
        path: "/findPartner",
        element: (
          <PrivateRoute>
            <FindPartners></FindPartners>
          </PrivateRoute>
        ),
      },
      {
        path: "/createPP",
        Component: CreatePartnerProfile,
      },
      {
        path: "/myConnection",
        loader: () => fetch("https://study-mate-server-tau.vercel.app/request"),
        element: (
          <PrivateRoute>
            <MyConnection></MyConnection>
          </PrivateRoute>
        ),
        hydrateFallback: <Loader></Loader>,
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/partnerDetails/:id",
        loader: ({ params }) =>
          fetch(`https://study-mate-server-tau.vercel.app/studyPartner/${params.id}`),
        element: (
          <PrivateRoute>
            <PartnerDetails></PartnerDetails>
          </PrivateRoute>
        ),
        hydrateFallback: <Loader></Loader>,
      },
    ],
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
