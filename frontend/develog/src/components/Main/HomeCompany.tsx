import { useNavigate } from "react-router-dom";
import * as S from "./HomeCompany.style";
import HomeCompanyItem from "./HomeCompanyItem";
export interface HomeCompanyType {
  mainInterestingCompany: { companyId: number; name: string; logoUrl: string }[];
}
const HomeCompany = (props: HomeCompanyType) => {
  const companyList = props.mainInterestingCompany;
  const navigate = useNavigate();
  const moreBtn = {
    name: "더보기",
    logoUrl: "/icon/company_add_icon.png",
  };
  return (
    <S.CompanyContainer>
      <S.CompanyHeader>
        <span>나의 관심 기업</span>
        <img src="/icon/pin.png"></img>
      </S.CompanyHeader>
      <hr></hr>
      {/* 리스트 뿌리기 */}
      <S.CompanyListContainer>
        {companyList.map((list, index: number) => (
          <>
            <HomeCompanyItem
              key={list.companyId}
              company={list}
              onClick={() => navigate(`/companydetail/${list.companyId}`, { state: { companyName: list.name } })}
            ></HomeCompanyItem>
          </>
        ))}
        <HomeCompanyItem company={moreBtn} onClick={() => navigate("/company")}></HomeCompanyItem>
      </S.CompanyListContainer>
    </S.CompanyContainer>
  );
};

export default HomeCompany;
