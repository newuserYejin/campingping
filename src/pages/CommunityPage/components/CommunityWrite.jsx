import React, { useCallback, useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";

Quill.register("modules/ImageResize", ImageResize);

const CommunityWritePage = ({ onSubmit, maxImageSize = 2 * 1024 * 1024 }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const quillRef = React.useRef();

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Container
        sx={{
          margin: "4em auto",
        }}>
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

            <div>
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
            </div>

            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "4em",
              }}>
              등록
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default CommunityWritePage;
