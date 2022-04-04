
import apiUrl from '../apiConfig'
import axios from 'axios'


// POST -> create function
export const addComment = (user, adventureId, newGear) => {
    console.log('user', user)
    console.log('this is newGear', newGear)
    return axios({
        url: `${apiUrl}/gear/${adventureId}`,
        method: 'POST',
        data: { gear: newGear }
    })
}

// PATCH -> update function
export const updateGear = (user, adventureId, gearId, updatedGear) => {
    console.log('user', user)
    console.log('this is updatedGear', updatedGear)
    return axios({
        url: `${apiUrl}/gear/${adventureId}/${gearId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { gear: updatedGear }
    })
}

// DELETE -> remove function
export const removeGear = (user, adventureId, gearId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/gear/${adventureId}/${gearId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}