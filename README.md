 # CNFT-WITH
    1. 팀 : 15팀
    
    2. 팀원
        - 안준철 : 2019243016
        - 백지환 : 2019243023
        - 김우희 : 2019243058
        - 이상용 : 2019243104
        
    3. 프로젝트 주제 : cnft-with 홈페이지 개발
    4. 프로젝트 소개 : cnft 사용을 위한 메뉴얼(커뮤니티) 및 상업적 활용을 위한 홈페이지
 
 
 # 서버 열기 전 확인 사항

    1. callback URL change
    2. server.js 에서 DB 아이디 비번 바꾸기
    3. SQL 쿼리문에 비번 바꾸기
    4. vscode에서 해당 루트 폴더 이동 후 터미널에 'npm install' 입력




# 사파리 구글 로그인 시 구글 드라이브 이미지 불러올 수 없는 오류

    safari → 설정 → 개인정보 보호 → 크로스 사이트 추적 방지 해제




# version

    2023/02/22 - v1.4.0
    2023/02/24 - v1.4.1
    2023/02/26 - v1.4.2
    2023/02/27 - v1.4.3
    2023/03/03 - v1.4.4
    2023/03/09 - v1.4.5
    2023/05/22 - v1.5.0
    2023/06/04 - v1.5.1



# SERVER UPLOAD
    2023/06/04 - UPDATE


# SERVER BASE OPTIONS
    AWS로 인스턴스 생성
     - MySQL 설치
     - NODEjs 설치
    
    Filezilla (FTP)로 서버에 소스코드 업로드
     - AWS로 받은 키파일 Filezilla에 연결
     - 키파일을 통해서 서버에 접속
     - 소스코드 업데이트시 서버코드 최신파일로 업데이트
     
    쉘을 종료하면 서버가 꺼지는 문제
     - pm2를 이용하여 백그라운드로 실행하여 항상 서버 실행

     홈페이지 접속 시 이미지가 나오지 않는 버그
      - 한글로 되어있는 이미지 파일명을 영어로 변경하여 해결
     
    인스턴스 재시작시 동적 IP를 할당받음
     - 탄력적 IP를 할당받아 인스턴스를 재시작해도 IP 고정
     - 고정아이피의 네임서버를 도메인과 연결
     - 도메인 : cookiepawn.shop
     
    도메인으로 접속 시 3000포트로 접속해야 하는 문제
     - 도메인으로 접속하면 http 접근포트인 80포트로 접속
     - IPtables로 80번 포트를 3000번 포트로 포트포워딩
    
    최신글이 9시간전에 작성된 것으로 나오는 현상
     - 서버 시간이 기본적으로 UST(협정세계시)로 설정되어 있음
     - UST(협정세계시)인 서버 시간을 +9하여 KST(한국시간)과 동기화

    서버에 SQL인젝션 발생
     - DB 초기화를 통해 서버는 다시 정상작동 소스코드 수정 필요

    2023/06/16 서버 아이피 새로 할당완료
               서버에 최신 파일로도 업데이트
               SSL 인증서 적용완료 - 코드 내의 URL https로 모두 수정
