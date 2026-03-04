import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { FaTrash } from "react-icons/fa";
import useFetchCategory from "../../../hooks/useFetchCategory";
import authApiClient from "../../../services/auth-api-client";

const UpdatePetSection = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pet, setPet] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();
  const { categories } = useFetchCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await authApiClient.get(`/pets/${id}/`);
        setPet(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPet();
  }, []);

  useEffect(() => {
    if (pet) {
      reset(pet);
    }
  }, [pet, reset]);


  // 2. Handle Update
  const handleUpdateInfo = async (data) => {
    setLoading(true);
    try {
      await authApiClient.patch(`/pets/${pet.id}/`, data);
      alert("Pet updated successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // delete pet
  const handleDeletePet = async () => {
    setLoading(true);
    try {
      await authApiClient.delete(`/pets/${pet.id}/`);
      alert("Pet deleted successfully");
      navigate("/dashboard/pets");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Image Selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  // 4. Delete Image
  const handleDeleteExistingImage = async (imageId) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await authApiClient.delete(`/pets/${pet.id}/images/${imageId}/`);
      alert("Image deleted");
    } catch (error) {
      console.log(error);
    }
  };

  // 5. Upload New Images
  const handleNewImageUpload = async () => {
    if (!newImages.length) return alert("No new images selected.");
    setLoading(true);
    try {
      const uploadPromises = newImages.map((image) => {
        const formData = new FormData();
        formData.append("image", image);
        return authApiClient.post(`/pets/${pet.id}/images/`, formData);
      });
      await Promise.all(uploadPromises);
      alert("New images added!");
      setNewImages([]);
      setPreviewImages([]);
      navigate(0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }; 
  if (!pet) return <div>Loading...</div>;

  const inputClass = (error) =>
    `input input-bordered bg-slate-100 text-black w-full mb-3 ${error ? "input-error" : "input-info"}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      <form
        onSubmit={handleSubmit(handleUpdateInfo)}
        className="space-y-4 bg-slate-300/40 p-6 rounded-xl shadow-sm shadow-slate-400"
      >
        <div className="flex justify-between items-center text-xl font-bold text-slate-700 mb-4">
          <h2>Update Pet Info</h2>
          <Link
            to={"/dashboard/pets"}
            className="text-xs text-teal-600 hover:underline hover:text-teal-600/80"
          >
            Return to Pets page{" "}
          </Link>
        </div>

        <div className="form-control">
          <label className="label font-semibold text-slate-600">Pet Name</label>
          <input
            type="text"
            className={inputClass(errors.name)}
            {...register("name", { required: true })}
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold text-slate-600">Category</label>
          <select
            className={inputClass(errors.category)}
            {...register("category", { required: true })}
          >
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label font-semibold text-slate-600">Age</label>
            <input
              type="number"
              step="0.1"
              className={inputClass(errors.age)}
              {...register("age")}
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold text-slate-600">Price</label>
            <input
              type="number"
              step="0.01"
              className={inputClass(errors.price)}
              {...register("price")}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label font-semibold text-slate-600 mr-4">
            Description
          </label>
          <textarea
            className={`textarea bg-slate-100 ${errors.description ? "input-error" : "input-info"} text-black h-24`}
            {...register("description")}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn bg-teal-800 w-full"
        >
          {loading ? "Saving..." : "Update Details"}
        </button>
      </form>

      <div className="bg-slate-200 p-6 rounded-xl shadow-md border border-slate-200">
        <h3 className="text-xl font-bold text-slate-700 mb-4">Manage Images</h3>
 

        <div className="mb-6">
          <label className="label font-semibold text-slate-600">
            Current Images
          </label>
          <div className="flex flex-wrap gap-3">
            {pet?.images?.length > 0 &&
              pet.images.map((img) => (
                <div key={img.id} className="relative group">
                  <img
                    src={img.image}
                    alt="pet"
                    className="w-20 h-20 object-cover rounded-lg border-2 border-slate-300"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteExistingImage(img.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="form-control">
          <label className="label font-semibold text-slate-600">
            Add New Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="file-input file-input-bordered file-input-info w-full"
            onChange={handleImageChange}
          />

          {previewImages.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  className="w-16 h-16 rounded-md object-cover border border-teal-500"
                />
              ))}
            </div>
          )}

          <button
            onClick={handleNewImageUpload}
            disabled={loading || newImages.length === 0}
            className="btn bg-teal-800 text-white w-full mt-4"
          >
            {loading ? "Uploading..." : "Upload New Images"}
          </button>
        </div>
      </div>
      <button
        onClick={handleDeletePet}
        className="btn bg-red-600 hover:bg-red-700 max-w-40 items-center mx-auto"
      >
        {loading ? "Deleting..." : "Delete this pet"}
      </button>
    </div>
  );
};

export default UpdatePetSection;
