import { useState } from "react"
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../managers/categoryManager"

export const Category = ({ c, categories, setCategories }) => {
  const [isEditable, setIsEditable] = useState(false)
  const [input, setInput] = useState("")
  const [groupId, setGroupId] = useState(0)

  const getAndSetCategories = () => {
    getCategories().then((res) => {
      setCategories(res)
    })
  }

  const handleEdit = (category) => {
    setIsEditable(true)
    setInput(category.name)
    setGroupId(category.group)
  }

  const handleDelete = (category) => {
    deleteCategory(category).then(() => {
      getAndSetCategories()
    })
  }

  const handleInput = (event) => {
    setInput(event.target.value)
  }

  const handleDropdown = (event) => {
    setGroupId(parseInt(event.target.value))
  }

  const handleSave = (c) => {
    if (c.name.toLowerCase() === input.toLowerCase() && c.groupId === groupId) {
      setIsEditable(false)
    } else if (
      c.name.toLowerCase() === input.toLowerCase() &&
      c.groupId !== groupId
    ) {
      const categoryCopy = { ...c }
      categoryCopy.name = input
      categoryCopy.groupId = groupId

      setIsEditable(false)

      updateCategory(categoryCopy).then(() => {
        getCategories().then((res) => {
          setCategories(res)
        })
      })
    } else if (!input) {
      setIsEditable(false)
      window.alert("Please enter a category before clicking save.")
    } else if (!groupId) {
      setIsEditable(false)
      window.alert(
        "Please select an expense group from the dropdown before clicking save."
      )
    } else if (
      categories.find(
        (category) => category.name.toLowerCase() === input.toLowerCase()
      )
    ) {
      setIsEditable(false)
      window.alert(
        "That category already exists. Please enter a unique category name."
      )
    } else {
      const categoryCopy = { ...c }
      categoryCopy.name = input
      categoryCopy.groupId = groupId

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
        // Save and Delete Buttons Container
        <div className="min-w-[100px]">
          {/* Save Button */}
          <button
            className="py-1 px-3 bg-gray-200 text-gray-900 border-2 border-gray-900 rounded hover:-translate-y-0.5 hover:shadow-md hover:shadow-gray-400 ml-2"
            onClick={() => {
              handleSave(c)
            }}
          >
            <i className="fa-regular fa-floppy-disk"></i>
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
    } else {
      return (
        // Edit and Delete Button Container
        <div className="min-w-[100px]">
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
        // Input and Dropdown Container
        <div className="w-3/5 text-sm">
          <input
            className="w-3/5 h-10 text-center outline outline-1 rounded"
            name="category-name-input"
            type="text"
            value={input}
            onChange={handleInput}
          />
          <select
            value={groupId}
            onChange={handleDropdown}
            name="expense-group-dropdown"
            className="w-3/5 bg-white rounded h-10 mt-4 text-center text-orange-800"
          >
            <option value="" disabled>
              Select expense group
            </option>
            <option value="1">Essential</option>
            <option value="2">Non-Essential</option>
            <option value="3">Savings, Investments, & Debt Payments</option>
            <option value="4">Income</option>
            <option value="5">Business</option>
            <option value="6">Taxes</option>
            <option value="6">Special Projects</option>
          </select>
        </div>
      ) : (
        // Static Text
        <div className="w-3/5">{c.name}</div>
      )}
      {/* Render Buttons for custom categories only */}
      {c.user !== 100 && renderButtons(c)}
    </li>
  )
}
