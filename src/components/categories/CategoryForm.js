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
    <form className="bg-gray-100 p-6 rounded-md shadow-md shadow-gray-400 text-orange-800">
      <h3 className="text-xl my-4 text-center font-semibold">
        Create New Category
      </h3>
      <fieldset className="w-full text-center my-6">
        <input
          className="w-4/5 bg-white rounded h-10 text-center placeholder:text-orange-700 text-orange-800"
          type="text"
          required
          placeholder="Enter a new category"
          id="new-category"
          value={category}
          onChange={handleInput}
        />
      </fieldset>
      <fieldset className="flex justify-center">
        <button
          className="py-2 px-4 bg-orange-300 rounded-md text-lg shadow-orange-700 shadow hover:-translate-y-0.5 duration-150"
          onClick={handleSubmit}
        >
          Create
        </button>
      </fieldset>
    </form>
  )
}
