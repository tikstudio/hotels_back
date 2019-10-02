import Sequelize, {Model} from "sequelize";
import sequelize from "../helpers/sequelize";

class Hotels extends Model {

}
Hotels.init({
	id: {
		type: Sequelize.BIGINT.UNSIGNED,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isAlpha: {
				msg: "Invalid Middle Name"
			}
		}
	},
	lat: {
		type: Sequelize.DECIMAL(10, 7),
		allowNull: false,
	},
	lng: {
		type: Sequelize.DECIMAL(11, 8),
		allowNull: false,
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
	phone:{
		type: Sequelize.STRING,
		allowNull: false,
		validate:{
			isNumeric:{
				msg:'invalide Phone'
			}
		}
	},
	info:{
		type: Sequelize.STRING,
		allowNull:true,
		validate:{
			isAlpha: {
				msg: "Invalid  Decription"
			}
		}
	},
	images:{
		type:Sequelize.STRING,
		allowNull:true,
		validate:{
			isUrl:{
				msg:'Invalid Url'
			}
		}
	},
	star:{
		type:Sequelize.STRING,
		allowNull:false
	}
},{
	sequelize,
	modelName: 'hotel',
	timestamps: false,
});


Hotels.sync();

export default Hotels
