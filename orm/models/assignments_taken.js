/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('assignments_taken', {
		assignment_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		student_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		grade: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		date_started: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		date_completed: {
			type: DataTypes.DATE,
			allowNull: true
		},
		days_late: {
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
		tableName: 'assignments_taken',
		paranoid: true
	});
};
