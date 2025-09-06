/*eslint-disable @typescript-eslint/no-explicit-any*/
import { Request, Response } from "express";
import { Logger, ApiResponse } from "../../libs";
import { UploadService } from "../../services";

const imageUpload = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: any = await UploadService.uploadImage(req, res);
        return response;
    } catch (error) {
        Logger.error(`Image upload error: ${error.message}`);
        return ApiResponse.InternalServerError(
            res,
            "Server Error: Something went wrong"
        );
    }
};

export default imageUpload;
