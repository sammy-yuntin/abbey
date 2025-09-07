import { DataTypes, UUIDV4 } from "sequelize";
import db from "../datasources/db";
import bcrypt from "bcryptjs";
import { UserModel, UserPayload } from "../interfaces";

const User = db.define<UserModel, UserPayload>(
    "user",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "username"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "email"
        },
        image: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        creditBalance: {
            type: DataTypes.INTEGER,
            defaultValue: 120,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            unique: "phone"
        }
    },
    {
        timestamps: true
    }
);

// Hash password before registration
User.beforeCreate(async (user) => {
    try {
        const hash = await bcrypt.hash(user.password, 12);
        user.password = hash;
    } catch (err) {
        throw new Error(err.message);
    }
});

export default User;
