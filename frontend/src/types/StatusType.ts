export enum HTTP_STATUS {
  OK = 200,
  BAD_REQUEST = 400, // 잘못된 토큰(로그아웃)
  UNAUTHORIZED = 401, // 토큰 만료(리프레시 토큰 재요청)
  FORBIDDEN = 403, // alert('권한없음')
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500, // 에러페이지
}

export enum Result_STATUS {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
