# AInterview_backend
2025 one 엑스포 백엔드

## 개발 환경
rasberry-pi 5 + mysql workbench + node.js로 구성되어 있습니다.

## 디렉토리 구조

```plaintext
ainterview_back/
├── calendar/
├── config/
│   └── database.js             # DB 연결 전용
├── controllers/                # 요청 로직 처리
│   └── basicController.js
├── feedback/
├── mainpage/
├── models/                     # DB 모델 로직 처리 (ex. 쿼리)
│   └── basicModel.js
├── register/
├── routes/                     # URL 경로 라우팅 처리
│   └── basicRouter.js
├── .env                        # 환경 변수
├── .gitignore                  # Git 추적 제외 파일 목록
├── package-lock.json
├── package.json                # 프로젝트 의존성 및 스크립트
├── README.md
└── server.js                   # 서버 시작, 앱 진입
```


### register/
로그인/회원가입에 대한 코드 저장 파일입니다. <br>
회원탈퇴, 비밀번호 일치 확인 등의 기능도 이 파일에 저장하며 이외에 서술하지 않은 기능 중 아이디와 비밀번호를 다루는 모든 기능은 이 파일에 저장합니디.

### feedback/
피드백 리스트에 대한 코드 저장 파일입니다. <br> 
피드백 저장, 리스트 조회 등 피드백에 관련된 기능은 모두 이 파일에 저장합니다.

### mainpage/
메인 페이지에 포함되어 있는 기능들에 대한 코드 저장 파일입니다. <br> 
금주 일정 조회, 가장 최근 피드백 조회 등 메인 페이지에 포함되어 있는 기능과 알림 조회, 푸시 알림 전송까지 이 파일에 포함하여 저장합니다.

### calendar/
캘린더에 대한 코드 저장 파일입니다. <br>
일정 조회, 생성, 삭제 등 캘린더에 관련된 기능은 모두 이 파일에 저장합니다.



## 실행

### 기본 실행
git clone 이후 > 터미널 내에서 npm install 진행 <br>
자동 저장 프로그램 설치 > npm install nodemon --save-dev <br>
.env 파일을 관리하기 위한 설치 > npm install dotenv <br>
프로젝트 실행 > npm start <br>

### 권장 사항
프로젝트 실행은 모두 get 방식으로 진행할 수 있도록 하며, 작동에 대한 확인은 각 개인의 postman으로 확인 <br>
기본 세팅의 실행 링크는 localhost:3000/example <br>
기본 세팅 프로젝트 실행 후 에러가 나지 않는다면 basicContorller, basicModel, basicRouter는 삭제 후 개발 진행 <br>


## 파일명 지정 방법
파일명은 기능 및 페이지가 잘 드러날 수 있도록 하며, 너무 길지 않게 작성 <br>
길어질 경우 문자가 끝나는 사이에 대문자 삽입 ex)usercontroller > userController
