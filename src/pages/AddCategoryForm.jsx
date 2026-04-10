import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import { Link } from "react-router";

const AddCategoryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleCategpryAdd = async (data) => {
    try {
      await apiClient.post("/categories/", data);
      reset();
      alert("Category added successfully");
    } catch (error) {
      console.log(error);
    }
  };
 
  const inputClass = (error) => {
    return `input input-bordered bg-slate-100 text-black w-full mb-3 ${error ? "input-error" : "input-warning"}`;
  };

  return (
    <div className="space-y-4 bg-slate-200 p-6 rounded-sm shadow shadow-slate-400 border border-slate-200">

      <div className="flex justify-between items-center">
        <h1 className="text-slate-600 font-bold text-xl">Add Category</h1>
        <Link to={"/dashboard/categories"} className="text-xs text-gray-600 hover:text-yellow-600 hover:underline">Back to category view</Link>
      </div>

      <form onSubmit={handleSubmit(handleCategpryAdd)}>
        <div className="form-control">
          <label className="label text-slate-600 font-semibold">Name</label>
          <input
            type="text"
            className={inputClass(errors.name)}
            {...register("name", {
              required: "Name is required",
            })}
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
            className={inputClass(errors.name)}
            {...register("description", {
              required: "Descripton is required",
            })}
          />
          {errors.description && (
            <span className="text-error text-xs mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        <button className="btn bg-orange-400 hover:shadow-none w-full mt-2">
          {isSubmitting ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
