import {
  fetchWithResponse,
  fetchWithoutResponse,
  deleteOptions,
  getOptions,
  postOptions,
  putOptions,
} from "./fetcher"

export const getCategories = async () => {
  return await fetchWithResponse("categories", getOptions())
}

export const createCategory = async (newCategory) => {
  return await fetchWithResponse("categories", postOptions(newCategory))
}

export const updateCategory = async (updatedCategory) => {
  return await fetchWithoutResponse(
    `categories/${updatedCategory.id}`,
    putOptions(updatedCategory)
  )
}

export const deleteCategory = async (category) => {
  return await fetchWithoutResponse(
    `categories/${category.id}`,
    deleteOptions()
  )
}
