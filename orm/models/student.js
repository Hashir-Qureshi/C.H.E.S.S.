/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		school_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		institution_name: {
			type: DataTypes.STRING(150),
			allowNull: false
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
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			unique: true
		}
	}, {
		tableName: 'student',
		paranoid: true
	});
};
