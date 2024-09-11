/**
 * 숫자에 천 단위로 콤마를 찍어주는 함수
 * @param {number} num - 포맷팅할 숫자
 * @returns {string} 콤마가 찍힌 문자열
 */
export const formatNumberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 이메일 유효성 검사
export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(email);
};

// 비밀번호 유효성 검사 - 최소 8자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
export const validatePassword = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return re.test(password);
};

// 전화번호 유효성 검사 -   010-1234-5678 또는 01012345678
export const validateContact = (contact) => {
  const re = /^01(?:0|1|[6-9])-?(?:\d{3}|\d{4})-?\d{4}$/;
  return re.test(contact);
};

// 닉네임 검사 - 8자리 까지만
export const validateNickname = (nickname) => {
  return nickname.length <= 8;
};
