import { Op } from "sequelize";
import PostInterest from "../models/postInterest";

class PostInterestRepo {
    async create(payload): Promise<object> {
        return await PostInterest.create(payload);
    }

    async findOne(postId: string, res): Promise<object> {
        return await PostInterest.findOne({
            where: {
                [Op.and]: [{ userId: res.locals.user.id }, { postId }]
            }
        });
    }

    async findMyAll(res) {
        return await PostInterest.findAll({
            where: { userId: res.locals.user.id }
        });
    }

    async findAll(postId: string): Promise<object> {
        return await PostInterest.findAll({
            where: { postId }
        });
    }

    async update(id: string, payload: object) {
        return await PostInterest.update(payload, { where: { id } });
    }
}
export default new PostInterestRepo();
