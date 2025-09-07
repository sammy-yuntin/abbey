import { DataTypes, UUIDV4 } from "sequelize";
import dbClient from "../datasources/db";

const PostInterest = dbClient.define(
    "PostInterest",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        like: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    { timestamps: true }
);
export default PostInterest;
