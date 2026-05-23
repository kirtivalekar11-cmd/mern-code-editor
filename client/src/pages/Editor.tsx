import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MonacoEditor from "@monaco-editor/react";

import api from "../api/axios";

import { FaFile } from "react-icons/fa";



interface FileType {
  _id: string;
  filename: string;
  language: string;
  content: string;
}



export default function EditorPage() {

  const { projectId } = useParams();



  const [files, setFiles] =
    useState<FileType[]>([]);

  const [selectedFile, setSelectedFile] =
    useState<FileType | null>(null);

  const [filename, setFilename] =
    useState("");

  const [output, setOutput] =
    useState("");



  // PASTE DETECTION
  const [pasteDetected,
  setPasteDetected] =
    useState(false);

  const [pasteCount,
  setPasteCount] =
    useState(0);









  // FETCH FILES
  const fetchFiles = async () => {

    try {

      const response =
        await api.get(
          `/files/${projectId}`
        );

      setFiles(response.data);

      if (
        response.data.length > 0
      ) {

        setSelectedFile(
          response.data[0]
        );
      }

    } catch (error) {

      console.log(error);
    }
  };









  // CREATE FILE
  const createFile = async () => {

    if (!filename) return;

    let language =
      "javascript";



    if (
      filename.endsWith(".py")
    ) {

      language = "python";
    }

    else if (
      filename.endsWith(".cpp")
    ) {

      language = "cpp";
    }

    else if (
      filename.endsWith(".java")
    ) {

      language = "java";
    }



    try {

      const response =
        await api.post(
          "/files",
          {
            projectId,
            filename,
            language,
          }
        );



      setFiles((prev) => [
        ...prev,
        response.data,
      ]);



      setSelectedFile(
        response.data
      );



      setFilename("");

    } catch (error) {

      console.log(error);
    }
  };









  // SAVE FILE
  const saveFile = async (
    value: string | undefined
  ) => {

    if (!selectedFile) return;

    try {

      const response =
        await api.put(
          `/files/${selectedFile._id}`,
          {
            content:
              value || "",
          }
        );



      setFiles((prev) =>
        prev.map((file) =>

          file._id ===
          response.data._id

            ? response.data

            : file
        )
      );

    } catch (error) {

      console.log(error);
    }
  };









  // RUN CODE
  const runCode = async () => {

    if (!selectedFile) {

      setOutput(
        "No file selected"
      );

      return;
    }



    if (
      !selectedFile.content
    ) {

      setOutput(
        "File is empty"
      );

      return;
    }



    try {

      const response =
        await api.post(
          "/execute",
          {
            code:
              selectedFile.content,

            language:
              selectedFile.language,
          }
        );



      if (
        response.data &&
        response.data.output
      ) {

        setOutput(
          response.data.output
        );

      } else {

        setOutput(
          JSON.stringify(
            response.data,
            null,
            2
          )
        );
      }

    } catch (error: any) {

      setOutput(
        error.response?.data
          ?.message ||
        "Execution Error"
      );
    }
  };









  // LOAD FILES
  useEffect(() => {

    const loadFiles =
      async () => {

        await fetchFiles();
      };

    loadFiles();

  }, []);









  return (

    <div className="h-screen flex bg-[#1e1e1e] text-white">




      {/* SIDEBAR */}
      <div className="w-[300px] bg-[#252526] border-r border-zinc-700 p-4">

        <h2 className="text-xl font-bold mb-4">
          Files
        </h2>





        {/* CREATE FILE */}
        <div className="flex gap-2 mb-5">

          <input
            type="text"
            placeholder="index.js"
            className="bg-zinc-800 p-2 rounded flex-1 outline-none"
            value={filename}
            onChange={(e) =>
              setFilename(
                e.target.value
              )
            }
          />



          <button
            onClick={createFile}
            className="bg-blue-600 px-4 rounded"
          >
            Add
          </button>

        </div>








        {/* FILE LIST */}
        <div className="flex flex-col gap-2">

          {files.map((file) => (

            <div
              key={file._id}

              onClick={() =>
                setSelectedFile(
                  file
                )
              }

              className={`p-3 rounded cursor-pointer flex items-center gap-2 transition

              ${
                selectedFile?._id ===
                file._id

                  ? "bg-blue-600"

                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >

              <FaFile />

              <span>
                {file.filename}
              </span>

            </div>
          ))}

        </div>

      </div>









      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">




        {/* TOP BAR */}
        <div className="h-[60px] bg-[#252526] border-b border-zinc-700 flex items-center justify-between px-6">

          <div>

            <h2 className="text-lg font-semibold">

              {
                selectedFile?.filename ||
                "No File"
              }

            </h2>



            <p className="text-sm text-zinc-400">

              {
                selectedFile?.language
              }

            </p>

          </div>





          <button
            onClick={runCode}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded"
          >
            Run Code
          </button>

        </div>








        {/* PASTE WARNING */}
        {
          pasteDetected && (

            <div className="bg-red-600 text-white text-center p-3 font-bold">

              Paste Detected |
              Violations:
              {" "}
              {pasteCount}

            </div>
          )
        }









        {/* EDITOR */}
        <div className="flex-1">

          {selectedFile ? (

            <MonacoEditor
              height="100%"

              theme="vs-dark"

              language={
                selectedFile.language
              }

              value={
                selectedFile.content
              }






              onMount={(editor) => {

                editor.onDidPaste(() => {

                  console.log(
                    "PASTE DETECTED"
                  );






                  setPasteDetected(true);






                  setPasteCount(
                    (prev) => prev + 1
                  );






                  setTimeout(() => {

                    setPasteDetected(false);

                  }, 3000);
                });
              }}








              onChange={(value) => {

                if (
                  !selectedFile
                ) return;



                setSelectedFile({
                  ...selectedFile,

                  content:
                    value || "",
                });



                saveFile(value);
              }}
            />

          ) : (

            <div className="h-full flex items-center justify-center text-zinc-500 text-xl">

              No file selected

            </div>
          )}

        </div>









        {/* OUTPUT */}
        <div className="h-[200px] bg-black border-t border-zinc-700 p-4 overflow-auto">

          <h2 className="text-lg font-bold mb-2">
            Output
          </h2>

          <pre className="text-green-400 whitespace-pre-wrap">

            {output}

          </pre>

        </div>

      </div>

    </div>
  );
}