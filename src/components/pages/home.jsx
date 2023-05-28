import React from "react";
// import styled from "styled-components";
import Map from "../map/map";
import ListShow from "../pages/listShow"
// const Title = styled.div`
//     padding: 10px;
//     border: 1px solid balck;
//     width: 720px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
// `;
// const Wrapper = styled.div`
//     padding: 16px;
//     width: calc(100% - 32px);
//     border: 1px solid balck;

//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
// `;

// const Container = styled.div`
//     width: 100%;
//     max-width: 720px;
//     border: 1px solid balck;

//     & > * {
//         :not(:last-child) {
//             margin-bottom: 16px;
//         }
//     }
// `;

function Home(props) {

    return (

        <div>
                <h1>...20Kg...</h1>
                <ListShow/>
                <Map/>
        </div>
    );
}

export default Home;