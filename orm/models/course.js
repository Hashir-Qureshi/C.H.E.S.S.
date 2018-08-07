/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('course', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		course_name: {
			type: DataTypes.STRING(150),
			allowNull: false
		},
		section_num: {
			type: DataTypes.STRING(25),
			allowNull: false
		},
		semester: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '1'
		},
		year: {
			type: "YEAR(4)",
			allowNull: false
		},
		teacher_id: {
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
		tableName: 'course',
		paranoid: true
	});
};
