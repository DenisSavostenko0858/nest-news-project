import sequelize from '../database';
import { DataTypes } from 'sequelize';

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'user' },
});

const News = sequelize.define('news', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    published: { type: DataTypes.DATE, allowNull: false }, 
    authorId: {  
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});


User.hasMany(
    News, { 
        foreignKey: 'authorId' 
});

News.belongsTo(
    User, { 
        foreignKey: 'authorId', 
        as: 'author' 
});

export {
    User,
    News,
};