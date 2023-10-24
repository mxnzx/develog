import React, { useState } from "react";
import GlobalStyle from "style/GlobalStyles";
import { BaseContainer } from "App.style";

import SideBar from "components/Common/SideBar";
import CompanyListPage from "pages/Company/CompanyListPage";

function App() {
  // hideComponent로 웰컴페이지에서 SideBar 제거
  return (
    <>
      <GlobalStyle />
      <SideBar />
      <BaseContainer>
        <CompanyListPage />
      </BaseContainer>
    </>
  );
}

export default App;
