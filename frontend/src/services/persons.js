import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
             .then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
             .then(response => response.data)
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`)
             .then(response => response.data)
}

const update = (personToUpdate) => {
  return axios.put(`${baseUrl}/${personToUpdate.id}`,personToUpdate)
             .then(response => response.data)
}


export default { getAll, create , deletePerson , update}