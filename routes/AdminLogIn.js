import express from 'express';
import Admin from "../models/Admin";

const router = express.Router();
router.post('/admin-sing-up', async (req, res, next) => {
	try {
		const {name, l_name, email, password, r_password} = req.body;

		let admin;
		if (!r_password === password) {
			res.json({
				status: 'error'
			})
		}
		admin = Admin.create({
			name, l_name, email, password: Admin.passHash(password)
		})
		res.json({
			status: 'Ok',
			admin
		})
	} catch (e) {
		next(e)
	}
});
router.post('/admin-sing-in', async (req, res, next) => {
	try {
		const {email, password} = req.body;
		const admin = await Admin.findOne({
			where: {email, password: Admin.passHash(password)}
		});

		if (!admin) {
			res.json({
				status: 'Error',
				message: 'Invalid email or password'
			})
		}
		res.json({
			status: 'Ok',
			admin
		})
	} catch (e) {
		next(e)
	}
});

router.post('/admin-update-data', async (req, res, next) => {
	try {
		const {name, l_name, email, password} = req.body;
		const admin = await Admin.update({
			name, l_name, email, password
		}, {where: {email: email}});

		res.json({
			status: 'Ok',
			admin
		})
	} catch (e) {
		next(e)
	}
})


module.exports = router;
