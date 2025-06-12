# Hotel Atelier

## 프로젝트 개요
**Hotel Atelier**는 호텔 예약, 결제, 리뷰, 룸서비스, 멤버십 관리 등 통합 서비스를 제공하는 웹 애플리케이션입니다.  
사용자 중심의 예약/결제 UX와 관리자용 운영 도구를 포함한 **All-in-One 호텔 플랫폼**입니다.

---

## 기술 스택

### Frontend
- React 18
- Axios, React Router, TailwindCSS
- Vercel 배포

### Backend
- Spring Boot 3.x (Java 17)
- Spring Security + JWT 인증
- JPA (Hibernate)
- MySQL 8 (Docker)

### DevOps & Infra
- Docker / Docker Compose
- AWS EC2 (Ubuntu)
- Nginx (HTTPS, Reverse Proxy)
- Certbot (Let's Encrypt SSL)

---

## 주요 기능

### 사용자 기능
- 회원가입/로그인 (JWT)
- 호텔 객실 조회 및 예약
- 결제 (아임포트 API 연동)
- 리뷰 등록 및 조회
- 멤버십 가입 및 할인 적용

### 관리자 기능
- 숙소, 룸서비스, 베이커리 등록/수정/삭제
- 예약/결제 내역 확인
- 관리자 페이지 전용 API 보안 처리

---

## 프로젝트 구조
frontend/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── api/
│ └── App.jsx
backend/
├── src/main/java/com/atelier/
├── src/main/resources/
│ └── application.yml
Dockerfile
docker-compose.yml
nginx.conf
.env


---

## Docker 실행 방법

## 1. EC2 SSH 접속 후 프로젝트 폴더 진입
## 2. .env 파일 설정 (.env 참고)
## 3. Docker 이미지 빌드 및 컨테이너 실행
## 4. https://www.hotelatelier.shop 접속

---

## 배포 URL
- 사용자 페이지: [https://www.hotelatelier.shop](https://www.hotelatelier.shop)
- 관리자 페이지: (로그인 필요, 백엔드 API: `/api/atelier/admin/...`)

---

## 이메일 인증 설정
- SMTP: Naver 메일 사용 (465 포트, SSL)
- 이메일 발송: `ateliertest1@naver.com`

---

## 보안
- JWT 토큰 기반 인증 (Spring Security)
- CORS 정책 설정 (Nginx, Spring)
- HTTPS 및 HSTS 적용

---

## 외부 API 연동
- **아임포트 결제 API**
- (계획) Google Maps API 등 추가 연동 고려

---

## 담당 역할
- **김상엽** - Backend, DevOps, DB 설계
