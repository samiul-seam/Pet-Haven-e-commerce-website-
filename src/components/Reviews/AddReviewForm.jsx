import { useForm } from "react-hook-form";
import StarRating from "./StarRating";

// 1. Added onCancel to props
const AddReviewForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      rating: 0,
      comment: ""
    }
  });

  const ratingValue = watch("rating");

  const handleclick = () => {
    reset()
  }

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center gap-3">
        <input
          type="hidden"
          {...register("rating", { required: "Rating is required", min: 1 })}
        />
        
        <StarRating
          onChange={(value) => {
            setValue("rating", value, { shouldValidate: true });
          }}
          rating={ratingValue}
        />

        <input
          type="text"
          placeholder="Write a review..."
          className={`input bg-white border border-teal-600 input-sm ${errors.comment ? 'border-error' : ''}`}
          {...register("comment", { required: "Comment cannot be empty" })}
        />

        <div className="flex gap-2">
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="btn btn-sm btn-primary"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline"
            onClick={handleclick}
          >
            Cancel
          </button>
        </div>
      </div>

      {(errors.rating || errors.comment) && (
        <span className="text-xs text-error">
          {errors.rating?.message || errors.comment?.message}
        </span>
      )}
    </form>
  );
};

export default AddReviewForm;