/* eslint-disable @typescript-eslint/no-explicit-any */
import { Op } from "sequelize";
import { Follow } from "../models";
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

    async update(payload: any, id): Promise<any> {
        return await Post.update(payload, {
            where: { id }
        });
    }

    async firstParty(id) {
        return await Post.findAll({ where: { userId: id } });
    }

    /* async findByEmail(email: string): Promise<object> {
    return await Follow.findOne({
      where: { email }
    });
  }
  async findByPhone(email: string): Promise<object> {
    return await Follow.findOne({
      where: { email }
    });
  }

  async findAllFollowings(myId): Promise<{ rows: object[]; count: number }> {
    return await Follow.findAndCountAll({ where: { userId: myId } });
  }

  async findAllFollowers(myId): Promise<{ rows: object[]; count: number }> {
    return await Follow.findAndCountAll({ where: { FollowingId: myId } });
  }
  async findExistingFollow(userId, FollowingId): Promise<object> {
    return await Follow.findOne({
      where: { [Op.and]: [{ userId }, { FollowingId }] }
    });
  } */

    async remove(payload: any): Promise<number> {
        const { postId } = payload;
        return await Follow.destroy({
            where: { id: postId }
        });
    }

    async edit(payload: any, id): Promise<any> {
        return await Follow.update(payload, {
            where: { id }
        });
    }
}

export default new PostRepo();
