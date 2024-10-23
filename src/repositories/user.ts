/* eslint-disable @typescript-eslint/no-explicit-any */
import { followRship, User } from "../models";
import Post from "../models/post";

// Note: Only the model actions go here. Other logics do not come here

class UserRepo {
  async create(payload): Promise<object> {
    return await User.create(payload);
  }

  async update(id: string, payload: any): Promise<object> {
    return await User.update(payload, {
      where: { id }
    });
  }

  async findOne(id: string) {
    return await User.findByPk(id, { include: [Post, followRship] });
  }

  async findByUsername(username: string): Promise<object> {
    return await User.findOne({
      where: { username },
      attributes: {
        exclude: ["password"]
      }
    });
  }

  async findByEmail(email: string): Promise<object> {
    return await User.findOne({
      where: { email }
    });
  }
  async findByPhone(email: string): Promise<object> {
    return await User.findOne({
      where: { email }
    });
  }

  async findAll(): Promise<{ rows: object[]; count: number }> {
    return await User.findAndCountAll();
  }

  async remove(id: string): Promise<number> {
    return await User.destroy({
      where: { id }
    });
  }
}

export default new UserRepo();
