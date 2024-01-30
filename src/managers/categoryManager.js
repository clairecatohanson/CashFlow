export const getCategories = async () => {
  const response = await fetch("http://localhost:8088/categories")
  return await response.json()
}

export const createCateogry = async (newCategory) => {
  const postOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCategory),
  }

  return await fetch("http://localhost:8088/categories", postOptions)
}

export const updateCategory = async (updatedCategory) => {
  const putOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCategory),
  }

  return await fetch(
    `http://localhost:8088/categories/${updatedCategory.id}`,
    putOptions
  )
}

export const deleteCategory = async (category) => {
  const deleteOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }

  return await fetch(
    `http://localhost:8088/categories/${category.id}`,
    deleteOptions
  )
}
