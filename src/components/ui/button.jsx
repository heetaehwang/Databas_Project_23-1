import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #dfe6ed;
  color: #000;
  font-size: 16px;
  border: 2px solid #fff;
  border-radius: 4px;
  padding: 10px 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #c5d1db;
  }
`;

function Button(props) {
  const { title, onClick } = props;

  return <StyledButton onClick={onClick}>{title}</StyledButton>;
}

export default Button;
