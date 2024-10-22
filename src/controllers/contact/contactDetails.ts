import { ApiResponse, Logger } from "../../libs/index";
import { ContactService } from "../../services/index";

const contact = async (req, res) => {
  const { id } = req.params;
  try {
    const detail = await ContactService.view(id, res);
    return detail;
  } catch (error) {
    Logger.error(error.message);
    return ApiResponse.InternalServerError(
      res,
      "Server Error: Something went wrong"
    );
  }
};
export default contact;
