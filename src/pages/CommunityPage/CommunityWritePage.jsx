import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Container } from "@mui/material";

const CommunityWritePage = ({
  handleSubmit,
  title,
  setTitle,
  content,
  setContent,
}) => {
  return (
    <>
      <Container
        sx={{
          margin: "6em auto",
        }}>
        <div className="post-editor">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요"
                required
              />
            </div>
            <div>
              <label htmlFor="content">내용:</label>
              <ReactQuill theme="snow" value={content} onChange={setContent} />
            </div>
            <button type="submit">게시하기</button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default CommunityWritePage;
