import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import ReviewList from "./ReviewList";
import authApiClient from "../../services/auth-api-client";
import AddReviewForm from "./AddReviewForm";

const ReviewsSection = ({ pet, user }) => {
  const [reviews, setReviews] = useState([]);
  const [editReview, setEditReview] = useState({ rating: 0, comment: "" });
  const [editingId, setEditingId] = useState(null);
  const [userCanReview, setUserCanReview] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await apiClient.get(`/pets/${pet.id}/reviews/`);
      setReviews(res.data);
    } catch (error) {
      console.log("Error fetching reviews", error);
    }
  };
 
  useEffect(() => {
    checkUserPermission();
    fetchReviews();
  }, []);

  const onSubmit = async (data) => {
    try {
      await authApiClient.post(`/pets/${pet.id}/reviews/`, data);
      fetchReviews();
    } catch (error) {
      console.log("Error submitting review", error);
    }
  };

  const checkUserPermission = async () => {
    try {
      const res = await authApiClient.get(`/adoptions/has-adopted/${pet.id}/`);
      setUserCanReview(res.data.hasAdopted);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateReview = async (data) => {
    try {
      await authApiClient.put(`/pets/${pet.id}/reviews/${editingId}/`, data);
      setEditingId(null);
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await authApiClient.delete(`/pets/${pet.id}/reviews/${reviewId}/`);
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  const noReviews = reviews.length === 0;

  return (
    <div>
      {noReviews ? (
        userCanReview ? (
          <div className="card bg-white text-black shadow-lg border border-base-200 rounded-xl overflow-hidden">
            <div className="card-body">
              <h3 className="card-title text-lg">Write a Review</h3>
              <AddReviewForm onSubmit={onSubmit} />
            </div>
          </div>
        ) : (
          <div className="text-black">There is no comment</div>
        )
      ) : (
        <ReviewList
          reviews={reviews}
          user={user}
          editingId={editingId}
          setEditingId={setEditingId}
          editReview={editReview}
          setEditReview={setEditReview}
          handleUpdateReview={handleUpdateReview}
          handleDeleteReview={handleDeleteReview}
        />
      )}
    </div>
  );
};

export default ReviewsSection;
