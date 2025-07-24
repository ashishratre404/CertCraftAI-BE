import { readFile } from "fs/promises";
import path from "path";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateCertificateHTML({
  backgroundPath,
  referencePath,
  name,
  course,
}) {
  const backgroundBuffer = await readFile(backgroundPath);
  const referenceBuffer = await readFile(referencePath);

  const base64Bg = backgroundBuffer.toString("base64");
  const base64Ref = referenceBuffer.toString("base64");

  const exampleBackgroundBuffer = await readFile("background.png");
  const exampleReferenceBuffer = await readFile("cert.png");

  const base64ExampleBg = exampleBackgroundBuffer.toString("base64");
  const base64ExampleRef = exampleReferenceBuffer.toString("base64");

  const exampleHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta
      name="viewport"
      content="width=1372, height=1060, initial-scale=1, user-scalable=0"
    />
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap");
      @import url("https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap");
      * {
        margin: 0;
        padding: 0;
        border: none;
        font-family: "Lato", sans-serif;
      }
      .container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .certImg {
        width: 100%;
      }
      .info {
        position: absolute;
        top: 50%;
        left: 10%;
        width: 80%;
        text-align: center;
      }
      .title {
        font-size: 27px;
        font-weight: 700;
        font-family: Libre Baskerville;
      }
      .name {
        font-size: 50px;
        font-weight: 700;
        font-family: Libre Baskerville;
        margin: auto;
        margin-top: 25px;
        width: 80%;
        border-bottom: 2px solid #1d2939;
      }
      .text {
        font-size: 24px;
        font-weight: 400;
        font-family: Libre Baskerville;
        margin-top: 50px;
      }
      .certName {
        font-size: 35px;
        font-weight: 700;
        font-family: Libre Baskerville;
        margin-top: 25px;
      }

      .leftBox {
        display: inline;
        position: absolute;
        top: 80%;
        left: 20%;
      }
      .rightBox {
        display: inline;
        position: absolute;
        top: 80%;
        right: 20%;
      }
      .key {
        color: #344054;
        font-size: 18px;
        font-weight: 300;
      }
      .value {
        font-size: 18px;
        font-weight: 600;
        color: #344054;
        margin-left: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img src="./spp.png" alt="issue loading certificate" class="certImg" />
      <div class="info">
        <p class="title">THIS CONFIRMS THAT</p>
        <p class="name">Mrs. Kavita Bhajan Mandali</p>
        <p class="text">
          successfully completed all course curriculum and passed the exam for
        </p>
        <p class="certName">SPP sales Certification program</p>
      </div>
      <div class="bottomInfo">
        <div class="leftBox">
          <span class="key">Certificate ID:</span>
          <span class="value">Asa73_joPZY72spCU</span>
        </div>
        <div class="rightBox">
          <span class="key">Issued On:</span>
          <span class="value">March 06, 2024</span>
        </div>
      </div>
    </div>
  </body>
</html>
`;

  const messages = [
    {
      role: "system",
      content:
        "You are an expert in generating HTML certificates from background and reference images.",
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Here is an example: background and reference image, and its correct HTML output.",
        },
        {
          type: "image_url",
          image_url: { url: `data:image/png;base64,${base64ExampleBg}` },
        },
        {
          type: "image_url",
          image_url: { url: `data:image/png;base64,${base64ExampleRef}` },
        },
      ],
    },
    {
      role: "assistant",
      content: exampleHTML,
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: `Now generate HTML for this certificate. Place name "${name}" and course "${course}" similar to the reference layout. This HTML will used to convert into pdf. Dont use image as css background but use as image like used in the exaple above`,
        },
        {
          type: "image_url",
          image_url: { url: `data:image/png;base64,${base64Bg}` },
        },
        {
          type: "image_url",
          image_url: { url: `data:image/png;base64,${base64Ref}` },
        },
      ],
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    max_tokens: 1500,
  });

  const html = response.choices[0].message.content;
  return html;
}
