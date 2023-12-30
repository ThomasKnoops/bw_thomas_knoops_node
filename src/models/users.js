const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      unsigned: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        is: /^[a-zA-Z\s]+$/,
      },
      collate: 'utf8mb4_unicode_ci',
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid email format',
        },
      },
      collate: 'utf8mb4_unicode_ci',
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Invalid date format',
        },
      },
    },
    profile_photo_path: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'images/avatars/default.png',
      collate: 'utf8mb4_unicode_ci',
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'Im new here!',
      collate: 'utf8mb4_unicode_ci',
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      collate: 'utf8mb4_unicode_ci',
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isBoolean: {
          msg: 'Invalid boolean format',
        },
      }
    },
    remember_token: {
      type: DataTypes.STRING(100),
      allowNull: true,
      collate: 'utf8mb4_unicode_ci',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'users',
  });

  return User;
};
