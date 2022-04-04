import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllAdventures = () => {
    return axios(`${apiUrl}/adventures`)
}

// index of user's adventures function
export const getMyAdventures = (user) => {
    return axios(`${apiUrl}/adventures/mine`)
}

//show function
export const showAdventure = (adventureId) => {
    return axios(`${apiUrl}/adventures/${adventureId}`)
}

// POST -> create function
export const createAdventure = (user, newAdventure) => {
    console.log('user', user)
    console.log('this is newAdventure', newAdventure)
    return axios({
        url: `${apiUrl}/adventures`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { adventure: newAdventure }
    })
}

// PATCH -> update function
export const updateAdventure = (user, updatedAdventure) => {
    console.log('user', user)
    console.log('this is updatedAdventure', updatedAdventure)
    return axios({
        url: `${apiUrl}/adventures/${updatedAdventure.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { adventure: updatedAdventure }
    })
}

// DELETE -> remove function
export const removeAdventure = (user, adventureId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/adventures/${adventureId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

