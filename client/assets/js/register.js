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
    
        const response = await fetch('http://localhost:3000/register', options)
        const { user, err } = await response.json()
        if(err) {
            throw Error(err)
        } else {
            console.log(user)
            //window.location.replace("/login");
        }

    } catch (err) {
        console.warn(err);
    }

};