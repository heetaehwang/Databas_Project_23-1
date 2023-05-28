import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";

function ListShow() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = firestore.collection("ToDo"); // 변경해야 할 부분: 데이터를 가져올 Firestore 컬렉션 이름
      const snapshot = await collectionRef.get();
      const dataList = snapshot.docs.map((doc) => doc.data());
      setDataList(dataList);
    };

    fetchData();
  }, []);

  return (
    <ul>
      {dataList.map((data, index) => (
        <li key={index}>{data.text}</li> // 변경해야 할 부분: 리스트 항목을 표시할 방식으로 수정
      ))}
    </ul>
  );
}

export default ListShow;
