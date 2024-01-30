import { useState } from "react"
import { createCateogry, getCategories } from "../../managers/categoryManager"

export const CategoryForm = ({ user, categories, setCategories }) => {
  const [category, setCategory] = useState("")

  const handleInput = (e) => {
    setCategory(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!category) {
      window.alert("Please enter a new category before clicking create.")
    } else if (
      categories.find((c) => c.name.toLowerCase() === category.toLowerCase())
    ) {
      window.alert(
        "That category already exists. Please enter a unique category name."
      )
    } else {
      const newCategory = {
        userId: user.id,
        name: category,
      }

      createCateogry(newCategory).then(() => {
        getCategories().then((res) => {
          setCategories(res)
          setCategory("")
        })
      })
    }
  }

  return (
    <div className="new-category-card">
      <form className="form">
        <h2 className="form-heading">Create New Category</h2>
        <fieldset className="form-group">
          <input
            className="form-input"
            type="text"
            required
            id="new-category"
            value={category}
            onChange={handleInput}
          />
        </fieldset>
        <button className="submit-btn" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  )
}
