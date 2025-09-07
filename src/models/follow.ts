import { DataTypes, UUIDV4 } from "sequelize";
import dbClient from "../datasources/db";

const Follow = dbClient.define(
    "follow",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        secondPartyId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { timestamps: true }
);
export default Follow;
