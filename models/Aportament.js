import Sequelize, {Model} from "sequelize";
import sequelize from "../helpers/sequelize";
import Hotels from "./Hotels";

class Aportament extends Model {

}

Aportament.init({
	id: {
		type: Sequelize.BIGINT.UNSIGNED,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	number: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 10,
		validate: {
			isNumeric: {
				msg: 'Invalid Number'
			}
		}

	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isAlpha: {
				msg: "Invalid Middle Status"
			}
		}
	},
	images: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			isUrl: {
				msg: 'Invalid Url'
			}
		}
	},
	beds: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isAlpha: {
				msg: "Invalid Middle Status"
			}
		}
	},
	price: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: 10,
		validate: {
			isNumeric: {
				msg: 'Invalid Number'
			}
		}
	},


	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isAlpha: {
				msg: "Invalid Middle Decription"
			}
		}
	},

	services: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	l_beds:{
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isAlpha: {
				msg: "Invalid Middle Status"
			}
		}
	},
	sole_price:{
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: 10,
		validate: {
			isNumeric: {
				msg: 'Invalid Number'
			}
		}
	},
	hotel_id:{
		type: Sequelize.BIGINT.UNSIGNED,
		allowNull: false,
	}
}, {
	sequelize,
	modelName: 'aportoment',
	timestamps: false
});
Aportament.belongsTo(Hotels, {
	foreignKey: 'hotel_id',
	onDelete: 'cascade',
	onUpdate: 'cascade'
})
Aportament.sync();

export default Aportament
