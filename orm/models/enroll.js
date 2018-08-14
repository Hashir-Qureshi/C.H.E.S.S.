/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('enroll', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		course_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'course',
				key: 'id'
			}
		},
		student_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'student',
				key: 'id'
			}
		},
		enrollment_date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
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
		tableName: 'enroll',
		paranoid: true
	});
};
