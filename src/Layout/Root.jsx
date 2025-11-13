import React, { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";

const Root = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const timerSet = setTimeout(() => {
      if (navigation.state === "loading") {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, 500);

    const timeoutClear = () => clearTimeout(timerSet);
    return timeoutClear;
  }, [navigation.state]);

  return (
    <div>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <Navbar />
          <div className="mx-auto min-h-screen mt-[100px] transition-opacity duration-300">
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Root;
