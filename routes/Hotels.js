import express from 'express';
import Hotels from "../models/Hotels";
import Aportaments from "../models/Aportaments";
import {fn, col} from 'sequelize';

const router = express.Router();

router.get('/bring-out', async (req, res, next) => {
	try {
		let hotels;
		hotels = await Hotels.findAll();
		res.json({
			status: 'Ok',
			hotels
		})
	} catch (e) {
		next(e)
	}
});
router.post('/search-room', async (req, res, next) => {
	try {
		const {price, services, start_day, end_day} = req.body;
		let searchHotel;
		searchHotel = await Aportaments.findAll({
			where: {
				price: {$lt: price},
				services: fn('JSON_CONTAINS', col('services'), `[${services}]`),
			}, include: {
				model: Client,
				where: {

				}
			}
		});
		if (!searchHotel) {
			res.json({
				status: 'Error',
				message: 'Room does not exist'
			});
			return
		}
		res.json({
			status: 'Ok',
			searchHotel
		})

	} catch (e) {
		next(e)
	}
});


module.exports = router;
