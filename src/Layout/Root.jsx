import React, { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";

const Root = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timerSet = setTimeout(() => {
      if (navigation.state === "loading") {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, 400);

    const timeoutClear = () => clearTimeout(timerSet);
    return timeoutClear;
  }, [navigation.state]);

  return (
    <div>
      {loading ? (
        <div className="mx-auto mt-[100px] min-h-[80vh] flex justify-center items-center transition-opacity duration-300">
          <Loader></Loader>
        </div>
      ) : (
        <>
          <Navbar />
          <div className="mx-auto mt-[100px] min-h-[80vh] flex justify-center items-center transition-opacity duration-300">
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Root;
