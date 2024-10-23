/* eslint-disable @typescript-eslint/no-explicit-any */
import { Op } from "sequelize";
import { followRship } from "../models";
import { Logger } from "../libs";

// Note: Only the model actions go here. Other logics do not come here

class FollowRepo {
  async create(payload): Promise<object> {
    return await followRship.create(payload);
  }

  async findOne(id: string): Promise<object> {
    return await followRship.findByPk(id, {
      attributes: { exclude: ["password"] }
    });
  }
  async findByUsername(username: string): Promise<object> {
    return await followRship.findOne({
      where: { username },
      attributes: {
        exclude: ["password"]
      }
    });
  }

  async findByEmail(email: string): Promise<object> {
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
  }

  async remove(payload: any): Promise<number> {
    const { followingId, userId } = payload;
    return await followRship.destroy({
      where: { [Op.and]: [{ followingId }, { userId }] }
    });
  }
}

export default new FollowRepo();
