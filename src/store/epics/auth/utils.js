export const setAuthHeaderToLocalStorage = ({header}) => {
  const token = header.split(' ')[1]
  localStorage.setItem('authToken', token)
}
