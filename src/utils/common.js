/**
 * 숫자에 천 단위로 콤마를 찍어주는 함수
 * @param {number} num - 포맷팅할 숫자
 * @returns {string} 콤마가 찍힌 문자열
 */
export const formatNumberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
