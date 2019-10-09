import express from 'express';

var os = require('os');
import Utilities from "../helpers/Utilities";
import Hotels from "../models/Hotels";
import Aportaments from "../models/Aportaments";
import Servis from "../models/Servis";
import Bels from "../models/Bels";


const router = express.Router();


router.post('/add-hotel', async (req, res, next) => {
	try {
		const {name, lat, lng, description, phone, info, images, star} = req.body;
		const hotelExist = await Hotels.findOne({where: {name}});
		if (hotelExist) {
			res.json({
				status: 'Error',
				message: error.message +
					'This hotel name already exists,please write another hotel name'
			});
			return
		}
		let hotel;
		try {
			hotel = await Hotels.create({
				name, lat, lng, description, phone, info, images, star
			})

		} catch (e) {
			res.status(401);
			res.json({
				status: 'error',
				errors: Utilities.normalizeSeqErrors(e, 122),
			})
		}
		res.json({
			status: 'Ok',
			hotel
		})
	} catch (e) {
		next(e)
	}
});

router.put('/update-hotel', async (req, res, next) => {
	try {
		const {name, lat, lng, description, phone, info, images, star} = req.body;
		let hotel;
		hotel = await Hotels.update(
			{name, lat, lng, description, phone, info, images, star},
			{where: {name: name}});
		res.json({
			status: 'Ok',
			hotel
		})
	} catch (e) {
		next(e)
	}
});

router.delete('/delete-hotel', async (res, req, next) => {
	try {
		const {name} = req.body;
		let d_hotel;
		d_hotel = await Hotels.destroy({
			where: {name: name}
		})
		res.json({
			status: "Ok",
			message: 'Hotel deleted'
		})
	} catch (e) {
		next(e)
	}
})
router.post('/add-apartments', async (req, res, next) => {
	try {
		const {
			number, name, images, beds, price, description,
			services, hotel_id, l_beds, sole_price,
		} = req.body;
		const hotelExist = await Aportaments.findOne({where: {number}});

		if (hotelExist) {
			res.code(401);
			res.json({
				status: 'Error',
				message: error.message +
					'This room number already exists,please write another room number'
			});
			return
		}


		const rooms = await Aportaments.create({
			number, name, images, beds, price, description,
			services, hotel_id, l_beds, sole_price,
		});

		res.json({
			status: 'Ok',
			rooms
		})
	} catch (e) {
		next(e)
	}
});

router.put('/update-room', async (req, res, next) => {
	try {
		const {
			number, name, images, beds, price, description,
			services, hotel_id, l_beds, sole_price,
		} = req.body;
		let rooms;
		rooms = await Aportaments.update(
			{
				number, name, images, beds, price, description,
				services, hotel_id, l_beds, sole_price,
			},
			{where: {name: number}});
		res.json({
			status: 'Ok',
			rooms
		})
	} catch (e) {
		next(e)
	}
});

router.post('/add-service', async (req, res, next) => {
	try {
		const {name} = req.body;
		const service = await Servis.create({name});
		res.json({
			status: "Ok",
			service
		})
	} catch (e) {
		next(e)
	}
});
router.post('/update-service', async (req, res, next) => {
	try {
		const {name} = req.body;
		const service = await Servis.update({
			name
		}, {where: {name}});
		res.json({
			status: "Ok",
			service
		})
	} catch (e) {
		next(e)
	}
});
router.delete('/delete-service', async (req, res, next) => {
	try {
		const service = await Servis.destroy({
			where: {name}
		});
		res.json({
			status: "Ok",
			service
		})
	} catch (e) {
		next(e)
	}
});

router.put('/add-photto', async (req, res, next) => {
	try {
		const {path} = req.body;
		const photto = Bels.create({
			path
		});
		res.json({
			status: 'Ok',
			photto
		})
	} catch (e) {
		next(e)
	}
});
router.post('/update-photto', async (req, res, next) => {
	try {
		const {path} = req.body;
		const photto = Bels.update({
			path
		}, {where: {id}});
		res.json({
			status: 'Ok',
			photto
		})
	} catch (e) {

	}
});
router.delete('/delete-photto', async (req, res, next) => {
	try {
		const photto = Bels.destroy({
			where: {id}
		});
		res.json({
			status: 'Ok',
			photto
		})
	} catch (e) {

	}
});

module.exports = router;
