import dbClient from "../datasources/db";
import { DataTypes, UUIDV4 } from "sequelize";

const Post = dbClient.define(
    "post",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        image: {
            type: DataTypes.STRING
        },
        text: {
            type: DataTypes.STRING
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },

    {
        timestamps: true
    }
);
export default Post;
