import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import authApiClient from "../../../services/auth-api-client";

const UpdateCategory = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await authApiClient.get(`/categories/${id}/`);
        setCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, [id]);

  // fetched data
  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);

  // Update category
  const handleCategoryUpdate = async (data) => {
    try {
      await authApiClient.put(`/categories/${id}/`, data);
      alert("Category updated successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to update category");
    }
  };

  // delete category
  const handleDeleteCategory = async () => {
    setLoading(true);
    try {
      await authApiClient.delete(`/categories/${category.id}/`);
      alert("Category deleted successfully");
      navigate("/dashboard/categories");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (error) =>
    `input input-bordered bg-slate-100 text-black w-full mb-3 ${
      error ? "input-error" : "input-info"
    }`;

  if (!category) return <div>Loading...</div>;

  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-slate-600 font-bold text-2xl">Edit Category</h2>
            <Link to="/dashboard/categories/" className="text-teal-700 hover:underline hover:text-teal-600 text-xs">Return to Category list</Link>
        </div>
      <form onSubmit={handleSubmit(handleCategoryUpdate)}>
        <div className="form-control">
          <label className="label text-slate-600 font-semibold">Name</label>
          <input
            type="text"
            className={inputClass(errors.name)}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-error text-xs mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label text-slate-600 font-semibold">
            Description
          </label>
          <input
            type="text"
            className={inputClass(errors.description)}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <span className="text-error text-xs mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        <button className="btn bg-teal-700 w-full mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Category"}
        </button>
      </form>
      <button
        onClick={handleDeleteCategory}
        className="btn bg-red-600 mt-4 hover:bg-red-700 max-w-60 items-center mx-auto"
      >
        {loading ? "Deleting..." : "Delete this category"}
      </button>
    </div>
  );
};

export default UpdateCategory;
