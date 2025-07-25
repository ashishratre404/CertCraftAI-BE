import { modifyCertificateHTML } from "../ai/modifyCertificateHTML.js";

export async function handleModify(req, res) {
  try {
    const { html, instruction } = req.body;

    const modifiedHTML = await modifyCertificateHTML({ html, instruction });

    res.json({ success: true, html: modifiedHTML });
  } catch (error) {
    console.error("Modify Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
