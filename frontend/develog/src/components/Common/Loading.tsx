import styled from "styled-components";

const Box = styled.div``;
const LoadImg = styled.img`
  width: 100px;
`;
const LoadingPage = () => {
  return (
    <>
      <Box>
        <LoadImg src={"/image/load1.gif"} />
      </Box>
    </>
  );
};

export default LoadingPage;
