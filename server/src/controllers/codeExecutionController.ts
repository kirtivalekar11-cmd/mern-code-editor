import axios from "axios";

import {
  Request,
  Response,
} from "express";



export const executeCode =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const {
        code,
        language,
      } = req.body;





      // JDoodle language mapping
      let jdoodleLanguage =
        "nodejs";

      let versionIndex = "4";



      if (
        language === "python"
      ) {

        jdoodleLanguage =
          "python3";

        versionIndex = "4";
      }



      else if (
        language === "cpp"
      ) {

        jdoodleLanguage =
          "cpp17";

        versionIndex = "1";
      }



      else if (
        language === "java"
      ) {

        jdoodleLanguage =
          "java";

        versionIndex = "4";
      }






      const response =
        await axios.post(

          "https://api.jdoodle.com/v1/execute",

          {
            clientId:
              process.env.JDOODLE_CLIENT_ID,

            clientSecret:
              process.env.JDOODLE_CLIENT_SECRET,

            script: code,

            language:
              jdoodleLanguage,

            versionIndex,
          }
        );





      return res.status(200).json({

        output:
          response.data.output,
      });

    } catch (error: any) {

      console.log(
        "EXECUTION ERROR:"
      );

      console.log(
        error.response?.data ||
        error.message
      );



      return res.status(500).json({

        message:
          "Execution Failed",
      });
    }
  };