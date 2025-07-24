import { generateCertificateHTML } from "./ai/generateCertificateHTML.js";
import fs from "fs/promises";
import path from "path";

async function test() {
  const html = await generateCertificateHTML({
    backgroundPath: path.join("background.png"),
    referencePath: path.join("cert.png"),
    name: "Ashish Ratre",
    course: "AI-Powered Certificate Design",
  });

  console.log("✅ HTML Generated:\n", html);

  await fs.writeFile("certificate_output.html", html);
  console.log("✅ Saved to certificate_output.html");
}

test().catch(console.error);
