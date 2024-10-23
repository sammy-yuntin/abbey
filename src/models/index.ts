import User from "./user";
import FollowRship from "./following";
import Post from "./post";

export { default as Contact } from "./contact";

export { default as User } from "./user";
export { default as followRship } from "./following";

//Relationship
User.hasMany(FollowRship, { onDelete: "CASCADE", onUpdate: "CASCADE" });

User.hasMany(Post, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Post.belongsTo(User);
