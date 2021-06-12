import { API } from "../../backend";


export const userPurchaseList = (userId, token) => {
    return fetch(`${API}/order/user/${userId}`, {
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}