import { Request, Response } from "express";

import File from "../models/File";

import { AuthRequest }
from "../middleware/authMiddleware";



// CREATE FILE
export const createFile = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const {
      projectId,
      filename,
      language,
    } = req.body;

    const file = await File.create({
      projectId,
      filename,
      language,
      content: "",
    });

    res.status(201).json(file);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



// GET PROJECT FILES
export const getFiles = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const files = await File.find({
      projectId: req.params.projectId,
    });

    res.status(200).json(files);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



// SAVE FILE CONTENT
export const saveFile = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const { content } = req.body;

    const updatedFile =
      await File.findByIdAndUpdate(
        req.params.id,
        { content },
        { returnDocument: "after" }
      );

    res.status(200).json(updatedFile);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteFile = async (
  req: Request,
  res: Response
) => {
  try {
    const file = await File.findByIdAndDelete(
      req.params.id
    );

    if (!file) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    res.json({
      message: "File deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};