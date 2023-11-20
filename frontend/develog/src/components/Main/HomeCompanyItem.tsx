import React from "react";
import * as S from "./HomeCompanyItem.style";

type HomeCompanyItemProps = {
  company: {
    name: string;
    logoUrl: string;
  };
  onClick?: () => void; // onClick prop 정의
};
const nameSlice = (name: string) => {
  const sliceName = name.slice(0, 2);
  return sliceName;
};
const HomeCompanyItem: React.FC<HomeCompanyItemProps> = ({ company, onClick }) => {
  return (
    <S.ItemContainer onClick={onClick}>
      {company.logoUrl === null ? (
                <S.Box>
                  <S.NoLogo>{nameSlice(company.name)}</S.NoLogo>
                  <S.CompanyName>{company.name}</S.CompanyName>
                </S.Box>
              ) : (
                <S.Box>
                  <S.CompanyImg src={company.logoUrl}></S.CompanyImg>
                  <S.CompanyName>{company.name}</S.CompanyName>
                </S.Box>
              )}
    </S.ItemContainer>
  );
};

export default HomeCompanyItem;
