import { Request, Response } from "express";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import User from "../models/User";



const generateToken = (id: string) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};





// REGISTER USER
export const registerUser =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const {
        name,
        email,
        password,
      } = req.body;





      const userExists =
        await User.findOne({
          email,
        });




      if (userExists) {

        return res.status(400).json({
          message:
            "User already exists",
        });
      }







      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );






      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword,
        });







      return res.status(201).json({

        _id: user._id,

        name: user.name,

        email: user.email,

        token:
          generateToken(
            user._id.toString()
          ),
      });

    } catch (error) {

      return res.status(500).json({
        message:
          "Server Error",
      });
    }
  };









// LOGIN USER
export const loginUser =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const {
        email,
        password,
      } = req.body;





      const user =
        await User.findOne({
          email,
        });




      if (
        user &&
        (
          await bcrypt.compare(
            password,
            user.password
          )
        )
      ) {

        return res.json({

          _id:
            user._id,

          name:
            user.name,

          email:
            user.email,

          token:
            generateToken(
              user._id.toString()
            ),
        });
      }






      return res.status(401).json({
        message:
          "Invalid email or password",
      });

    } catch (error) {

      return res.status(500).json({
        message:
          "Server Error",
      });
    }
  };