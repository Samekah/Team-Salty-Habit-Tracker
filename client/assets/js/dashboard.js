let habitTrack = document.querySelectorAll("[id^='updateStreak']");
let habitStreakTrack = new Array(habitTrack.length);

console.log(habitTrack);
console.log(habitStreakTrack);

//to be used to retrieve data from database
// window.onload = function(){

// };

// for(let i = 0; i < habitStreakTrack.length; i++){
//     habitStreakTrack[i] = 0;
//     console.log(habitStreakTrack[i]);
// }

for(let i = 0; i < habitTrack.length; i++){
    
    habitStreakTrack[i] = 0;
    console.log(habitStreakTrack[i]);

    habitTrack[i].addEventListener("click", ()=>{
        let habitTitle = document.querySelector(`#habitTitle${i+1}`);
        let habitStreak = document.querySelector(`#habitstreak${i+1}`);
        
        // console.log(`habit title is ${habitTitle.textContent}`);
        habitStreakTrack[i]++;        
        habitStreak.textContent = `${habitStreakTrack[i]} `;

        // console.log(`the habit streak is ${habitStreak.textContent}`)
        habitTrack[i].disabled = true;  
    }); 
}

const logOut = document.getElementById('logout');
logOut.addEventListener('click',() => {
    logout()
})

function logout(){
    localStorage.clear();
    window.location.href = '/login';
}

/*Todo:
    -[x] find each log button
    -[x] add events to each button
    -[x] find habit title from log button
    -[x] figure out how to increase streak value
    -[] find the habit based on habit name
    -[] log that a habit has been done
    -[] update to check if it is consecutive:
        -[] if it is increase the value of the streak
        -[] if not set streak to 1
    -[] Pull data from database
    -[] If at a certain time if the log button isnt disabled - log no item + set streak to 0
*/
