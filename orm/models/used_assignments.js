/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('used_assignments', {
		assignment_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'assignment',
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
		start_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		end_date: {
			type: DataTypes.DATE,
			allowNull: false
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
		tableName: 'used_assignments',
		paranoid: true
	});
};
