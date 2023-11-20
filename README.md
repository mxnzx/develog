# 취업 준비 걱정 끝 [develog]

### 1️⃣ 프로젝트 개요

📌 **개발 기간**

| 개발 기간 | 2023.10.10 ~ 2023.11.17 (6주) |
| --- | --- |

---

📌 **팀원 소개**

| 팀원 | 역할 |
| --- | --- |
| 김선진 | BE |
| 류민지(팀장) | BE |
| 최범선 | BE |
| 박소현 | FE |
| 송지윤 | FE |
| 신동민 | FE |

---

📌 **기획 의도**

취업 준비 프로세스를 한곳에서 관리할 수 있으면 효율적이지 않을까…?

---

면접 준비를 할 수 있는 플랫폼이 있다면 좋지 않을까…?

---

---

📌 **목표**

한 눈에 관리되는 정보, 편안한 에디터 환경으로 사용자 편의성 증가

---

놓치기 쉬운 키워드 체크부터 스코어링까지 차별적인 기능 제공

---

취업 프로세스를 하나의 플로우로 관리

---

📌 시연영상

https://www.youtube.com/watch?v=vzH0BbY1lxA

---

### 2️⃣ 서비스 소개

📌 **주요 기능 : 지원 기업 관리**

- 기업 분석한 정보 등록 및 관리
- 기업에 대한 모든 취업준비 프로세스 관리

📌 **주요 기능 : 자기소개서 작성**

- 문항 키워드에 따른 유사한 자기소개서 조회
- 마이페이지에서 작성한 포트폴리오 조회
- 지원하는 기업의 정보 조회
- Open AI를 활용한 자소서 문맥 교정
- 글자수 계산, 임시저장 기능

📌 **주요 기능 : 면접 준비**

- OpenAI API 활용한 자소서 답변에 대한 예상질문 추출
- OpenAI API 활용한 예상질문 답변에 대한 꼬리질문 추출
- 실제 면접처럼 녹음, 실전 연습 기능
- 키워드, 속도, 스크립트를 이용한 스코어링 기능

---

### 3️⃣ 시스템 아키텍처

![시스템 아키텍처](etc/img/시스템_아키텍처.png)

---

### 4️⃣ 기술 스택

- Back-End
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

---

### 5️⃣ ERD

![ERD](etc/img/ERD.png)

---

### 6️⃣ [API 명세](https://educated-horn-9ae.notion.site/c6f8f48adc6f4535ae402d06777fda74?v=e65a4a0f258c42d6aeca896e1439a565)


---

### 7️⃣ 서비스 화면
