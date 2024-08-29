import React, { useEffect, useState } from "react";
import { getMatchdata,getMatchinfo } from "./api/util";
import Card from "./Components/Card";
import Navbar from "./Components/Navbar";
import matchinfo from "../public/matchinfo.json"
import Home from "./Home";
import { Route,Routes } from "react-router-dom";
import DetailScorecard from "./Components/DetailScorecard";

import Live from "../Live";
import Recent from "../Recent";
import Upcoming from "../Upcoming";


function App() {

 
  return (
    <>
      <Routes>
        <Route path="/" element={<Live/>}/>
        <Route path="/recent" element={<Recent/>}/>
        <Route path="/upcoming" element={<Upcoming/>}/>
        <Route path="/scorecard/:id" element={<DetailScorecard/>} />
      </Routes>
    </>
  );
}

export default App;
