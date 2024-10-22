/* eslint-disable @typescript-eslint/no-explicit-any */
import { FollowRepo, UserRepo } from "../repositories";
import { Tools } from "../utils";

import { Response } from "express";
import { ApiResponse, Logger } from "../libs";
import { followRship } from "../models/index";

class UserService {
  async register(payload: any, res: Response): Promise<object> {
    const { username, email } = payload;
    const existingEmail = await UserRepo.findByEmail(email);
    if (existingEmail)
      return ApiResponse.AuthorizationError(res, "Email is already taken");
    const user = await UserRepo.findByUsername(username);
    if (user)
      return ApiResponse.AuthorizationError(res, "Username already exists");

    const newUser = await UserRepo.create(payload);

    return {
      message: "You've successfully registered",
      details: newUser
    };
  }

  async login(payload: any, res: Response): Promise<object> {
    const { email, password } = payload;
    const user: any = await UserRepo.findByEmail(email);

    if (user === null)
      return ApiResponse.NotFoundError(res, "User does not exist");

    const validPassword = await Tools.comparePassword(password, user.password);

    if (!validPassword) {
      return ApiResponse.AuthorizationError(res, "Password is not correct");
    }

    const token = Tools.generateToken(user.id, "1hr");

    return {
      message: "You've successfully logged in",
      token,
      details: user
    };
  }

  /* async follow(payload: any, res: Response): Promise<object> {
    
    pay
    await FollowRepo.create()


    const user = await UserRepo.findByUsername(username);
    if (user)
      return ApiResponse.AuthorizationError(res, "Username already exists");

    const newUser = await UserRepo.create(payload);

    return {
      message: "You're now following ",
      details: newUser
    };
  } */

  async updateUser(id: string, payload: any, res: Response): Promise<object> {
    const user = await UserRepo.findOne(id);
    if (user === null)
      return ApiResponse.NotFoundError(res, "User does not exist");

    const updatedUser = await UserRepo.update(id, payload);

    return {
      message: "User updated successfully!",
      details: updatedUser
    };
  }

  async findUser(id: string, res: Response): Promise<object> {
    const user = await UserRepo.findOne(id);
    if (user === null) {
      return ApiResponse.NotFoundError(res, "User does not exist");
    }

    return {
      message: "Successfully retrieved user",
      details: user
    };
  }

  async findAllUsers(query?: {
    offset: number;
    limit: number;
  }): Promise<object> {
    const users = await UserRepo.findAll(query);

    return {
      message: "Successfully retrieved all users",
      details: users
    };
  }

  async deleteUser(id: string, res: Response): Promise<object> {
    const user = await UserRepo.findOne(id);
    if (!user || user === null)
      return ApiResponse.NotFoundError(res, "User does not exist");

    await UserRepo.remove(id);
    return {
      message: "Successfully deleted user",
      details: user
    };
  }
}

export default new UserService();
