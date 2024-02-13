import { useEffect, useState } from "react"
import { CategoryForm } from "./CategoryForm"
import { getCategories } from "../../managers/categoryManager"
// import "./Categories.css"
import { CategoryList } from "./CategoryList"

export const Categories = ({ user, categories, setCategories }) => {
  const [publicCategories, setPublicCategories] = useState([])
  const [privateCategories, setPrivateCategories] = useState([])

  const publicHeading = "Ready to use categories:"
  const privateHeading = "Custom categories made by you:"

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res)
    })
  }, [setCategories])

  useEffect(() => {
    const publicToAll = categories.filter((c) => c.userId === 100)
    setPublicCategories(publicToAll)
    const userCategories = categories.filter((c) => c.userId === user.id)
    setPrivateCategories(userCategories)
  }, [categories, user])

  return (
    <div className="categories-container">
      <div className="category-list">
        <CategoryList
          filteredCategories={publicCategories}
          sectionHeading={publicHeading}
          categories={categories}
          setCategories={setCategories}
        />
      </div>
      <div className="category-list">
        <CategoryList
          filteredCategories={privateCategories}
          sectionHeading={privateHeading}
          categories={categories}
          setCategories={setCategories}
        />
      </div>
      <div className="category-form">
        <CategoryForm
          user={user}
          categories={categories}
          setCategories={setCategories}
        />
      </div>
    </div>
  )
}
