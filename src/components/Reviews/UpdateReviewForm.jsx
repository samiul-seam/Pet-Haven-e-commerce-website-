import { useForm } from "react-hook-form";
import StarRating from "./StarRating";
import { useEffect } from "react";


const UpdateReviewForm = ({ onChange, initialData, onCancel }) => { // 2. Accept new props
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset, // 3. Get reset function
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData // 4. Set initial defaults
  });

  // 5. Sync form if initialData changes
  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const ratingValue = watch("rating");

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onChange)}
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
            onClick={onCancel} // 6. Logic fulfilled
            className="btn btn-sm btn-outline"
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

export default UpdateReviewForm;
