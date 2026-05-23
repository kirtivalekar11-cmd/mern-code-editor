import { Response } from "express";

import Project from "../models/Project";

import { AuthRequest }
from "../middleware/authMiddleware";


// CREATE PROJECT
export const createProject = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const { title, language } = req.body;

    const project =
      await Project.create({

        userId: req.user.id,

        title,

        language,

      });

    res.status(201).json(project);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



// GET USER PROJECTS
export const getProjects = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const projects =
      await Project.find({
        userId: req.user.id,
      });

    res.status(200).json(projects);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



// DELETE PROJECT
export const deleteProject = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    await Project.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Project Deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};