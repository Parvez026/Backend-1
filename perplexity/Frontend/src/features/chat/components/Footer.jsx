import React, { useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { useSelector } from "react-redux";
import axios from "axios";

const Footer = ({ currentChatId }) => {
  const chat = useChat();
  const [chatInput, setChatInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const fileInputRef = useRef(null);

  const isLoading = useSelector((state) => state.chat.isLoading);

  async function handlePdfUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please select a PDF file.");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);

      const response = await axios.post(
        "http://localhost:3000/api/documents/upload",
        formData,
        { withCredentials: true },
      );

      setUploadedPdf(file.name);
      alert("PDF uploaded successfully!");
      console.log(response.data);
      setDocumentId(response.data.documentId);
    } catch (error) {
      alert(error.response?.data?.message || "PDF upload failed.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const message = chatInput.trim();
    if (!message || isLoading) return;

    chat.handelSendMessage({
      message,
      chatId: currentChatId,
      documentId: documentId,
    });

    setChatInput("");
  }

  return (
    <footer className="shrink-0 w-full max-w-[750px] mx-auto border rounded-3xl border-white/60 bg-mist-900 p-4">
      {uploadedPdf && (
        <div className="mb-3 text-sm text-white/80">📄 {uploadedPdf}</div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={handlePdfUpload}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="px-3 py-2 border border-white/50 rounded-xl text-white disabled:opacity-50"
          title="Upload PDF"
        >
          {isUploading ? "..." : "📎"}
        </button>

        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          className="flex-1 min-w-0 bg-transparent text-white outline-none"
          type="text"
          placeholder="Ask anything..."
        />

        {isLoading ? (
          <button
            type="button"
            onClick={() => chat.handleStop()}
            className="px-3 py-1 border border-white/50 rounded-xl text-white"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!chatInput.trim()}
            className="px-3 py-1 border border-white/50 rounded-xl text-white disabled:opacity-50"
          >
            Send
          </button>
        )}
      </form>
    </footer>
  );
};

export default Footer;
