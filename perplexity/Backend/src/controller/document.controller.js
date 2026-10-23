import fs from "node:fs/promises";
import { extractPdfText } from "../services/pdf.service.js";
import { storePdfChunks } from "../services/rag.service.js";

export async function uploadPdf(req, res) {
  let filePath;

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF file",
      });
    }
    filePath = req.file.path;

    const text = await extractPdfText(filePath);
    const result = await storePdfChunks(text, {
      originalName: req.file.originalname,
      userId: req.user.id,
    });

    return res.status(201).json({
      message: "PDF processed successfully",
      totalChunks: result.totalChunks,
      documentId: result.documentId,
    });
  } catch (error) {
    console.error("PDF upload error:", error);

    return res.status(500).json({
      message: "Failed to process PDF",
    });
  } finally {
    if (filePath) {
      await fs.unlink(filePath).catch(() => {});
    }
  }
}
