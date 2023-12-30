const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const News = sequelize.define('News', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      unsigned: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      collate: 'utf8mb4_unicode_ci',
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      collate: 'utf8mb4_unicode_ci',
    },
    cover_photo_path: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'images/covers/placeholder.png',
      collate: 'utf8mb4_unicode_ci',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
    tableName: 'news',
  });

  return News;
};
