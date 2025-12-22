import { useState } from "react";
import NoteTab from "../../../components/shared/NoteTab";

export default function PrivacyPolicy() {
    const [content,setContent] = useState('');
  return (
    <div className="px-3">
      <h4 className="text-2xl font-semibold py-3">Terms & Conditions</h4>
      <NoteTab
      content={content}
      handleContentChange={setContent}
      />
      <button className="bg-primary h-12 w-full rounded-md text-white text-lg font-semibold">
        Save
      </button>
    </div>
  )
}
