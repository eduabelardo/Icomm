const {Router} = require('express');
const router = Router();
const axios = require('axios');

const getPositiveCases = async (req, res, next) => {
	const {year, month} = req.params;
	try {
		let data = [];
		var response = await axios.get(
			`https://api.covidtracking.com/v1/us/daily.json`
		);
		data = response.data;

		let results = data.filter(
			(e) =>
				e.date.toString().charAt(0) == year.toString().charAt(0) &&
				e.date.toString().charAt(1) == year.toString().charAt(1) &&
				e.date.toString().charAt(2) == year.toString().charAt(2) &&
				e.date.toString().charAt(3) == year.toString().charAt(3) &&
				e.date.toString().charAt(4) == month.toString().charAt(0) &&
				e.date.toString().charAt(5) == month.toString().charAt(1)
		);

		res.json(results);
	} catch (error) {
		console.log(error);
	}
};
const getPositiveIncrease = async (req, res, next) => {
	try {
		let data = [];
		var response = await axios.get(
			`https://api.covidtracking.com/v1/us/daily.json`
		);
		data = response.data;

		let results = data.filter(
			(e) => e.positiveIncrease > e.negativeIncrease * 0.3
		);

		res.json(results);
	} catch (error) {
		console.log(error);
	}
};
router.get(`/positiveIncrease`, getPositiveIncrease);
router.get(`/positives/:year/:month`, getPositiveCases);

module.exports = router;
