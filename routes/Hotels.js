import express from 'express';
import Hotels from "../models/Hotels";


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
router.get('/search-hotel', async (req, res, next) => {
	try {
		const {name} = req.body;
		let searchHotel;
		searchHotel = await Hotels.findAll({where: {name: name}});
		if (!searchHotel) {
			res.json({
				status: 'Error',
				message: 'Hotel does not exist'
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
