//const authApiUrl = 'https://habitual-2021.herokuapp.com';
const authApiUrl = 'http://localhost:3000';

authoriseUser();

async function authoriseUser(){

    console.log('running authentication...');

    try {
        const options = {
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
        }
    
        const response = await fetch(`${authApiUrl}/auth`, options)
        const data = await response.json()
    
        if(data.message == "Token missing" || data.err == "Invalid token") {
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
