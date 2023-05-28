import React from "react";
import Home from "./components/pages/home";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import ListWrite from "./components/pages/listWrite";
function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route index element ={<Home/>}/>
        <Route path="list-write" element = {<ListWrite/>}/>
      </Routes>
    </BrowserRouter>

  );
  
}

export default App;