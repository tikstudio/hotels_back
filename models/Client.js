import Sequelize, {Model} from "sequelize";
import sequelize from "../helpers/sequelize";

class Client extends Model {

}

Client.init({
	id: {
		type: Sequelize.BIGINT.UNSIGNED,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	aportament_id: {
		type: Sequelize.BIGINT.UNSIGNED,
		allowNull: false,
	},
	status: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	start_day: {
		type:Sequelize.DATE,
		allowNull:false,
	},
	end_day: {
		type:Sequelize.DATE,
		allowNull:false
	},
},{
	sequelize,
	modelName: 'client',
	timestamps: false,
});

Client.sync();

export default Client
