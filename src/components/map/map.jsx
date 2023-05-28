import React, { useEffect, useState } from 'react';
import { firestore } from "../../firebase";
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Button from '../ui/Button';
import Modal from './modal';

const getDistanceFromLatLonInKm = (lat1, lng1, lat2, lng2) => {
  const deg2rad = (deg) => {
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

const DBtest = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const [Mystate, setMyState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const fetchData = () => {
    firestore.collection('health').get().then((snapshot) => {
      const dataArray = [];

      snapshot.forEach((doc) => {
        const documentId = doc.id;
        const lat = doc.data().위도;
        const lon = doc.data().경도;
        const distance = getDistanceFromLatLonInKm(lat, lon, Mystate.center.lat, Mystate.center.lng);
        
        if (distance < 1) {
          dataArray.push({ id: documentId, lat, lon, distance });
        }
      });

      setData(dataArray);
    });
  };

  useEffect(() => {
    //find my position with GeoLocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setMyState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setMyState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <div>
      <Button
        title="헬스장 위치 찾기"
        onClick={() => {
          setShow(true);
          fetchData();
        }}
      />
      <Button
        title="경로 찾기"
        onClick={() => {
          window.open(`https://map.kakao.com/link/from/내 위치,${Mystate.center.lat},${Mystate.center.lng}`);
        }}
      />
      <Map
        style={{ width: '720px', height: '539px' }}
        center={{ lat: 35.84577171588417, lng: 127.13318294215267 }}
        level={5}
        draggable={true}
      >
        {!Mystate.isLoading && (
          <MapMarker position={Mystate.center}>
            <div style={{ padding: "5px", color: "#ff0000" }}>
              {Mystate.errMsg ? Mystate.errMsg : "내 위치!"}
            </div>
          </MapMarker>
        )}

        {data.map((item) => (
          show && (
            <MapMarker
              key={item.id}
              position={{ lat: item.lat, lng: item.lon }}
              clickable={true}
            >
              <div style={{ padding: "5px", color: "#000" }}>
                {item.id}
              </div>
            </MapMarker>
          )
        ))}
      </Map>
      {show && <Modal />}
    </div>
  );
};

export default DBtest;
