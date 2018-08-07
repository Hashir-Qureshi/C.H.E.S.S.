/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('used_topics', {
		topic_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'topic',
				key: 'id'
			}
		},
		course_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'course',
				key: 'id'
			}
		},
		created_by: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'teacher',
				key: 'id'
			}
		},
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
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
		tableName: 'used_topics',
		paranoid: true
	});
};
