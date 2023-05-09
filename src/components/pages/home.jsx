import React from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import Inputbox from "../ui/Inputbox";
import Map from "../map/Map";

const Title = styled.div`
    padding: 10px;
    border:3px;
    border-color:black;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
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
            <Title>
                <h1>...20Kg...</h1>
            </Title>
            <Container>
                <Button
                    title="위치 찾기"
                />
                <Map/>
            </Container>
        </Wrapper>
    );
}

export default Home;