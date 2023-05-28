import { useEffect, useState } from "react";
import { markerdata } from "../data/markerData";
import Button from "../ui/Button";

const {kakao} =window;
let mylat;
let mylon;
//두 point 거리 계산
const getDistanceFromLatLonInKm =(lat1, lng1, lat2, lng2) => {
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
//1km이내 데이터 배열 가져오기
const BringData = (targetlat, targetlon) => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      markerdata.collection('health').get().then((snapshot) => {
        const dataArray = [];
  
        snapshot.forEach((doc) => {
          const documentId = doc.id;
          const lat = doc.data().위도;
          const lon = doc.data().경도;
          //내 위치 임의값 입력
          const distance = getDistanceFromLatLonInKm(lat, lon, targetlat, targetlon); // 거리 계산
  
          if (distance < 1) {
            dataArray.push({ id: documentId, lat, lon, distance });
          }
        });
  
        setData(dataArray);
      });
    }, [targetlat,targetlon]);
    return data;
}

const Map =() => {
    useEffect(() =>{

        const container = document.getElementById('map');
        const options = {   
            center: new kakao.maps.LatLng(35.84577171588417, 127.13318294215267),
            level:5,
            draggable: false
        };
        
        //헬스장 표시
        const map = new kakao.maps.Map(container, options);

        //내위치 찾기
        const MyPosition=(locPosition, message)=> {

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({  
                map: map, 
                position: locPosition
            }); 
            
            var iwContent = message, // 인포윈도우에 표시할 내용
                iwRemoveable = true;
        
            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content : iwContent,
                removable : iwRemoveable
            });
            
            // 인포윈도우를 마커위에 표시합니다 
            infowindow.open(map, marker);
            
            // 지도 중심좌표를 접속위치로 변경합니다
            map.setCenter(locPosition);      
        }  
        if (navigator.geolocation) {
        
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                
                var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    message = '<div style="padding:5px;">현재 위치!</div>'; // 인포윈도우에 표시될 내용입니다
                
                // 마커와 인포윈도우를 표시합니다
                mylat =lat;
                mylon =lon;
                MyPosition(locPosition, message);
                    
            });
            
        } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            
            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
                message = 'geolocation을 사용할수 없어요..'
                
            MyPosition(locPosition, message);
        }
           
        const findCenter=()=>{
            markerdata.forEach((item)=> {
                var healthmarker =new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(item.lat, item.lng),
                    title: item.title,
                });
                
                var iwContent = item.title, // 인포윈도우에 표시할 내용
                    iwRemoveable = true;
            
                // 인포윈도우를 생성합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content : iwContent,
                    removable : iwRemoveable
                });
                
                // 인포윈도우를 마커위에 표시합니다 
                infowindow.open(map, healthmarker);
                
                // kakao.maps.event.addListener(healthmarker, 'click', ()=>{
                //     toggleVisibility();
                // })     
            });
        }

        findCenter();
    }, 
    [])


  

    //지도생성


    


    return (
    <div>
        <Button
            title="헬스장 위치 찾기"
            onClick={""}
        />
        <Button
            title="경로 찾기"
            onClick={()=>{window.open(`https://map.kakao.com/link/from/내 위치,${mylat},${mylon}`)}}
        />
        <div id="map" style ={{
            width: '720px',
            height: '539px'
        }}></div>

    </div>
    );
};
export default Map;