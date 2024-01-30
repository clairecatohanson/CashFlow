import { Category } from "./Category"

export const CategoryList = ({
  filteredCategories,
  sectionHeading,
  categories,
  setCategories,
}) => {
  return (
    <div className="public-categories">
      <h3 className="column-heading">{sectionHeading}</h3>
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
