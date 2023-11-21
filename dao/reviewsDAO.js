import mongoDb from "mongodb";
const ObjectId = mongoDb.ObjectId;

let reviews;

export default class ReviewsDAO {
	static async injectDB(connection) {
		if (reviews) {
			return;
		}
		try {
			reviews = await connection.db("reviews").collection("reviews");
		} catch (err) {
			console.error(
				`Unable to establish collection handles in userDAO: ${err}`
			);
		}
	}

	static async addReview(movieId, user, review) {
		try {
			const reviewDoc = {
				movieId: movieId,
				user: user,
				review: review,
			};
			return await reviews.insertOne(reviewDoc);
		} catch (err) {
			console.error(`Unable to post review: ${err}`);
			return { error: err };
		}
	}

	static async getReview(reviewId) {
		try {
			return await reviews.findOne({ _id: new ObjectId(reviewId) });
		} catch (err) {
			console.error(`Unable to get review: ${err}`);
			return { error: err };
		}
	}

	static async updateReview(reviewId, user, review) {
		try {
			const updateResponse = await reviews.updateOne(
				{ _id: new ObjectId(reviewId) },
				{ $set: { user: user, review: review } }
			);
			return updateResponse;
		} catch (err) {
			console.error(`Unable to update review: ${err}`);
			return { error: err };
		}
	}

	static async deleteReview(reviewId) {
		try {
			const deleteResponse = await reviews.deleteOne({
				_id: new ObjectId(reviewId),
			});
			return deleteResponse;
		} catch (err) {
			console.error(`Unable to delete: ${err}`);
			return { error: err };
		}
	}

	static async getReviewsByMovieId(movieId) {
		try {
			const cursor = await reviews.find({ movieId: parseInt(movieId) });
			return cursor.toArray();
		} catch (err) {
			console.error(`Unable to get review: ${err}`);
			return { error: err };
		}
	}
}
