import { useEffect } from "react";

const {kakao} =window;

function Map(){
    
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
            width: '720px',
            height: '539px'
        }}></div>
    )
}

export default Map;
