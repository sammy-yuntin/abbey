import User from "./user";
import Follow from "./follow";
import Post from "./post";
import PostInterest from "./postInterest";
import Contact from "./contact";

//Relationship
User.hasMany(Follow, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Follow.belongsTo(User);

User.hasMany(Post, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Post.belongsTo(User);

User.hasMany(Contact);
Contact.belongsTo(User, { onDelete: "CASCADE", onUpdate: "CASCADE" });

User.belongsToMany(Post, { through: PostInterest });
Post.belongsToMany(User, { through: PostInterest });

export { default as Contact } from "./contact";

export { default as User } from "./user";
export { default as Follow } from "./follow";
