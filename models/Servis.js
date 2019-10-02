import Sequelize, {Model} from "sequelize";
import sequelize from "../helpers/sequelize";


class Servis extends Model{

}

Servis.init({
	id: {
		type: Sequelize.BIGINT.UNSIGNED,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	name:{
		type:Sequelize.STRING,
		allowNull:false
	}
},{
	sequelize,
	modelName: 'servis',
	timestamps: false,
});


Servis.sync();

export default Servis;
