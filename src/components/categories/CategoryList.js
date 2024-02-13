import { Category } from "./Category"

export const CategoryList = ({
  filteredCategories,
  sectionHeading,
  categories,
  setCategories,
}) => {
  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md shadow-gray-400 text-orange-800 w-4/5 md:w-1/2 lg:w-full min-w-[350px]">
      <h3 className="text-xl my-4 text-center font-semibold">
        {sectionHeading}
      </h3>
      <ul className="categories">
        {filteredCategories.map((c) => (
          <Category
            key={`category-${c.id}`}
            c={c}
            categories={categories}
            setCategories={setCategories}
          />
        ))}
      </ul>
    </div>
  )
}
