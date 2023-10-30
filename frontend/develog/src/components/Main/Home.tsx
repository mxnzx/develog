import React from "react";
import HomeProfile from "./HomeProfile";
import HomeCompany from "./HomeCompany";
import HomeResume from "./HomeResume";
import HomeInterview from "./HomeInterview";

const Home = () => {
  return (
    <>
      <HomeProfile></HomeProfile>
      <HomeCompany></HomeCompany>
      <HomeResume></HomeResume>
      <HomeInterview></HomeInterview>
    </>
  );
};

export default Home;
