import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page404 from "./pages/404/Page404";
import Home from "./pages/home/Home";
import UserProtected from "./component/protected/UserProtected";
import { useSelector } from "react-redux";
import User_Profile from "./component/users/homes/User_Profile";
import Login_Modals from "./pages/auth/Login_Modals";
import Group_V_Page from "./component/users/videos_group/Group_V_Page";
import Single_V_Page from "./component/users/videos_single/Single_V_Page";
import Contact from "./contact/Contact";
import Poster_Model from "./component/users/create/Poster_Model";
import PosterSingle from "./component/homes/poster_single/PosterSingle";
import User_Update from "./component/users/update/User_Update";
import Free_Video from "./pages/free_videos_page/F_Video";
import SignalVideo from "./component/free_videos/signal/SignalVideo";
import P_Videos from "./pages/payment_videos_pages/P_Videos";
import VideoCard from "./component/payment/card/VideoCard";
import PaymentCheck from "./component/payment/payment_check/PaymentCheck";
import Address from "./component/payment/address/Address";
import PaymentSuccess from "./component/payment/success/PaymentSuccess";
import {Elements}from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import PSignalVideo from "./component/payment_videos/signal/SignalVideo";
import Category_Home_Page from "./pages/category_page/Category_Home_Page";
import Profict from "./component/users/video_profict/Profict";
import OrderVideos from "./component/users/order_videos/OrderVideos";
function App() {
  const [scriteKey, setScriteKey] = useState("");
  const { userInfo } = useSelector((state) => state.registerStore);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/videos/get/public/secret/key")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setScriteKey(data?.secret_key);
      });
  }, []);
  return (
    <>
      <BrowserRouter>
        <div className="main">
          <Routes>
            <Route path="*" element={<Page404 />} />
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login_Modals />} />
            <Route path="/videos/free" element={<Free_Video />} />
            <Route path="/videos/payment" element={<P_Videos />} />
            <Route path="/videos/signal/free/:id/:group" element={<SignalVideo />} />
            <Route path="/videos/signal/payment/:id/:group" element={<PSignalVideo />} />
            <Route path="/single/poster/page/:id" element={<PosterSingle />} />
            <Route
              path="/category/:bname/:pname/:id"
              element={<Category_Home_Page />}
            />
            <Route
              path="/user/profile/:id"
              element={
                <UserProtected isUser={userInfo?.user.role === "user"}>
                  <User_Profile />
                </UserProtected>
              }
            />
            <Route
              path="/user/profile/single-videos"
              element={
                <UserProtected isUser={userInfo?.user.role === "user"}>
                  <Single_V_Page />
                </UserProtected>
              }
            />
            <Route
              path="/user/profile/groups-videos"
              element={
                <UserProtected isUser={userInfo?.user.role === "user"}>
                  <Group_V_Page />
                </UserProtected>
              }
            />
            <Route
              path="/payment/address/:id/:videoCost/:createUser/:video"
              element={
                <UserProtected isUser={userInfo?.user.role === "user"}>
                  <Address />
                </UserProtected>
              }
            />
            <Route
              path="/payment/address/check"
              element={
                <UserProtected isUser={userInfo?.user.role === "user"}>
                  <PaymentCheck />
                </UserProtected>
              }
            />
            {scriteKey && (
              <Route
                path="/payment/address/card"
                element={
                  <UserProtected isUser={userInfo?.user.role === "user"}>
                    <Elements stripe={loadStripe(scriteKey)}>
                      <VideoCard />
                    </Elements>
                  </UserProtected>
                }
              />
            )}
            <Route
              path="/payment/success"
              element={
                <UserProtected isUser={userInfo?.user.role === "user"}>
                  <PaymentSuccess />
                </UserProtected>
              }
            />
            <Route
              path="/user/update"
              element={
                <UserProtected isUser={userInfo?.user?.role === "user"}>
                  <User_Update />
                </UserProtected>
              }
            />

            <Route
              path="/user/profict"
              element={
                <UserProtected isUser={userInfo?.user?.role === "user"}>
                  <Profict />
                </UserProtected>
              }
            />
             <Route
              path="/user/order"
              element={
                <UserProtected isUser={userInfo?.user?.role === "user"}>
                  <OrderVideos />
                </UserProtected>
              }
            />
            <Route
              path="/user/posters"
              element={
                <UserProtected isUser={userInfo?.user?.role === "user"}>
                  <Poster_Model />
                </UserProtected>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
