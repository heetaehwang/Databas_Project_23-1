import React from "react";
import Home from "./components/pages/home";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import ListWrite from "./components/pages/listWrite";
import styled from "styled-components";

const MainTitleText = styled.p`
    font-size: 96px;
    font-weight: bold;
    text-align: center;
`;
function App(){

  return (
    <BrowserRouter>               
      <MainTitleText>+++20Kg+++</MainTitleText>
      <Routes>
        <Route index element ={<Home/>}/>
        <Route path="list-write" element = {<ListWrite/>}/>
      </Routes>
    </BrowserRouter>

  );
  
}

export default App;