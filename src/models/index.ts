import User from "./user";
import FollowRship from "./following";

export { default as Contact } from "./contact";

export { default as User } from "./user";
export { default as followRship } from "./following";

//Relationship
User.hasMany(FollowRship, { onDelete: "CASCADE", onUpdate: "CASCADE" });
