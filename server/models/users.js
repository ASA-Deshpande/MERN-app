const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // users.associate = (models) => {
    //     users.hasMany(models.posts, {
    //         onDelete: "cascade",
    //     });
    // };

    return users;
}