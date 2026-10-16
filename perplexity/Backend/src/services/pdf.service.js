import fs from "node:fs/promises";
import { PDFParse } from "pdf-parse";

export async function extractPdfText(filePath) {
  const fileBuffer = await fs.readFile(filePath);

  const parser = new PDFParse({
    data: fileBuffer,
  });

  try {
    const result = await parser.getText();
    const text = result.text?.trim();
    if (!text) {
      throw new Error("PDF contains no extractable text.");
    }

    return text;
  } finally {
     await parser.destroy();
  }
}
