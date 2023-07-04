const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define("posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    posts.associate = (models) => {
        posts.hasMany(models.Comments, {
            onDelete: "cascade",
        });
    };

    return posts;
}