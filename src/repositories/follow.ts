/* eslint-disable @typescript-eslint/no-explicit-any */
import { Op } from "sequelize";
import { Follow } from "../models";

// Note: Only the model actions go here. Other logics do not come here

class FollowRepo {
    async create(payload): Promise<object> {
        return await Follow.create(payload);
    }

    async findOne(id: string): Promise<object> {
        return await Follow.findByPk(id, {
            attributes: { exclude: ["password"] }
        });
    }

    async findByUsername(username: string): Promise<object> {
        return await Follow.findOne({
            where: { username },
            attributes: {
                exclude: ["password"]
            }
        });
    }

    async findByEmail(email: string): Promise<object> {
        return await Follow.findOne({
            where: { email }
        });
    }

    async findByPhone(email: string): Promise<object> {
        return await Follow.findOne({
            where: { email }
        });
    }

    async findAllFollowings(
        firstPartyId
    ): Promise<{ rows: object[]; count: number }> {
        return await Follow.findAndCountAll({
            where: { userId: firstPartyId }
        });
    }

    async findAllFollowers(myId): Promise<{ rows: object[]; count: number }> {
        return await Follow.findAndCountAll({ where: { secondPartyId: myId } });
    }

    async findExistingFollow(userId, secondPartyId): Promise<object> {
        return await Follow.findOne({
            where: { [Op.and]: [{ userId }, { secondPartyId }] }
        });
    }

    async remove(payload: any): Promise<number> {
        const { followingId, userId } = payload;
        return await Follow.destroy({
            where: { [Op.and]: [{ secondPartyId: followingId }, { userId }] }
        });
    }
}

export default new FollowRepo();
