import Sequelize, {Model} from "sequelize";
import sequelize from "../helpers/sequelize";
import Utilities from "../helpers/Utilities";

class Clients extends Model {
	static async busy(id, from, to) {
		const daysArt = Utilities.dateArray(from, to);
		const bous = await Clients.findOne({
			where: {
				start_day: {$in: daysArt},
				aportament_id: id,
			}
		});
		return !!bous
	}
}

Clients.init({
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
		validate:{
			isCreditCard:{
				msg:'invalid credit cart'
			}
		}
	},
	start_day: {
		type: Sequelize.DATEONLY,
		allowNull: false,
	},
	end_day: {
		type: Sequelize.DATEONLY,
		allowNull: false
	},

}, {
	sequelize,
	modelName: 'clients',
	timestamps: false,
});

Clients.sync();

export default Clients;
