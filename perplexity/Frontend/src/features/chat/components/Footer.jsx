
import React, { useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { useSelector } from "react-redux";
import axios from "axios";

const Footer = ({ currentChatId }) => {
  const chat = useChat();
  const [chatInput, setChatInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const fileInputRef = useRef(null);

  const isLoading = useSelector((state) => state.chat.isLoading);

  async function handlePdfUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
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
      alert(`${file.name} uploaded successfully!`);
      console.log("PDF upload response:", response.data);
    } catch (error) {
      console.error("PDF upload error:", error);
      alert(
        error.response?.data?.message ||
          error.response?.data?.err ||
          "PDF upload failed.",
      );
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  }

  function handelSubmit(e) {
    e.preventDefault();

    const trimMessage = chatInput.trim();
    if (!trimMessage) return;

    chat.handelSendMessage({
      message: trimMessage,
      chatId: currentChatId,
    });

    setChatInput("");
  }

  return (
    <footer className="shrink-0 w-full max-w-[750px] mx-auto border rounded-3xl border-white/60 bg-mist-900 p-4 md:py-4 md:px-5">
      {uploadedPdf && (
        <div className="mb-3 text-sm text-white/80">
          📄 Attached PDF: {uploadedPdf}
        </div>
      )}

      <form
        onSubmit={handelSubmit}
        className="flex flex-col gap-3 px-2 md:flex-row md:items-center"
      >
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
          className="px-3 border border-white/50 rounded-2xl text-white disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "📎"}
        </button>

        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          className="w-full min-w-0 border-none outline-none bg-transparent text-white placeholder:text-white"
          type="text"
          placeholder="Ask about your PDF..."
        />

        {isLoading ? (
          <button
            className="px-3 py-2 border border-white/50 rounded-2xl text-white"
            type="button"
            onClick={() => chat.handleStop()}
          >
            Stop
          </button>
        ) : (
          <button
            className="px-3 py-2 border border-white/50 rounded-2xl text-white"
            type="submit"
          >
            Send
          </button>
        )}
      </form>
    </footer>
  );
};

export default Footer;
