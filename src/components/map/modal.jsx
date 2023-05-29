import React, { useEffect, useState } from 'react';
import { firestore } from "../../firebase";
import styled from 'styled-components';

// 함수 정의
const getDistanceFromLatLonInKm=(lat1, lng1, lat2, lng2) => {
  const deg2rad=(deg) => {
    return deg * (Math.PI / 180);
  }

  var R = 6371; // 지구의 반지름 (단위: km)
  var dLat = deg2rad(lat2 - lat1); // 위도 차이
  var dLon = deg2rad(lng2 - lng1); // 경도 차이
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c; // 거리 (단위: km)
  return distance;
}

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 680px;
  margin: 0 auto;
  text-align: center;

  h1 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding:0px;
  }

  li {
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 1.5;
    text-align: center;
  }

  li strong {
    font-weight: bold;
  }

  li span {
    color: #888;
  }
`;

const Modal = ({targetlan,targetlon}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    firestore.collection('health').get().then((snapshot) => {
      const dataArray = [];

      snapshot.forEach((doc) => {
        const documentId = doc.id;
        const lat = doc.data().위도;
        const lon = doc.data().경도;
        //내 위치 임의값 입력
        const distance = getDistanceFromLatLonInKm(lat, lon, targetlan, targetlon); // 거리 계산
        const phonenumber = doc.data().전화번호;
        if (distance < 1) {
          dataArray.push({ id: documentId, lat, lon, distance, phonenumber});
        }
      });
      dataArray.sort((a, b) => a.distance - b.distance);

      setData(dataArray);

    });
  }, [targetlan, targetlon]);

  return (
    <ModalContainer>
      <h1>
        내 기준 1km 이내의 헬스장 {data.length}개!
        <br/>
        (거리 순)
      </h1>
      <br/>
      <br/>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>이름:</strong> {item.id}<br />
            <strong>거리:</strong> {item.distance.toFixed(2)} km<br/>
            <strong>번호:</strong> {item.phonenumber}<br/>
            <br/>
            <br/>
          </li>
        ))}
      </ul>
    </ModalContainer>
  );
};

export default Modal;
