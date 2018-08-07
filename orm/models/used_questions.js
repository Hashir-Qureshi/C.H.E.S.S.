/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('used_questions', {
		question_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'question',
				key: 'id'
			}
		},
		assignment_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'assignments_taken',
				key: 'assignment_id'
			}
		},
		created_by: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'assignments_taken',
				key: 'student_id'
			}
		},
		points_earned: {
			type: DataTypes.INTEGER(11),
			allowNull: true
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
		tableName: 'used_questions',
		paranoid: true
	});
};
