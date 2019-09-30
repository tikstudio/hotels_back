import express from 'express';

import Utilities from "../helpers/Utilities";
import Hotels from "../models/Hotels";
import Aportament from "../models/Aportament";


const router = express.Router();


router.post('/add-hotel', async (req, res, next) => {
	try {
		const {name, lat, lng, description, phone, info, img, star} = req.body;
		const hotelExist = await Hotels.findOne({where: {name}});
		if (hotelExist) {
			res.json({
				status: 'Error',
				message: error.message +
					'This hotel name already exists,please write another hotel name'
			})
			return
		}
		let hotel;
		try {
			hotel = await Hotels.create({
				name, lat, lng, description, phone, info, img, star
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

router.post('/update-hotel', async (req, res, next) => {
	try {
		const {name, lat, lng, description, phone, info, img, star} = req.body;
		let hotel;
		hotel = await Hotels.update(
			{name, lat, lng, description, phone, info, img, star},
			{where: {name: name}});
		res.json({
			status: 'Ok',
			hotel
		})
	} catch (e) {
		next(e)
	}
});

router.post('delete-hotel', async (res, req, next) => {
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
			number, name, images, beds, price, description, services, l_beds, sole_price, hotel_id
		} = req.body;
		const hotelExist = await Aportament.findOne({where: {number}});
		if (hotelExist) {
			res.code(401)
			res.json({
				status: 'Error',
				message: error.message +
					'This room number already exists,please write another room number'
			})
			return
		}

		let rooms = await Aportament.create({
			number, name, images, beds, status, price, description, services, l_beds, sole_price,
			hotel_id
		})

		res.json({
			status: 'Ok',
			rooms
		})
	} catch (e) {
		next(e)
	}
});

router.post('/update_room', async (req, res, next) => {
	try {
		const {
			number, name, images, beds, price, description, services, l_beds, sole_price
		} = req.body;
		let rooms;
		rooms = await Aportament.update(
			{
				number, name, images, beds, price, description, services, l_beds, sole_price
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
module.exports = router;
