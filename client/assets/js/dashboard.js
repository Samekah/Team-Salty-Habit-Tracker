let habitTrack = document.querySelectorAll("[id^='updateStreak']");
let habitStreakTrack = new Array(habitTrack.length);

let habitTrack = document.querySelectorAll("[id^='updateStreak']");
let habitStreakTrack = new Array(habitTrack.length);
let usernameInLocalStorage = localStorage.getItem('username');
window.onload = function () {
  console.log('loaded');
  renderHabitToDashboard(usernameInLocalStorage);
};
for (let i = 0; i < habitTrack.length; i++) {
  habitStreakTrack[i] = 0;
  //   console.log(habitStreakTrack[i]);
  habitTrack[i].addEventListener('click', () => {
    let habitTitle = document.querySelector(`#habitTitle${i + 1}`);
    let habitStreak = document.querySelector(`#habitstreak${i + 1}`);
    // console.log(`habit title is ${habitTitle.textContent}`);
    habitStreakTrack[i]++;
    habitStreak.textContent = `${habitStreakTrack[i]} `;
    // console.log(`the habit streak is ${habitStreak.textContent}`)
    habitTrack[i].disabled = true;
  });
}
const logOut = document.getElementById('logout');
logOut.addEventListener('click', () => {
  logout();
});
function logout() {
  localStorage.clear();
  window.location.href = '/login';
}
function renderUsernameToDashboard(username) {
  let parentSection = document.querySelector('#userInfo');
  let UsernameH1 = document.createElement('H1');
  UsernameH1.textContent = username;
  parentSection.appendChild(UsernameH1);
}
renderUsernameToDashboard(usernameInLocalStorage);
async function fetchUserIdByUsername(uName) {
  let response = await fetch(`http://localhost:3000/user/${uName}`);
  let userID = await response.json();
  let res = await fetch(`http://localhost:3000/user/${userID}/habits`);
  let userHabitsRetrieved = await res.json();
  return userHabitsRetrieved;
}
async function renderHabitToDashboard(uName) {
  let data = await fetchUserIdByUsername(uName);
    let counter = 0;
  for (let i = 0; i < data.length; i++) {
    let divForHabit = document.createElement('div');
    let h4ForHabitTitle = document.createElement('h4');
    let buttonForHabit = document.createElement('button');
    let paraForHabit = document.createElement('p');
    let spanForPara = document.createElement('span');
    divForHabit.setAttribute('class', 'habitItem');
    buttonForHabit.id = `updateStreak${i}`;
    spanForPara.id = `habitstreak${i}`;
    h4ForHabitTitle.textContent = data[i].habit;
    paraForHabit.textContent = 'habit streak is:';
    buttonForHabit.textContent = '+';
    let overallSection = document.querySelector('#habits');
    overallSection.appendChild(h4ForHabitTitle);
    overallSection.appendChild(buttonForHabit);
    overallSection.appendChild(paraForHabit);
    paraForHabit.appendChild(spanForPara);
    if (data.history === []){
        spanForPara.textContent = '0';
    } else {
        let date = new Date();
        date = date.toISOString().split('-')[0];
        if(){
        }
    }
  }

}

const logOut = document.getElementById('logout');
logOut.addEventListener('click', () => {
  logout();
});

function logout() {
  localStorage.clear();
  window.location.href = '/login';
}

let usernameInLocalStorage = localStorage.getItem('username');

function renderUsernameToDashboard(username) {
  let parentSection = document.querySelector('#userInfo h2');
  parentSection.innerText = username;
}

renderUsernameToDashboard(usernameInLocalStorage);
console.log(usernameInLocalStorage);

async function fetchUserIdByUsername(uName) {
  let response = await fetch(`http://localhost:3000/user/${uName}`);
  let userID = await response.json();
  //   console.log(userID);
  let res = await fetch(`http://localhost:3000/user/${userID}/habits`);
  let userHabitsRetrieved = await res.json();
  console.log(userHabitsRetrieved);
}

fetchUserIdByUsername(usernameInLocalStorage);

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
    -[] on page load get data from database
*/
