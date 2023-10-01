import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import AddCategories from "./AddCategories";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/add-categories" element={<AddCategories />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
