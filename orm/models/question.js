/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('question', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		question_num: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		part_num: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		question: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		hint: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		points: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		topic_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'topic',
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
		tableName: 'question',
		paranoid: true
	});
};
