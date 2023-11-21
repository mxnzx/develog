<div align="center">
  <br />
<img src="etc/img/logo.png" width="470" height="150"/>
    <h4>"취업 준비 걱정 끝 Develog와 함께 🎐 "</h4>
</div>

<h2>1️⃣ 프로젝트 개요</h2> 
 <br />
 
## 📌 개발 기간

| 개발 기간 | 2023.10.10 ~ 2023.11.17 (6주) |
| --- | --- |
 <br />

## 📌 팀원 소개
<div>
<table>
    <tr>
        <td height="140px" align="center"> <a href="https://github.com/sunjinb">
            <img src="etc/img/Team선진.PNG" width="140px" /><br>김선진<br></a>BE<br>부팀장<br></td>
        <td height="140px" align="center"> <a href="https://github.com/mxnzx">
            <img src="etc/img/Team민지.PNG" width="140px" /><br>류민지<br></a>BE<br>팀장/AI<br></td>
        <td height="140px" align="center"> <a href="https://github.com/bmsnc">
            <img src="etc/img/Team범선.PNG" width="140px" /><br>최범선<br></a>BE<br>인프라<br></td>
        <td height="140px" align="center"> <a href="https://github.com/Sohyun043011">
            <img src="etc/img/Team소현.PNG" width="140px" /><br>박소현<br></a>FE<br>인프라<br></td>
        <td height="140px" align="center"> <a href="https://github.com/wldbs8241">
            <img src="etc/img/Team지윤.PNG" width="140px" /><br>송지윤<br></a>FE<br>Jira/Git<br></td>
        <td height="140px" align="center"> <a href="https://github.com/golddonge">
            <img src="etc/img/Team동민.PNG" width="140px" /><br>신동민<br></a>FE<br>UCC<br></td>
    </tr>
</table>
</div>
 <br />

## 📌 기획 의도
- 자기소개서를 보다 효율적으로 관리할 수 있는 플랫폼
- 개인 이력 및 포트폴리오를 참고할 수 있는 플랫폼
- 취업 준비 프로세스를 하나의 플로우로 관리할 수 있는 플랫폼
- 면접 준비를 개인적으로 편하게 할 수 있는 플랫폼

<br />

## 📌 목표
- 한 눈에 관리되는 정보, 편안한 에디터 환경으로 사용자 편의성 증가
- 놓치기 쉬운 키워드 체크부터 스코어링까지 차별적인 기능 제공
- 취업 프로세스를 하나의 플로우로 관리
<br />

## 📌 UCC
https://www.youtube.com/watch?v=vzH0BbY1lxA
<br />

<br />
<h2>2️⃣ 서비스 소개</h2> 
<br />
 
## 📌 주요 기능 : 지원 기업 관리
- 입사지원 한 기업의 정보 등록 및 관리
- 해당 기업에 대한 입사지원 정보 관리(자기소개서, 예상질문 및 답변 관리)
<br />

## 📌 주요 기능 : 자기소개서 작성
- 문항 키워드에 따른 유사한 자기소개서 조회
- 마이페이지에서 작성한 포트폴리오 조회
- 지원하는 기업의 정보 조회
- Open AI를 활용한 자소서 문맥 교정
- 글자수 계산, 임시저장 기능
<br />

## 📌 주요 기능 : 면접 준비**
- OpenAI API 활용한 자소서 답변에 대한 예상질문 추출
- OpenAI API 활용한 예상질문 답변에 대한 꼬리질문 추출
- 면접 준비를 위한 녹음 기능 구현
- 녹음 답변 스크립트로 제공(STT)
- 키워드, 속도, 스크립트를 이용한 스코어링 기능
<br />

### 3️⃣ 시스템 아키텍처
![시스템 아키텍처](etc/img/시스템_아키텍처.png)
<br />

<h2>4️⃣ 기술 스택</h2> 
![stack](etc/img/기술스택.png)
-Back-End
    - Java JDK 11
    - Spring Boot 2.7.17
    - Spring DATA JPA
    - Spring Security
    - JWT
    - OAuth2
    - QueryDSL
    - Python
    - Fast-api
- Front-End
    - React
    - Vite
    - Redux
    - Redux-Persist
    - React-query
    - TypeScript
    - Node.js
    - Axios
    - Styled-components
- Infra
    - Docker
    - Ngnix
    - Jenkins
    - Amazon S3
- DB
    - MySQL
    - S3
    - Redis
- Team Collaboration Tool
    - Gitlab
    - Jira
    - Notion
    - Figma
    - Mattermost
<br />

### 5️⃣ ERD
![ERD](etc/img/ERD.png)
<br />

### 6️⃣ [API 명세](https://educated-horn-9ae.notion.site/c6f8f48adc6f4535ae402d06777fda74?v=e65a4a0f258c42d6aeca896e1439a565)
<br />

### 7️⃣ 서비스 화면
<br />
