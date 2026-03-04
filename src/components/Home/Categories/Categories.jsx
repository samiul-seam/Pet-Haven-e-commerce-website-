import CategoryItem from "./CategoryItem";
import useFetchCategory from "../../../hooks/useFetchCategory";

const Categories = () => {
  const {categories} = useFetchCategory();
  
  return (
    <div>
      <section className="py-2 px-4 w-2/3 mx-auto mt-6 mb-8" id="categories">
        <div className="md:flex justify-between mb-4">
          <p className="text-slate-500 mb-4">Find your perfect pet companion</p>
        </div>

        <div className="flex flex-wrap justify-evenly gap-4 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <CategoryItem key={category.id} category={category} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Categories;
