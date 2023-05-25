import { useEffect } from "react";
import { markerdata } from "../data/markerData";
import Button from "../ui/Button";
import Modal from "./modal";

const {kakao} =window;



function Map(){
    //mapscript 관리
    useEffect(() =>{
        mapscript();


    }, // eslint-disable-next-line
    [])

    let mylat;
    let mylon;




    //지도생성
    const mapscript =()=>{
        let container = document.getElementById('map');
        let options = {   
            center: new kakao.maps.LatLng(35.84577171588417, 127.13318294215267),
            level:5,
            draggable: false
        };




        
        //헬스장 표시
        const map = new kakao.maps.Map(container, options);

        
        const findCenter=()=>{
            markerdata.forEach((el)=> {
                var healthmarker =new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(el.lat, el.lng),
                    title: el.title,
                });
                
                var iwContent = el.title, // 인포윈도우에 표시할 내용
                    iwRemoveable = true;
            
                // 인포윈도우를 생성합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content : iwContent,
                    removable : iwRemoveable
                });
                

                // 인포윈도우를 마커위에 표시합니다 
                infowindow.open(map, healthmarker);

  
        });
        }
        findCenter();
    
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



    }


    return (
    <p>
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
        <div>
            <Modal/>
        </div>
    </p>
    );
};
export default Map;
