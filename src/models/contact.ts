import dbClient from "@datasources/db";
import { DataTypes, UUIDV4 } from "sequelize";

const Contact = dbClient.define(
  "contact",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  { timestamps: true }
);

export default Contact;
