import moment from "moment";

class Utilities {
	static normalizeSeqErrors(e) {
		const data = {};
		if (e.errors) {
			e.errors.forEach(err => {
				data[err.path] = err.message;
			});
		} else {
			return e;
		}
		// for (const err of e.errors){
		//   data[err.path] = err.message;
		// }
		return data;
	}

	static dateArray(start, end) {
		const dates = [];
		let startDate = moment(start, 'YYYY-MM-DD');
		dates.push(startDate.format('YYYY-MM-DD'));
		while (!startDate.isSame(end)) {
			startDate = startDate.add(1, 'days');
			dates.push(startDate.format('YYYY-MM-DD'));
		}
		return dates;
	}

	static getIp(req) {
		const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		if (ip === '::1' || ip === '::ffff:127.0.0.1') {
			return '37.186.124.177'
		}
		return ip
	}
}

export default Utilities;
