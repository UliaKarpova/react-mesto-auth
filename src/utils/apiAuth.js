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
          } catch(e){
            return (e)
          }
        })
        
}

export const auth = (email, password) => {
    return fetch(`${BASE_URL}/singin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
        .then((res) => {
            return res.json()
        }).then((data) => {
            localStorage.setItem('token', data.token);
        })
    })
}

export const isTokenVAlid = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        .then((res) => {
            return res.json()
        }).then((data) => {
            localStorage.setItem('token', data.token);
        })
    })
}