import React, { useEffect, useState } from 'react';
import { firestore } from "../../firebase";

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

const Modal = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    firestore.collection('health').get().then((snapshot) => {
      const dataArray = [];

      snapshot.forEach((doc) => {
        const documentId = doc.id;
        const lat = doc.data().위도;
        const lon = doc.data().경도;
        //내 위치 임의값 입력
        const distance = getDistanceFromLatLonInKm(lat, lon, 35.844105927118875, 127.13256534257418); // 거리 계산

        if (distance < 1) {
          dataArray.push({ id: documentId, lat, lon, distance });
        }
      });

      setData(dataArray);
    });
  }, []);

  return (

    <div>
        <h1>
        공대7호관 1km이내의 헬스장!
        </h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            이름: {item.id}<br />
            위도: {item.lat}<br />
            경도: {item.lon}<br />
            거리: {item.distance.toFixed(2)} km
            <br/>
            <br/>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Modal;
