import express from 'express';

import Clients from '../models/Clients'

import Utilities from "../helpers/Utilities";


const router = express.Router();


router.put('/busy-room', async (req, res, next) => {
	try {
		const {aportament_id, start_day, end_day} = req.body;
		const isBusy = await Clients.busy(aportament_id, start_day, end_day);
		if (isBusy) {
			res.status(401);
			return res.json({
				status: 'error',
				message: `This room will be free ${end_day}`
			})
		}
		// const bous = await Clients.beforeFind('client',fn());
		const dates = Utilities.dateArray(start_day, end_day);
		const queries = [];
		dates.forEach((day) => {
			queries.push(Clients.create({
				start_day: day, end_day: day, aportament_id, status: 'pending',
			}));
		});
		await Promise.all(queries)

		res.json({
			status: 'Ok', dates
		})

	} catch (e) {
		next(e)
	}
});

module.exports = router;
