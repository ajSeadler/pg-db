import { useState, useEffect } from "react";

import Home from "./components/Home";
import PostsPage from "./components/PostsPage";
import PostsByCommunity from "./components/PostsByCommunity"; 
import FullPostsPage from "./components/FullPostsPage";
import NavBar from "./components/NavBar";
import AllCommunities from "./components/AllCommunities";
import UserProfile from "./components/UserProfile";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import Footer from "./components/Footer";

import "./style.css";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in localStorage:", token);
  }, []); // This will run once when the component mounts

  return (
    <>
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/me" element={<UserProfile />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:postId" element={<FullPostsPage />} />
        <Route path="/communities" element={<AllCommunities />} />
        <Route path="/posts/community/:communityId" element={<PostsByCommunity />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
