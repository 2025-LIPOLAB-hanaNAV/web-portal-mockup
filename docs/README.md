# 하나 금융그룹 포털 API 문서

## 개요

하나 금융그룹 포털 시스템의 게시판 기능을 위한 REST API 명세서입니다.

## API 명세서 확인 방법

### 1. Swagger UI로 확인

```bash
# swagger-ui-serve 설치 (글로벌)
npm install -g swagger-ui-serve

# API 명세서 확인
swagger-ui-serve docs/api-spec.yaml
```

브라우저에서 http://localhost:3000 으로 접속하여 API 문서를 확인할 수 있습니다.

### 2. 온라인 Swagger Editor 사용

1. https://editor.swagger.io/ 접속
2. `docs/api-spec.yaml` 파일 내용을 복사하여 붙여넣기
3. 실시간으로 API 문서 확인 및 테스트

## 주요 API 엔드포인트

### 게시글 관련 API

- `GET /posts` - 게시글 목록 조회
- `GET /posts/{postId}` - 게시글 상세 조회
- `PATCH /posts/{postId}/views` - 조회수 증가

### 첨부파일 관련 API

- `GET /attachments/{attachmentId}/download` - 첨부파일 다운로드

### 게시판 관련 API

- `GET /boards` - 게시판 목록 조회

## 인증

API는 JWT(JSON Web Token) 기반의 Bearer 인증을 사용합니다.

```
Authorization: Bearer <your-jwt-token>
```

## 응답 형식

모든 API 응답은 다음과 같은 일관된 형식을 따릅니다:

### 성공 응답
```json
{
  "success": true,
  "data": { /* 실제 데이터 */ },
  "message": "작업이 성공적으로 완료되었습니다."
}
```

### 오류 응답
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지",
    "details": "상세 에러 정보"
  },
  "timestamp": "2025-01-23T13:01:47Z"
}
```

## 상태 코드

- `200` - 성공
- `400` - 잘못된 요청
- `401` - 인증 실패
- `403` - 권한 없음
- `404` - 리소스를 찾을 수 없음
- `500` - 서버 내부 오류

## 페이지네이션

목록 조회 API는 페이지네이션을 지원합니다:

```json
{
  "posts": [/* 게시글 목록 */],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 86,
    "itemsPerPage": 20,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## 예제 요청

### 게시글 목록 조회
```bash
curl -X GET "https://api.hana-portal.co.kr/v1/posts?board=voice-phishing&page=1&limit=20" \
  -H "Authorization: Bearer your-jwt-token"
```

### 게시글 상세 조회
```bash
curl -X GET "https://api.hana-portal.co.kr/v1/posts/0401r2jxl" \
  -H "Authorization: Bearer your-jwt-token"
```

### 첨부파일 다운로드
```bash
curl -X GET "https://api.hana-portal.co.kr/v1/attachments/1/download" \
  -H "Authorization: Bearer your-jwt-token" \
  -o "downloaded-file.pdf"
```

## 개발환경

- Base URL: `http://localhost:3001/api`
- 인증: 개발 중에는 인증을 생략할 수 있습니다.

## 변경 이력

- v1.0.0 (2025-01-23): 초기 API 명세서 작성