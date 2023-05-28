import React from "react";
import styled from "styled-components";
import Map from "../map/map";
import ListShow from "../pages/listShow"

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function Home(props) {

    return (
        <Wrapper>
            <Container>
                <ListShow/>
                <Map/>
            </Container>
        </Wrapper>

    );
}

export default Home;