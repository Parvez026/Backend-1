
import React, { useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { useSelector } from "react-redux";
import axios from "axios";
import { Paperclip, Send, Square, FileText, X } from "lucide-react";

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
      documentId,
    });

    setChatInput("");
  }

  function removePdf() {
    setUploadedPdf(null);
    setDocumentId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <footer className="mx-auto w-full max-w-[750px] shrink-0 px-2 sm:px-4">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 shadow-lg shadow-black/10 transition focus-within:border-violet-400/40 sm:rounded-3xl sm:p-3">
        {uploadedPdf && (
          <div className="mb-2 flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
            <FileText size={18} className="shrink-0 text-violet-300" />
            <span className="min-w-0 flex-1 truncate text-xs text-white/80 sm:text-sm">
              {uploadedPdf}
            </span>
            <button
              type="button"
              onClick={removePdf}
              className="shrink-0 rounded-lg p-1 text-white/50 hover:bg-white/10 hover:text-white"
              title="Remove PDF"
              aria-label="Remove uploaded PDF"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex min-w-0 items-center gap-2">
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
            disabled={isUploading || isLoading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-40 sm:h-11 sm:w-11"
            title="Upload PDF"
            aria-label="Upload PDF"
          >
            {isUploading ? (
              <span className="animate-pulse text-xs">...</span>
            ) : (
              <Paperclip size={19} />
            )}
          </button>

          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-white outline-none placeholder:text-white/35 sm:text-base"
            type="text"
            placeholder="Ask anything..."
            aria-label="Message"
          />

          {isLoading ? (
            <button
              type="button"
              onClick={() => chat.handleStop()}
              className="flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-red-400/20 bg-red-400/10 px-3 text-xs text-red-300 transition hover:bg-red-400/20 sm:h-11 sm:px-4 sm:text-sm"
            >
              <Square size={13} />
              <span>Stop</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!chatInput.trim() || isUploading}
              className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-violet-500 px-3 text-sm font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:px-4"
            >
              <span className="hidden sm:inline">Send</span>
              <Send size={16} />
            </button>
          )}
        </form>
      </div>
    </footer>
  );
};

export default Footer;
