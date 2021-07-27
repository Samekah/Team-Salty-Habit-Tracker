let categoryItems = document.querySelectorAll("[id^='category']");

for(let i = 0; i < categoryItems.length; i++){
    
    // habitStreakTrack[i] = 0;
    // console.log(habitStreakTrack[i]);

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

/*Todo:
    -[x] find each category button
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