import Sequelize, {Model} from "sequelize";
import sequelize from "../helpers/sequelize";
import {JWT_HASH} from "../config";

class Admin extends Model {
	static passHash(pass) {
		return md5(md5(pass + JWT_HASH));
	}
}

Admin.init({
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
				msg: 'Invalid Name'
			}
		}

	},
	f_name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isAlpha: {
				msg: "Invalid First Name"
			}
		}
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: {
				msg: 'Invalid Email'
			}
		}
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: {
				args: 8
			}
		}
	}
}, {
	sequelize,
	modelName: 'admin',
	timestamps: false
})

Admin.sync();

export default Admin
