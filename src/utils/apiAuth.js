export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (data) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((res) => {
        try {
            if (res.status === 200 || res.status === 201){
              return res.json();
            }
        } catch(e) {
            return (e);
        }
    })
        
}

export const auth = (data) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((res) => {
            console.log(res);
            return res.json()
        })
}

export const isTokenValid = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then((res) => {
            return res.json();
        })
}