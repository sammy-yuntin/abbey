/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContactRepo, UserRepo } from "../repositories";

import { Response } from "express";
import { ApiResponse } from "../libs";

class ContactService {
    async add(payload: any, res: Response): Promise<object> {
        const { phone } = payload;

        const existingContact = await ContactRepo.findByPhone(phone);
        if (existingContact)
            return ApiResponse.AuthorizationError(res, "contact is already existing");

        payload.userId = res.locals.user.id;

        const isUser = await UserRepo.findByPhone(phone);
        if (isUser) payload.isUser = true;

        const newContact = await ContactRepo.add(payload);

        return ApiResponse.Success(
            res,
            {
                message: "Successfully Saved",
                details: newContact
            },
            201
        );
    }

    async updateContact(
        id: string,
        payload: any,
        res: Response
    ): Promise<object> {
        const contact = await ContactRepo.view(id);
        if (contact === null)
            return ApiResponse.NotFoundError(res, "Contact does not exist");

        const updatedContact = await UserRepo.update(id, payload);

        return ApiResponse.Success(
            res,
            {
                message: "Contact updated successfully!",
                details: updatedContact
            },
            201
        );
    }

    async findMyContacts(
        res,
        query?: {
      offset: number;
      limit: number;
    }
    ): Promise<object> {
        const contacts = await ContactRepo.findContacts(query);

        return ApiResponse.Success(res, {
            message: "Successfully retrieved all contacts",
            details: contacts
        });
    }

    async deleteContact(id: string, res: Response): Promise<object> {
        const user = await UserRepo.findOne(id);
        if (!user || user === null)
            return ApiResponse.NotFoundError(res, "User does not exist");

        await UserRepo.remove(id);
        return {
            message: "Successfully deleted user",
            details: user
        };
    }

    async view(id: string, res: Response): Promise<any> {
        const contact = await ContactRepo.view(id);

        return ApiResponse.Success(res, {
            message: "Deails successfully fetched",
            details: contact
        });
    }
}

export default new ContactService();
