import React, { useState } from "react";
import { backgroundWhite } from "style/Color";
import styled from "styled-components";

// 컴포넌트
import ApplyInfo from "./ApplyInfo";
import PreResume from "./PreResume";
import UserInfo from "./UserInfo/UserInfo";

const Container = styled.div`
  background-color: ${backgroundWhite};
  width: 28%;
  height: 100%;
  border-radius: 2rem;
`;
const ContentBox = styled.div`
  margin: 2rem 1.5rem;
  height: 85%;
  padding-right: 10px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.div<{ isActive: boolean }>`
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: #ffffff;
  ${({ isActive }) =>
    isActive &&
    `background-color: #99B4C9;
    `}
  margin: 0.5rem;
  cursor: pointer;
  &:hover {
    opacity: 70%;
  }
`;
interface SideRegionProps {
  historyId: number;
  usercategory: number[];
  category: number[];
}
// 사이드 탭 부분

const SideRegion: React.FC<SideRegionProps> = ({ historyId, usercategory, category }) => {
  // console.log('자소서 사이드바 historyId가져오기', historyId)
  const [activeComponent, setActiveComponent] = useState("applyInfo");

  const showComponent = (componentName: string) => {
    switch (componentName) {
      case "applyInfo":
        return <ApplyInfo historyId={historyId} />;
      case "preResume":
        return <PreResume usercategory={usercategory} category={category} />;
      case "userInfo":
        return <UserInfo />;
      default:
        return null;
    }
  };
  return (
    <>
      <Container>
        <ContentBox>{showComponent(activeComponent)}</ContentBox>
        <ButtonBox>
          <Button onClick={() => setActiveComponent("applyInfo")} isActive={activeComponent === "applyInfo"} />
          <Button onClick={() => setActiveComponent("preResume")} isActive={activeComponent === "preResume"} />
          <Button onClick={() => setActiveComponent("userInfo")} isActive={activeComponent === "userInfo"} />
        </ButtonBox>
      </Container>
    </>
  );
};

export default SideRegion;
