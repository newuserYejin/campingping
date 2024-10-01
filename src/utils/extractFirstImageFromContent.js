//태그에서 썸네일 뽑기
function extractFirstImageFromContent(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
  
    // 첫 번째 <img> 태그 찾음
    const firstImg = doc.querySelector("img");
  
    // <img> 태그가 존재할 경우, src 속성을 반환
    if (firstImg) {
      return firstImg.src;
    }
  
    // 이미지가 없을 경우 null을 반환
    return null;
  }

export default extractFirstImageFromContent