import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
// import Page404 from "../pages/Page404";
// import SignUp from "../pages/SignUp";
// import SignIn from "../pages/SignIn";
import { dir } from "i18next";
import { useTranslation } from "react-i18next";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";
import Page404 from "./pages/Page404";
import Home from "./pages/home/Home";
import Office from "./pages/office/Office";
import Nav from "./pages/nav/Nav";

export default function Container() {
  const isAuth = useSelector((state) => state.auth.authenticate);
  const language = useSelector((state) => state.language.language);
  const [t] = useTranslation(); 
  useEffect(() => {
    document.documentElement.dir = dir(language);
    document.documentElement.lang = language;
  }, [language]);

  
  return (
    <BrowserRouter>
      {!isAuth ? (
        <Routes>
          <Route path="*" element={<Navigate to="/SignIn" />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/ForgotPassword" element={<ForgetPassword />} />
        </Routes>
      ) : (
        <div>
          <Nav />
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/NotFound" element={<Page404 />} />
            <Route path="*" element={<Navigate to={"/NotFound"} />} />
            <Route path="/SignUp" element={<Navigate to="/Home" />} />
            <Route path="/SignIn" element={<Navigate to="/Home" />} />
            <Route path="/ForgotPassword" element={<Navigate to="/home" />} />
            <Route path="/Office" element={<Office />} />
            {localStorage.getItem("role") !== "user" ? (
              <>
                {/* <Route path="courts" element={<Coutrs />} />
                <Route path="courts/:id" element={<Coutr />} />{" "} */}
              </>
            ) : (
              ""
            )}
            {/* Nested Lawyer route */}
            {/* <Route path="agencies" element={<Agencies />} />
            <Route path="agencies/:id" element={<Agency />} />{" "} */}
            {/* Nested agency route */}
            {/* <Route path="issues" element={<Issues />} /> */}
            {/* <Route path="issues/:id" element={<Issue />} />{" "} */}
            {/* Nested Issue route */}
            {/* <Route path="chats" element={<Chats />} /> */}
            {/* <Route path="*" element={<Page404 />} /> */}
          </Routes>
          {/* <Footer /> */}
        </div>
      )}
    </BrowserRouter>
  );
}
