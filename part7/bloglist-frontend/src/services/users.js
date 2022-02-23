import Axios from 'axios'

const baseUrl = '/api/users'

const getAllUsers = async () => {
  const response = await Axios.get(baseUrl)
  return response.data
}


export default { getAllUsers }