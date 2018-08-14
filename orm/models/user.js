/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		first_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		last_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		password_hash: {
			type: DataTypes.STRING(500),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true
		},
		is_teacher: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		},
		is_db_administrator: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
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
		is_student: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'user',
		paranoid: true
	});
};
