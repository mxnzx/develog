import styled from "styled-components";
import { Outline } from "./Home.style";

export const ProfileContainer = styled(Outline)`
  width: 27%;
  position: relative;
`;

export const ProfileBG = styled.img`
  position: absolute;
  top: -28px;
  width: 245px;
`;

export const Avatar = styled.img`
  position: absolute;
  left: 38px;
  top: 55px;
  height: 126px;
`;

export const BackCircle = styled.img`
  left: 36px;
  top: 51px;
  width: 145px;
  position: absolute;
`;

export const TextContainer = styled.div`
  left: 40px;
  position: absolute;
  bottom: 12%;
`;
export const Name = styled.p`
  font-size: x-large;
  font-weight: bolder;
  margin-bottom: 4%;
`;
export const Email = styled.p`
  color: gray;
  margin: 2;
`;
