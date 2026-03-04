import { Link } from "react-router";
import useFetchCategory from "../hooks/useFetchCategory";
import CategoryList from "../components/dashboard/Categories/CategoryList";

const Categories = () => {

  const {categories, isLoading} = useFetchCategory();

  return (
    <div className="bg-slate-200 rounded-xl border border-slate-300 shadow-md shadow-slate-300 overflow-hidden">
      <div className="p-6 border border-slate-50">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold mb-4 text-slate-500">
            All pets
          </h3>
          <button className="text-teal-600 hover:underline cursor-pointer hover:text-teal-500">
            <Link to={"/dashboard/categories/add"}>Add Category</Link>
          </button>
        </div>

        <div className="overflow-x-auto shadow-md shadow-slate-600">
          <table className="table w-full ">
            <thead className="bg-slate-300  text-slate-500 uppercase text-sm">
              <tr>
                <th className="py-4">Pet Id</th>
                <th className="py-4">Pet Name</th>
                <th className="py-4">Description</th>
                <th className="py-4">Total pets</th>
              </tr>
            </thead>

            {!isLoading &&
              categories.map((category) => 
              <CategoryList key={category.id} category={category} />
              )}
          </table>
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-xl text-info"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
