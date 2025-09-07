import { ApiResponse, Logger } from "../../libs/index";
import { ContactService } from "../../services/index";

const contacts = async (req, res) => {
    try {
        const { limit, offset } = req.query;
        const attributes = {
            exclude: ["updatedAt", "createdAt", "password"]
        };
        const query = {
            where: { userId: res.locals.user.id },
            limit: limit ? Number(limit) : 100,
            offset: offset ? Number(offset) : 0,
            attributes,
            order: [["id", "DESC"]], // sort data in descending order using id
            separate: true // sorting will not work if this is missing
        }; // get actual skip and limit from query params

        const detail = await ContactService.findMyContacts(res, query);
        return detail;
    } catch (error) {
        Logger.error(error.message);
        return ApiResponse.InternalServerError(
            res,
            "Server Error, Something went wrong"
        );
    }
};
export default contacts;
