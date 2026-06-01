import { Request, Response } from "express";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

export const executeCode = async (
  req: Request,
  res: Response
) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        message: "Code and language required",
      });
    }

    const tempDir = path.join(
      __dirname,
      "../../temp"
    );

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, {
        recursive: true,
      });
    }

    let filename = "";
    let dockerCommand = "";

    // =====================
    // PYTHON
    // =====================
    if (language === "python") {
      filename = "main.py";

      const filePath = path.join(
        tempDir,
        filename
      );

      fs.writeFileSync(filePath, code);

      dockerCommand =
        `docker run --rm -v "${tempDir}:/app" -w /app python:3.12 python main.py`;
    }

    // =====================
    // JAVASCRIPT
    // =====================
    else if (
      language === "javascript" ||
      language === "js"
    ) {
      filename = "main.js";

      const filePath = path.join(
        tempDir,
        filename
      );

      fs.writeFileSync(filePath, code);

      dockerCommand =
        `docker run --rm -v "${tempDir}:/app" -w /app node:20 node main.js`;
    }

    // =====================
    // JAVA
    // =====================
     else if (language === "java") {
  filename = "Main.java";

  const filePath = path.join(
    tempDir,
    filename
  );

  fs.writeFileSync(filePath, code);

  dockerCommand =
    `docker run --rm -v "${tempDir}:/app" -w /app eclipse-temurin:21 sh -c "javac Main.java && java Main"`;
}
    // =====================
    // C++
    // =====================
    else if (
      language === "cpp" ||
      language === "c++"
    ) {
      filename = "main.cpp";

      const filePath = path.join(
        tempDir,
        filename
      );

      fs.writeFileSync(filePath, code);

      dockerCommand =
        `docker run --rm -v "${tempDir}:/app" -w /app gcc:13 sh -c "g++ main.cpp -o main && ./main"`;
    }

    else {
      return res.status(400).json({
        message: "Unsupported language",
      });
    }

    const result = await execAsync(
      dockerCommand,
      {
        timeout: 10000,
      }
    );

    const {
      stdout,
      stderr,
    } = result;

    return res.json({
      output:
        stderr ||
        stdout ||
        "No output",
    });

  } catch (error: any) {

    console.log(error);

    return res.status(500).json({
      output:
        error?.stderr ||
        error?.message ||
        "Execution failed",
    });
  }
};