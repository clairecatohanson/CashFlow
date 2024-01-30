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

  const handleSave = (c) => {
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
        <div className="list-btns">
          <button
            className="save-btn"
            onClick={() => {
              handleSave(c)
            }}
          >
            <i className="fa-regular fa-floppy-disk"></i>
          </button>
          <button
            className="delete-btn"
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
        <div className="list-btns">
          <button
            className="edit-btn"
            onClick={() => {
              handleEdit(c)
            }}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          <button
            className="delete-btn"
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
    <li key={`category-${c.id}`} className="category">
      {isEditable ? (
        <input type="text" value={input} onChange={handleInput} />
      ) : (
        <div className="list-text">{c.name}</div>
      )}
      {c.userId !== 500 && renderButtons(c)}
    </li>
  )
}
