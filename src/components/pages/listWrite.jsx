import React, { useState } from "react";
import { firestore } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 300px;
  max-width: 100%;
`;

const SubmitButton = styled(Button)`
  padding: 10px 20px;
  width: 200px;
`;

const GoBackButton = styled(Button)`
  padding: 10px 20px;
  width: 200px;
`;

const ListWrite = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (inputText.trim() === "") {
      return;
    }

    firestore
      .collection("ToDo")
      .add({
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
    <FormContainer onSubmit={handleFormSubmit}>
      <Input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter your work..."
      />
      <SubmitButton title="Submit" />
      <GoBackButton
        title="Go Back"
        onClick={() => {
          navigate("/");
        }}
      />
    </FormContainer>
  );
};

export default ListWrite;
