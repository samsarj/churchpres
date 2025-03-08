import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Plus } from "react-bootstrap-icons";

const TiptapEditor = ({ content, setContent }) => {
  const formatContentForEditor = (content) => {
    return content.map((section) => `<h3>${section.verse}</h3><p>${section.lyrics.replace(/\n/g, "<br>")}</p>`).join("");
  };

  const [editorContent, setEditorContent] = useState(formatContentForEditor(content));

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: editorContent,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });

  const addSection = (sectionType) => {
    const existingCount = countSections(sectionType);
    const sectionName = `${sectionType} ${existingCount + 1}`;
    editor.chain().focus().insertContentAt(editor.state.doc.content.size, `<h3>${sectionName}</h3><p><br></p>`).run();
  };

  const countSections = (type) => {
    const tempButtonGroup = document.createElement("div");
    tempButtonGroup.innerHTML = editorContent;

    return Array.from(tempButtonGroup.getElementsByTagName("h3")).filter((h3) =>
      h3.innerText.toLowerCase().includes(type.toLowerCase())
    ).length;
  };

  return (
    <div>
      <div className="tiptap-toolbar">
        <ButtonGroup className="me-2">
          <Button onClick={() => editor.chain().focus().toggleBold().run()} className="tiptap-btn">
            <strong>B</strong>
          </Button>
          <Button onClick={() => editor.chain().focus().toggleItalic().run()} className="tiptap-btn">
            <em>I</em>
          </Button>
          <Button onClick={() => editor.chain().focus().toggleUnderline().run()} className="tiptap-btn">
            <u>U</u>
          </Button>
        </ButtonGroup>
        <ButtonGroup className="tiptap-toolbar">
          <Button onClick={() => addSection("Verse")}><Plus /> Verse</Button>
          <Button onClick={() => addSection("Chorus")}><Plus /> Chorus</Button>
          <Button onClick={() => addSection("Bridge")}><Plus /> Bridge</Button>
          <Button onClick={() => addSection("Ending")}><Plus /> Ending</Button>
        </ButtonGroup>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
