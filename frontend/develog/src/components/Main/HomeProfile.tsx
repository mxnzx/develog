import React from "react";
import * as S from "./HomeProfile.style";

export interface ProfileType {
  userName: string;
  userEmail: string;
}

const HomeProfile = (props: ProfileType) => {
  return (
    <S.ProfileContainer>
      <S.ProfileBG src="/icon/profile_cloud.png" />
      <S.BackCircle src="/image/back_circle.png"></S.BackCircle>
      <S.Avatar src="https://github.com/mxnzx/chu/assets/77240765/b7d2b534-0881-4166-bd89-8cc3f65120a0"></S.Avatar>
      <S.TextContainer>
        <S.Name>{props.userName}</S.Name>
        <S.Email>{props.userEmail}</S.Email>
      </S.TextContainer>
    </S.ProfileContainer>
  );
};

export default HomeProfile;
