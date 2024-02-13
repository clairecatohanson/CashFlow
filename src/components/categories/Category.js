import { useState } from "react"
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../managers/categoryManager"

export const Category = ({ c, categories, setCategories }) => {
  const [isEditable, setIsEditable] = useState(false)
  const [input, setInput] = useState("")

  const getAndSetCategories = () => {
    getCategories().then((res) => {
      setCategories(res)
    })
  }

  const handleEdit = (category) => {
    setIsEditable(true)
    setInput(category.name)
  }

  const handleDelete = (category) => {
    deleteCategory(category).then(() => {
      getAndSetCategories()
    })
  }

  const handleInput = (event) => {
    setInput(event.target.value)
  }

  const handleBlur = (c) => {
    if (
      categories.find(
        (category) => category.name.toLowerCase() === input.toLowerCase()
      )
    ) {
      setIsEditable(false)
      window.alert(
        "That category already exists. Please enter a unique category name."
      )
    } else if (!input) {
      setIsEditable(false)

      window.alert("Please enter a category before clicking save.")
    } else {
      const categoryCopy = { ...c }
      categoryCopy.name = input

      setIsEditable(false)

      updateCategory(categoryCopy).then(() => {
        getCategories().then((res) => {
          setCategories(res)
        })
      })
    }
  }

  const renderButtons = (c) => {
    if (isEditable) {
      return (
        // Save and Delete Button Container
        <div className="">
          {/* Save Button */}
          {/* <button
            className="py-1 px-3 bg-gray-200 text-gray-900 border-2 border-gray-900 rounded hover:-translate-y-0.5 hover:shadow-md hover:shadow-gray-400 ml-2"
            onClick={() => {
              handleSave(c)
            }}
          >
            <i className="fa-regular fa-floppy-disk"></i>
          </button> */}
          {/* Delete Button */}
          <button
            className="py-1 px-3 bg-gray-200 text-gray-900 border-2 border-gray-900 rounded hover:-translate-y-0.5 hover:shadow-md hover:shadow-gray-400 ml-2"
            onClick={() => {
              handleDelete(c)
            }}
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      )
    } else {
      return (
        // Edit and Delete Button Container
        <div className="">
          {/* Edit Button */}
          <button
            className="py-1 px-3 bg-gray-200 text-gray-900 border-2 border-gray-900 rounded hover:-translate-y-0.5 hover:shadow-md hover:shadow-gray-400 ml-2"
            onClick={() => {
              handleEdit(c)
            }}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          {/* Delete Button */}
          <button
            className="py-1 px-3 bg-gray-200 text-gray-900 border-2 border-gray-900 rounded hover:-translate-y-0.5 hover:shadow-md hover:shadow-gray-400 ml-2"
            onClick={() => {
              handleDelete(c)
            }}
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      )
    }
  }

  return (
    // Category Item
    <li key={`category-${c.id}`} className="flex justify-center space-x-4 py-1">
      {isEditable ? (
        // Input Field
        <input
          className="w-3/5 h-10 text-center outline outline-1 rounded"
          type="text"
          value={input}
          onChange={handleInput}
          onBlur={() => {
            handleBlur(c)
          }}
        />
      ) : (
        // Static Text
        <div className="w-3/5">{c.name}</div>
      )}
      {/* Render Buttons for custom categories only */}
      {c.userId !== 100 && renderButtons(c)}
    </li>
  )
}
