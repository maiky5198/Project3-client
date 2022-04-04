import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllAdventures = () => {
    return axios(`${apiUrl}/adventures`)
}