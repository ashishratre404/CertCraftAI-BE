import { generateCertificateHTML } from "../ai/generateCertificateHTML.js";
import { writeFile } from "fs/promises";

export async function handleGenerate(req, res) {
  try {
    const { name, course } = req.body;

    const backgroundBuffer = req.files?.backgroundImage?.[0]?.buffer;
    const referenceBuffer = req.files?.referenceImage?.[0]?.buffer;

    if (!name || !course || !backgroundBuffer || !referenceBuffer) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields or files" });
    }

    // Save temporarily to disk (optional)
    await writeFile("background.png", backgroundBuffer);
    await writeFile("cert.png", referenceBuffer);

    const html = await generateCertificateHTML({
      backgroundPath: "background.png",
      referencePath: "cert.png",
      name,
      course,
    });

    res.json({ success: true, html });
  } catch (error) {
    console.error("Generate Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
