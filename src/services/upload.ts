/*eslint-disable @typescript-eslint/no-explicit-any*/
import { Request, Response } from "express";
import { ApiResponse, Logger } from "../libs";
import { MulterMiddleWare } from "../middlewares";
import { Cloudinary } from "../config";
import path from "path";
import { Tools } from "../utils";
import multer from "multer";

function removeSpace(title: any) {
  return title.replaceAll(" ", "_");
}

class UploadService {
  async uploadImage(req: any, res: Response): Promise<object> {
    try {
      const folder = `abbey/postImages/${removeSpace(req.query.title)}`;

      if (req.file.fieldname !== "thumbnail")
        return ApiResponse.AuthenticationError(res, "thumbnail is required");
      if (!req.file)
        return ApiResponse.AuthenticationError(res, "Please select an image");

      const file = MulterMiddleWare.dataUri(req, req.file).content;

      const uploadResponse = await Cloudinary.uploader.upload(file, {
        resource_type: "image",
        folder,
        use_filename: true
      });

      if (uploadResponse) {
        const url = uploadResponse.secure_url;

        return ApiResponse.Success(res, {
          url,
          message: "Post image uploded successfully"
        });
      }
    } catch (error) {
      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          return ApiResponse.AuthenticationError(
            res,
            "File size exceeds limit of 50MB"
          );
        }
      }
    }
  }

  async uploadVideos(req: Request, res: Response): Promise<object> {
    try {
      if (!req.files || req.files.length === 0)
        return ApiResponse.AuthenticationError(
          res,
          "Please select at least a video file"
        );
      const folder = `abbey/postImages/${removeSpace(req.query.title)}`;
      const files = req.files as Express.Multer.File[];
      const uploadPromises = files.map(async (file: any) => {
        const dataUriContent =
          MulterMiddleWare.dataUri(file).content; /* file.buffer */

        return await Tools.uploadVideoToCloud(
          dataUriContent,
          path.extname(file.originalname).toString().replace(".", ""),
          folder
        );
      });

      const results = await Promise.all(uploadPromises);
      const response = results.map((result: any) => ({
        url: result?.secure_url
      }));
      return ApiResponse.Success(res, {
        message: "Course video(s) uploaded successfully",
        urls: response
      });
    } catch (error) {
      Logger.error(`Video upload error: ${error.message.toString()}`);
      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          return ApiResponse.AuthenticationError(
            res,
            "File size exceeds limit of 50MB"
          );
        }
      }
      return ApiResponse.InternalServerError(
        res,
        "Server Error: Something went wrong"
      );
    }
  }
}

export default new UploadService();
