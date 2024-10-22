import { ApiResponse, Logger } from "../../libs/index";
import { ContactService } from "../../services/index";

const contacts = async (id, res) => {
  try {
    const detail = await ContactService.findAllContacts();
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
