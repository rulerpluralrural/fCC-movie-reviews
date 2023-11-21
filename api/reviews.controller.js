import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewController {
	static async apiPostReview(req, res, next) {
		try {
			const { movieId, review, user } = req.body;

			const reviewResponse = await ReviewsDAO.addReview(movieId, user, review);
			res.json({ status: "success" });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	static async apiGetReview(req, res, next) {
		try {
			let id = req.params.id || {};
			let review = await ReviewsDAO.getReview(id);
			if (!review) {
				res.status(404).json({ error: "Not Found" });
				return;
			}
			res.json(review);
		} catch (err) {
			console.log(`api, ${err}`);
			res.status(500).json({ error: err });
		}
	}

	static async apiUpdateReview(req, res, next) {
		try {
			const reviewId = req.params.id;
			const { review, user } = req.body;

			const reviewResponse = await ReviewsDAO.updateReview(
				reviewId,
				user,
				review
			);

			var { error } = reviewResponse;

			if (error) {
				res.status(400).json({ error });
			}

			if (reviewResponse.modifiedCount === 0) {
				throw new Error("Unable to update review");
			}

			res.json({ status: "success" });
		} catch (err) {
			console.log(err)
			res.status(500).json({ error: err.message });
		}
	}

	static async apiDeleteReview(req, res, next) {
		try {
			const reviewId = req.params.id;
			const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
			res.json({ status: "success" });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	static async apiGetReviews(req, res, next) {
		try {
			let id = req.params.id || {};
			let reviews = await ReviewsDAO.getReviewsByMovieId(id);

			if (!reviews) {
				res.status(404).json({ error: "Not found" });
				return;
			}
			res.json(reviews);
		} catch (err) {
			console.log(`api, ${err}`);
			res.status(500).json({ error: err });
		}
	}
}
