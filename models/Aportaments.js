import Sequelize, {Model} from "sequelize";
import sequelize from "../helpers/sequelize";
import Hotels from "./Hotels";

class Aportaments extends Model {

}

Aportaments.init({
	id: {
		type: Sequelize.BIGINT.UNSIGNED,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	number: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isNumeric: {
				msg: 'Invalid symbol pleas use the number'
			}
		}
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isAlpha: {
				msg: 'Invalid name pleas use the another'
			}
		},
	},
	images: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isUrl: {
				msg: 'The given URL is incorrect, pleas check it'
			}
		}
	},
	beds: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isNumeric: {
				msg: 'Invalid symbol pleas use the number'
			}
		}
	},
	price: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isNumeric: {
				msg: 'Invalid symbol pleas use the number'
			}
		}
	},
	description: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			isAlpha: {
				msg: 'Pleas use the apartment  description '
			}
		}
	},
	services: {
		type: Sequelize.JSON,
		allowNull: true
	},
	hotel_id: {
		type: Sequelize.BIGINT.UNSIGNED,
		allowNull: false
	},
	l_beds: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			isNumeric: {
				msg: 'Invalid symbol pleas use the number'
			}
		}
	},
	sole_price: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			isNumeric: {
				msg: 'Invalid symbol pleas use the number'
			}
		}
	}
}, {
	sequelize,
	modelName: 'aportaments',
	timestamps: false
});
Aportaments.belongsTo(Hotels, {
	foreignKey: 'hotel_id',
	onDelete: 'cascade',
	onUpdate: 'cascade'
});
Aportaments.sync();

export default Aportaments
