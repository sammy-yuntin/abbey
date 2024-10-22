/* eslint-disable @typescript-eslint/no-explicit-any */
import { Op } from "sequelize";
import { followRship } from "../models";
import Post from "../models/post";

// Note: Only the model actions go here. Other logics do not come here

class PostRepo {
  async create(payload): Promise<object> {
    return await Post.create(payload);
  }

  async findOne(id: string): Promise<object> {
    return await Post.findByPk(id, {
      attributes: { exclude: ["password"] }
    });
  }
  async findByKeyword(keyword: string): Promise<object> {
    return await Post.findAll({
      where: { text: { [Op.like]: `%${keyword}%` } }
    });
  }
  async findAll(id: string): Promise<object> {
    return await Post.findAll({
      where: { userId: id }
    });
  }

  /* async findByEmail(email: string): Promise<object> {
    return await followRship.findOne({
      where: { email }
    });
  }
  async findByPhone(email: string): Promise<object> {
    return await followRship.findOne({
      where: { email }
    });
  }

  async findAllFollowings(myId): Promise<{ rows: object[]; count: number }> {
    return await followRship.findAndCountAll({ where: { userId: myId } });
  }

  async findAllFollowers(myId): Promise<{ rows: object[]; count: number }> {
    return await followRship.findAndCountAll({ where: { followingId: myId } });
  }
  async findExistingFollow(userId, followingId): Promise<object> {
    return await followRship.findOne({
      where: { [Op.and]: [{ userId }, { followingId }] }
    });
  } */

  async remove(payload: any): Promise<number> {
    const { postId } = payload;
    return await followRship.destroy({
      where: { id: postId }
    });
  }

  async edit(payload: any, id): Promise<any> {
    return await followRship.update(payload, {
      where: { id }
    });
  }
}

export default new PostRepo();
