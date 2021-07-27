authoriseUser();

async function authoriseUser(){

    console.log('running authentication...');

    try {
        const options = {
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
        }

        console.log(options);
    
        const response = await fetch('http://localhost:3000/auth', options)
        const data = await response.json()
        console.log(data);
    
        if(data.message == "Token missing") {
            logout();
        }
        return data;
    } catch(err) {
        console.warn(err);
    }

}

function logout(){
    localStorage.clear();
    window.location.href = '/login';
}
