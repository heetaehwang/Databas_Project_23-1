import React from "react";
import Home from "./components/pages/home";
import firebase from 'firebase/app';
import 'firebase/database';
function App(){
  const database =firebase.database();
  database.ref('/path/to/data').once('value')
  .then((snapshot) => {
    const data =snapshot.val();
    console.log(data);

  })
  .catch((error) => {
    console.error(error);
  });
  return (
  <div>
    <Home/>
  </div>
  );
  
}

export default App;