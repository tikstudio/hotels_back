import Sequelize, {Model} from "sequelize";
import sequelize from "../helpers/sequelize";

class Bels extends Model{

}

Bels.init({
	id: {
		type: Sequelize.BIGINT.UNSIGNED,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	path:{
		type:Sequelize.STRING,
		allowNull:false,
		validate:{
			isUrl:{
				msg: 'The given URL is incorrect, pleas check it'
			}
		}
	}
},{
	sequelize,
	modelName:'bels',
	timestamps:false
});

Bels.sync();

export default Bels
