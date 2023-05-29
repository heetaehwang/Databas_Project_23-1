import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  margin-bottom: 20px;
`;

const List = styled.ol`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

function ListShow() {
  const navigate = useNavigate();

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const collectionRef = firestore.collection("ToDo");
    const snapshot = await collectionRef.get();
    const dataList = snapshot.docs.map((doc) => doc.data());
    setDataList(dataList);
  };

  const handleDeleteAll = () => {
    const collectionRef = firestore.collection("ToDo");
    collectionRef
      .get()
      .then((snapshot) => {
        const batch = firestore.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      })
      .then(() => {
        console.log("All documents deleted successfully!");
        setDataList([]);
      })
      .catch((error) => {
        alert("Error deleting documents");
      });
  };

  return (
    <Container>
      <Title>Today's Workout ({dataList.length})</Title>

      <ButtonContainer>
        <Button
          title="작성하기"
          onClick={() => {
            navigate("/list-write");
          }}
        />
        <Button title="비우기" onClick={handleDeleteAll} />
      </ButtonContainer>

      <List>
        {dataList.map((data, index) => (
          <ListItem key={index}>{data.text}</ListItem>
        ))}
      </List>
    </Container>
  );
}

export default ListShow;
