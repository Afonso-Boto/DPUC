import React from "react";
import styled from "styled-components";
//Components
import { AnimatedBackground } from "@uaveiro/ui";

const Card = styled.div`
  padding: 20px;
  border: 1px solid #bdbdbd;
  background-color: #fafafa;
  display: flex;
  flex-grow: 1;
  width: 50%;
`;

const Mask = styled.div`
  background-color: #fafafa;
  position: absolute;
  right: 0;``
  height: ${props => (props.lineBreak ? "10px" : "25px")};
  width: ${props => (props.lineBreak ? "100%" : props.width)};
  top: ${props => props.top || "0"};
`;

const CardLoading = () => {
  return (
    <Card>
      <AnimatedBackground height="60px" width="100%">
        <Mask width="10%" />
        <Mask top="25px" lineBreak />
        <Mask top="35px" width="30%" />
      </AnimatedBackground>
    </Card>
  );
};

export default CardLoading;