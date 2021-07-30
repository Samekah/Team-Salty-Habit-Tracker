let baseApiUrl = 'https://habitual-2021.herokuapp.com';
//const baseApiUrl = 'http://localhost:3000';

const form = document.getElementById('login');
form.addEventListener('submit', login);

async function login(e) {
    e.preventDefault();

    const userData = {
        username: e.target.username.value,
        password: e.target.password.value
    }

    try {
        const options = { 
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" }
        };

        const response = await fetch(`${baseApiUrl}/auth/login`, options)
        const data = await response.json()
        if (!data.success) {
            throw new Error('User Not Authorised');
        } else {
            //store token
            const user = jwt_decode(data.token);
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", user.username);
            window.location.href = '/dashboard';
        }

    } catch(err) {
        console.warn(err);
    }

}

function jwt_decode (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};