const form = document.getElementById('register');
form.addEventListener('submit', register);

async function register(e) {
    e.preventDefault();

    if (e.target.password.value !== e.target.rpassword.value) {
        alert('Passwords Do Not Match!');
        return
    }

    const userData = {
        username: e.target.username.value,
        password: e.target.password.value,
        first_name: e.target.fname.value,
        last_name: e.target.lname.value,
        email: e.target.email.value,
    };

    try {
        const options = { 
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" }
        };
    
        const response = await fetch('http://localhost:3000/auth/register', options)
        const { user, err } = await response.json()
        if(err) {
            throw Error(err)
        } else {
            //success so log user in
            logUserIn(userData.username,userData.password)
        }

    } catch (err) {
        console.warn(err);
    }

};

async function logUserIn(username,password) {

    const userData = {
        username,
        password
    }

    try {
        const options = { 
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" }
        };

        const response = await fetch('http://localhost:3000/auth/login', options)
        const data = await response.json()
        if (!data.success) {
            throw new Error('User Not Authorised');
        } else {
            //store token
            const user = jwt_decode(data.token);
            console.log(user);
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