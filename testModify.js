import { readFile, writeFile } from "fs/promises";
import { modifyCertificateHTML } from "./api/ai/modifyCertificateHTML.js";

async function testModify() {
  const originalHTML = await readFile("certificate_output.html", "utf-8");

  const instruction = "make name red";

  const modifiedHTML = await modifyCertificateHTML({
    html: originalHTML,
    instruction,
  });

  console.log("✅ Modified HTML:\n", modifiedHTML);

  await writeFile("certificate_modified.html", modifiedHTML);
  console.log("✅ Saved to certificate_modified.html");
}

testModify().catch(console.error);
