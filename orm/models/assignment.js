/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('assignment', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		assignment_name: {
			type: DataTypes.STRING(150),
			allowNull: true
		},
		total_points: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		date_created: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		created_by: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
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
		tableName: 'assignment',
		paranoid: true
	});
};
