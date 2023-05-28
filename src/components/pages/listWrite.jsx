import React, { useState } from "react";
import { firestore } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const ListWrite=() =>{
  const navigate =useNavigate();

  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (inputText.trim() === "") {
      return;
    }

    firestore.collection("ToDo").add({
      text: inputText,
    })
    .then(() => {
      alert("Saved!");
      setInputText("");
    })
    .catch((error) => {
      alert("Error detected!");
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>

      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter your work..."
      />
      <Button title="Submit" />
      <Button title="Go Back..." 
              onClick={()=>{
              navigate("/")
      }}/>
    
    </form>
  );
}

export default ListWrite;
