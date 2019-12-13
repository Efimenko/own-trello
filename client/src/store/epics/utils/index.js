export const setAuthHeaderToLocalStorage = ({header}) => {
  const token = header.split(' ')[1]
  localStorage.setItem('authToken', token)
}

export const getAuthHeaderFromLocalStorage = () => {
  const token = localStorage.getItem('authToken')
  return `Bearer ${token}`
}
