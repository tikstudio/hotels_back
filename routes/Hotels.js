import express from 'express';
import Hotels from "../models/Hotels";
import Aportaments from "../models/Aportaments";
import Clients from '../models/Clients';
import {fn, col} from 'sequelize';

import Utilities from "../helpers/Utilities";

import geoip from "geoip-lite";

const router = express.Router();
const LIMIT = 10;
router.get('/bring-out', async (req, res, next) => {
	try {
		const ip = Utilities.getIp(req);
		const {ll: [lat, lng]} = geoip.lookup(ip) || {ll: [0, 0]};
		const nearest = await Hotels.findNearestIds(lat, lng);
		const mPrice = await Aportaments.compare();
		const daysArt = Utilities.dateArray(new Date(), new Date());
		const exspRooms = await Aportaments.findAll({
			where: {
				hotel_id: {$in: nearest},
				mPrice
			},
			include: {
				model: Clients,
				where: {
					start_day: {$in: daysArt},
				}
			}
		});
		res.json({
			status: 'Ok',
			nearest: exspRooms,
		})
	} catch (e) {
		next(e)
	}
});

router.post('/search-room', async (req, res, next) => {
	try {
		const {price, services, start_day, end_day} = req.body;
		const page = parseInt(req.body.page) || 1;

		let searchHotel;
		const daysArt = Utilities.dateArray(start_day, end_day);

		searchHotel = await Aportaments.findAll({
			where: {
				price: {$lt: price},
				services: fn('JSON_CONTAINS', col('services'), `[${services}]`),
			}, include: [
				{
					model: Clients,
					where: {
						start_date: {$notIn: daysArt}
					}
				},
				{
					model: Hotels
				},

			],
			limit: LIMIT,
			offset: LIMIT * page - LIMIT
		});
		if (!searchHotel) {
			res.status(404);
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
