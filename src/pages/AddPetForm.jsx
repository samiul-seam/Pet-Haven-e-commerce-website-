import { useForm } from "react-hook-form";
import useFetchCategory from "../hooks/useFetchCategory";
import { useState } from "react";
import authApiClient from "../services/auth-api-client";
import { useNavigate } from "react-router";

const AddPetForm = () => {
  const [petId, setPetId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // fetch category
  const { categories } = useFetchCategory();

  // add pet
  const handlePetAdd = async (data) => {
    setLoading(true);
    try {
      const response = await authApiClient.post("/pets/", data);
      setPetId(response.data.id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  // Handle Image Upload
  const handleUpload = async () => {
    if (!images.length) return alert("Please select images.");

    setLoading(true);

    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);
        await authApiClient.post(`/pets/${petId}/images/`, formData);
      }

      alert("Pet Added Successfully");
      navigate("/dashboard/pets");
    } catch (error) {
      console.log("Error uploading image", error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (error) => {
    return `input input-bordered bg-slate-100 text-black w-full mb-3 ${error ? "input-error" : "input-info"}`;
  };

  return (
    <div>
      {!petId ? (
        <form
          onSubmit={handleSubmit(handlePetAdd)}
          className="space-y-4 bg-slate-200  p-6 rounded-xl shadow-md shadow-slate-400 border border-slate-200"
        >
          <div className="">
            {/* Name */}
            <div className="form-control">
              <label className="label font-semibold text-slate-600">
                Pet Name
              </label>
              <input
                type="text"
                className={inputClass(errors.name)}
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 1, message: "Min length is 1" },
                  maxLength: { value: 50, message: "Max length is 50" },
                })}
              />
              {errors.name && (
                <span className="text-error text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Category (Integer/Select) */}
            <div className="form-control">
              <label className="label font-semibold text-slate-600">
                Category
              </label>
              <select
                className={inputClass(errors.category)}
                {...register("category", {
                  required: "Please select a category",
                })}
              >
                <option value="">Select Category</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-error text-xs mt-1">
                  {errors.category.message}
                </span>
              )}
            </div>

            {/* Breed */}
            <div className="form-control">
              <label className="label font-semibold text-slate-600">
                Breed
              </label>
              <input
                type="text"
                className={inputClass(errors.breed)}
                {...register("breed", {
                  required: "Breed is required",
                  maxLength: { value: 50, message: "Max length is 50" },
                })}
              />
              {errors.breed && (
                <span className="text-error text-xs mt-1">
                  {errors.breed.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Age (Decimal/Number) */}
              <div className="form-control">
                <label className="label font-semibold text-slate-600">
                  Age
                </label>
                <input
                  type="number"
                  step="0.1"
                  className={inputClass(errors.age)}
                  {...register("age", { required: "Age is required" })}
                />
                {errors.age && (
                  <span className="text-error text-xs mt-1">
                    {errors.age.message}
                  </span>
                )}
              </div>

              {/* Price (Decimal) */}
              <div className="form-control">
                <label className="label font-semibold text-slate-600">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  className={inputClass(errors.price)}
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && (
                  <span className="text-error text-xs mt-1">
                    {errors.price.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label font-semibold text-slate-600 mr-4">
              Description
            </label>
            <textarea
              className={`textarea bg-slate-100 text-black textarea-bordered h-24 ${errors.description ? "textarea-error" : "textarea-info"}`}
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <span className="text-error text-xs mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full mt-4"
          >
            {isSubmitting ? "Registering..." : "Add Pet"}
          </button>
        </form>
      ) : (
        <div>
          <h3 className="text-lg text-black font-medium mb-2">
            Upload Pet Images
          </h3>
          <input
            type="file"
            multiple
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />
          {previewImages.length > 0 && (
            <div className="flex gap-2 mt-2">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Preview"
                  className="w-16 h-16 rounded-md object-cover"
                />
              ))}
            </div>
          )}

          <button
            onClick={handleUpload}
            className="btn bg-teal-800 w-full mt-2"
            disabled={loading}
          >
            {loading ? "Uploading images..." : "Upload Images"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPetForm;
