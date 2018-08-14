/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('answer', {
		answer_num: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		question_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'question',
				key: 'id'
			}
		},
		correct: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		},
		answer: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		created_by: {
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
		tableName: 'answer',
		paranoid: true
	});
};
