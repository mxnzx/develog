import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "store/reducers/user";
import { SideContainer } from "./SideBar.style";
import { useEffect, useState } from "react";
import { getMainInfo } from "apis";
import Swal from "sweetalert2";

interface ResumeType {
  resumeId: any;
}
const SideBar = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    Swal.fire("로그아웃 완료 👋🏻");
    navigation("/");
  };
  const [resumeInfo, setResumeInfo] = useState<ResumeType[] | undefined>(undefined);
  // console.log(resumeInfo, 'resumeInfo')
  useEffect(() => {
    const loadMainInfo = async () => {
      try {
        const mainInfo = await getMainInfo();
        setResumeInfo(mainInfo.data.mainResume);
      } catch (error) {
        // console.error("main info error");
      }
    };
    loadMainInfo();
  }, []);
  return (
    <>
      <SideContainer>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4vh"
          height="4vh"
          viewBox="0 0 28 28"
          fill="none"
          onClick={() => navigation("/")}
        >
          <path
            d="M3.5 10.5L14 2.33337L24.5 10.5V23.3334C24.5 23.9522 24.2542 24.5457 23.8166 24.9833C23.379 25.4209 22.7855 25.6667 22.1667 25.6667H5.83333C5.21449 25.6667 4.621 25.4209 4.18342 24.9833C3.74583 24.5457 3.5 23.9522 3.5 23.3334V10.5Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 25.6667V14H17.5V25.6667"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* 최근 작성한 자기 소개서 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4vh"
          height="4vh"
          viewBox="0 0 28 28"
          fill="none"
          onClick={() =>
            navigation(`/resume/${resumeInfo?.[0]?.resumeId}`, { state: { historyId: resumeInfo?.[0]?.historyId } })
          }
        >
          <path
            d="M12.8333 4.66663H4.66668C4.04784 4.66663 3.45435 4.91246 3.01676 5.35004C2.57918 5.78763 2.33334 6.38112 2.33334 6.99996V23.3333C2.33334 23.9521 2.57918 24.5456 3.01676 24.9832C3.45435 25.4208 4.04784 25.6666 4.66668 25.6666H21C21.6188 25.6666 22.2123 25.4208 22.6499 24.9832C23.0875 24.5456 23.3333 23.9521 23.3333 23.3333V15.1666"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.5833 2.91665C22.0475 2.45252 22.677 2.19177 23.3333 2.19177C23.9897 2.19177 24.6192 2.45252 25.0833 2.91665C25.5475 3.38078 25.8082 4.01027 25.8082 4.66665C25.8082 5.32302 25.5475 5.95252 25.0833 6.41665L14 17.5L9.33334 18.6666L10.5 14L21.5833 2.91665Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4vh"
          height="4vh"
          viewBox="0 0 30 30"
          fill="none"
          onClick={() => navigation("/company")}
        >
          <g clipPath="url(#clip0_218_1431)">
            <path d="M3.75 26.25H26.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.25 10H12.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.25 15H12.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.25 20H12.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.5 10H18.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.5 15H18.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.5 20H18.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M6.25 26.25V6.25C6.25 5.58696 6.51339 4.95107 6.98223 4.48223C7.45107 4.01339 8.08696 3.75 8.75 3.75H21.25C21.913 3.75 22.5489 4.01339 23.0178 4.48223C23.4866 4.95107 23.75 5.58696 23.75 6.25V26.25"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_218_1431">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4vh"
          height="4vh"
          viewBox="0 0 28 28"
          fill="none"
          onClick={() => navigation("/info")}
        >
          <path
            d="M18.6667 8.16667C18.6667 10.744 16.5773 12.8333 14 12.8333C11.4227 12.8333 9.33334 10.744 9.33334 8.16667C9.33334 5.58934 11.4227 3.5 14 3.5C16.5773 3.5 18.6667 5.58934 18.6667 8.16667Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 16.3333C9.48968 16.3333 5.83334 19.9897 5.83334 24.5H22.1667C22.1667 19.9897 18.5103 16.3333 14 16.3333Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4vh"
          height="4vh"
          viewBox="0 0 28 28"
          fill="none"
          onClick={handleLogout}
        >
          <path
            d="M10.5 24.5H5.83333C5.21449 24.5 4.621 24.2542 4.18342 23.8166C3.74583 23.379 3.5 22.7855 3.5 22.1667V5.83333C3.5 5.21449 3.74583 4.621 4.18342 4.18342C4.621 3.74583 5.21449 3.5 5.83333 3.5H10.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.6667 19.8333L24.5 14L18.6667 8.16663"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M24.5 14H10.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </SideContainer>
    </>
  );
};

export default SideBar;
