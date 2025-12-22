
import { useRef } from "react";
import "jodit/es2021/jodit.min.css";
import JoditEditor from "jodit-react";
interface NoteTabProps {
  handleContentChange?: any;
  content?: string;
  height?: string;
  isDesabled?: boolean;
  isSmallSize?: boolean
}

export default function NoteTab({
  handleContentChange,
  content,
  height="60vh",
  isDesabled=false,
  isSmallSize=false

}: NoteTabProps) {
  const editor = useRef(null);


  const config = {
    readonly: false,
    placeholder: "Type your notes here..",
    toolbarSticky: false,
    height: height,
     disabled: isDesabled,
    style: {
      background: "#fff",
      borderRadius: "17px",
      border:"none",
      boxShadow:"none"
      // padding: "8px",
    },
    ...(isSmallSize && {buttons: ["paragraph", "bold", "italic", "underline", "ul", "ol", "brush"]}),
    // ✅ Force same buttons on all screen sizes
    // buttons: ["paragraph", "bold", "italic", "underline", "ul", "ol", "brush"],
    // buttonsMD: [
    //   "paragraph",
    //   "bold",
    //   "italic",
    //   "underline",
    //   "ul",
    //   "ol",
    //   "brush",
    // ],
    // buttonsMD: [
    //   "paragraph",
    //   "bold",
    //   "italic",
    //   "underline",
    //   "ul",
    //   "ol",
    //   "brush",
    // ],
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
  };

  return (
    <div
      style={{
        // border: "1px solid #003877",
        borderRadius: "11px",
        border: "none",
        // padding: "12px",
      }}
      className="bg-white rounded-lg py-4"
    >
      <JoditEditor
        ref={editor}
        value={content || ""}
        config={config}
        onBlur={(newContent) => handleContentChange(newContent)}
        onChange={() => {}}
      />
    </div>
  );
}
