import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function ListShow() {
  const navigate = useNavigate();

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const collectionRef = firestore.collection("ToDo"); // 변경해야 할 부분: 데이터를 가져올 Firestore 컬렉션 이름
    const snapshot = await collectionRef.get();
    const dataList = snapshot.docs.map((doc) => doc.data());
    setDataList(dataList);
  };

  const handleDeleteAll = () => {
    const collectionRef = firestore.collection("ToDo"); // 변경해야 할 부분: 삭제할 Firestore 컬렉션 이름
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
        alert("Error deleting documents ");
      });
  };

  return (
    <div>
      <h1>Today's Workout ({dataList.length})</h1>

      <Button title= "작성하기" 
              onClick={()=>{
              navigate("/list-write");
      }}/>
      <Button title="비우기" onClick={handleDeleteAll}/>
      <ol>
        {dataList.map((data, index) => (
          <li key={index}>{data.text}</li> // 변경해야 할 부분: 리스트 항목을 표시할 방식으로 수정
        ))}
      </ol>

    </div>
  );
}

export default ListShow;
