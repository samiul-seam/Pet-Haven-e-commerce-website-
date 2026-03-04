import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencil, FaStar } from "react-icons/fa6";
import UpdateReviewForm from "./UpdateReviewForm";

const ReviewList = ({
  reviews,
  user,
  editingId,
  setEditingId,
  editReview,
  setEditReview,
  handleUpdateReview,
  handleDeleteReview,
}) => {
  return (
    <div>
      {reviews.map((review) => (
        <div className="flex items-center gap-3" key={review.id}>
          {editingId === review.id ? (
            <div className="card bg-white text-black shadow-lg border border-base-200 rounded-xl overflow-hidden">
              <div className="card-body">
                <h3 className="card-title text-lg">Write a Review</h3>
                <UpdateReviewForm
                  initialData={editReview}
                  onChange={handleUpdateReview}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            </div>
          ) : (
            <div key={review.id}>
              <div className="text-black mx-14 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < review.rating ? "text-yellow-500" : "text-slate-400"
                    }
                  />
                ))}
              </div>

              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full bg-teal-200 text-center">
                    <span className="text-white font-bold text-2xl text-center">
                      {review.user[0]}
                    </span>
                  </div>
                </div>

                <div className="chat-header text-teal-800">
                  {review.user}{" "}
                  <time className="text-xs opacity-50">
                    {new Date(review.created_at).toLocaleDateString()}
                  </time>
                </div>

                <div className="flex items-center gap-3">
                  <div className="chat-bubble bg-teal-500 text-white">
                    {review.comment}
                  </div>

                  {user && user.email === review.user && (
                    <div className="flex gap-2">
                      <button
                        className="text-black cursor-pointer hover:bg-slate-300 rounded-full p-1"
                        onClick={() => {
                          setEditingId(review.id);
                          setEditReview({
                            rating: review.rating,
                            comment: review.comment,
                          });
                        }}
                      >
                        <FaPencil />
                      </button>

                      <button
                        className="text-black cursor-pointer"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
