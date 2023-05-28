import React, { useState } from "react";
import { firestore } from "../../firebase";

const ListWrite=() =>{
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
      console.log("Text saved successfully to Firebase!");
      setInputText("");
    })
    .catch((error) => {
      console.error("Error saving text to Firebase: ", error);
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter your text..."
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default ListWrite;
