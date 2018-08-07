/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('topic', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		topic: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		created_by: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'teacher',
				key: 'id'
			}
		},
		createdAt: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		deletedAt: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		updatedAt: {
			type: DataTypes.DATEONLY,
			allowNull: true
		}
	}, {
		tableName: 'topic',
		paranoid: true
	});
};
