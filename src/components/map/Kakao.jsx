import { useEffect } from "react";
const {kakao} =window;

function Kakao(){
    
    useEffect(() =>{
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(35.84577171588417, 127.13318294215267),
            level:5
        };
        const map = new kakao.maps.Map(container, options);
        const markerPosition  = new kakao.maps.LatLng(35.84577171588417, 127.13318294215267); 
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);

    }, [])

    return (
        <div id="map" style ={{
            width: '700px',
            height: '500px'
        }}></div>
    )
}

export default Kakao;


// var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
//     mapOption = { 
//         center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
//         level: 3 // 지도의 확대 레벨
//     };

// var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// // 마커가 표시될 위치입니다 
// var markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 

// // 마커를 생성합니다
// var marker = new kakao.maps.Marker({
//     position: markerPosition
// });

// // 마커가 지도 위에 표시되도록 설정합니다
// marker.setMap(map);

// // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// // marker.setMap(null);