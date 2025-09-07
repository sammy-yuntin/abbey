/* eslint-disable @typescript-eslint/no-explicit-any */
import { Op } from "sequelize";
import { ApiResponse } from "../libs/index";
import PostInterest from "../models/postInterest";
import { PostInterestRepo, PostRepo } from "../repositories/index";
import { Response } from "express";

class PostService {
    async post(payload: any, res: Response): Promise<object> {
        payload.userId = res.locals.user.id;

        const post = await PostRepo.create(payload);

        return ApiResponse.Success(
            res,
            {
                message: "posted successfully",
                details: post
            },
            201
        );
    }
    async edit(payload: any, id, res: Response): Promise<object> {
        const post = await PostRepo.edit(payload, id);

        return ApiResponse.Success(
            res,
            {
                message: "post edited successfully",
                details: post
            },
            201
        );
    }
    async toggleLike(req, res: Response): Promise<object> {
        const { postid } = req.params;
        const payload = req.body;
        const userId = res.locals.user.id;

        const foundPost = await PostRepo.findOne(postid);
        if (!foundPost)
            return ApiResponse.NotFoundError(res, "Post No Longer Exists");

        let interest: any = await PostInterest.findOne({
            where: {
                [Op.and]: [{ postId: postid }, { userId }]
            }
        });

        if (!interest) {
            interest = await PostInterestRepo.create({ postId: postid, userId });
        }

        await PostInterestRepo.update(interest.id, req.body);

        const postData: any = await PostRepo.findOne(postid);
        await PostRepo.update(
            payload.like
                ? { likes: postData.likes + 1 }
                : { likes: postData.likes - 1 },
            postid
        );

        return ApiResponse.Success(
            res,
            {
                message: payload.like == true ? "Post Liked" : "Post Unliked"
            },
            201
        );
    }

    async delete(postId, res: Response): Promise<object> {
        const post: any = await PostRepo.findOne(postId);

        await PostRepo.remove(postId);

        return ApiResponse.Success(
            res,
            {
                message: "Post deleted Successfully",
                details: post
            },
            200
        );
    }

    async allPosts(id: string, res: Response) {
        const posts = await PostRepo.findAll(id);

        return ApiResponse.Success(res, {
            message: "all posts fetched",
            details: posts
        });
    }
}
export default new PostService();
