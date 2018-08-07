/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('assignment_structure', {
		assignment_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'assignment',
				key: 'id'
			}
		},
		topic_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'topic',
				key: 'id'
			}
		},
		points: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		hints: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
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
		tableName: 'assignment_structure',
		paranoid: true
	});
};
