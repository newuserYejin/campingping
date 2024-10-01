import React, { useCallback, useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

Quill.register("modules/ImageResize", ImageResize);

const StyledReactQuill = styled.div`
  .ql-editor {
    height: 40vh;
  }
`;

const CommunityWritePage = ({
  category,
  onSubmit,
  maxImageSize = 2 * 1024 * 1024,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const quillRef = React.useRef();
  const navigate = useNavigate();

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file.size > maxImageSize) {
        alert(
          `이미지 크기는 ${maxImageSize / 1024 / 1024}MB를 초과할 수 없습니다.`
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", e.target.result);
      };
      reader.readAsDataURL(file);
    };
  }, [maxImageSize]);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    ImageResize: {
      parchment: Quill.import("parchment"),
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    // 게시글 데이터
    const postData = {
      title: title,
      content: content,
      category: category,
    };

    try {
      const response = await api.post("/post", postData);

      // 응답 처리
      if (response.status === 200) {
        alert("게시글이 성공적으로 등록되었습니다!");
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Error posting data:", error);
      alert(`게시글 등록 중 오류가 발생했습니다: ${error.message}`);
    }

    navigate("/market");
  };

  return (
    <>
      <Container
        sx={{
          margin: "4em auto",
        }}
      >
        <div className="post-editor">
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="제목"
              label="제목"
              name="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <StyledReactQuill>
              <ReactQuill
                theme="snow"
                ref={quillRef}
                value={content}
                onChange={setContent}
                modules={modules}
                style={{
                  height: "100%",
                  maxHeight: "100%",
                  overflowY: "auto",
                }}
              />
            </StyledReactQuill>

            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              sx={{
                marginTop: "4em",
              }}
            >
              등록
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default CommunityWritePage;
