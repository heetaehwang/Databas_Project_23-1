import React from "react";
import Home from "./components/pages/home";
import { firestore } from "./firebase";
function App(){
  const lat = [];
  const lon = [];
  let a = 0;
  firestore.collection('health').get().then((결과)=>{
    결과.forEach((doc) => {
      lat.push(doc.data().위도);
      lon.push(doc.data().경도);
      console.log(lat[a]);
      a++;
    })
  })
  return (
  <div>
    <Home/>
  </div>
  );
  
}

export default App;