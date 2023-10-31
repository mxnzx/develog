import React from "react";
import * as S from "./HomeCompanyItem.style";
type HomeCompanyItemProps = {
  company: {
    name: string;
    imgSrc: string;
  };
};
const HomeCompanyItem: React.FC<HomeCompanyItemProps> = ({ company }) => {
  return (
    <S.ItemContainer>
      <S.CompanyImg src={company.imgSrc}></S.CompanyImg>
      <S.CompanyName>{company.name}</S.CompanyName>
    </S.ItemContainer>
  );
};

export default HomeCompanyItem;
