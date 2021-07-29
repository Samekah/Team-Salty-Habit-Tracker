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
  let userID = await fetchUserIDByUsername(uName);
  let data = await fetchUserHabitsByUsername(uName);
  // console.log(data);
  let counter = 0;
  for (let i = 0; i < data.length; i++) {
    let divForHabit = document.createElement('div');
    let h4ForHabitTitle = document.createElement('h4');
    let buttonForHabit = document.createElement('button');
    let paraForHabit = document.createElement('p');
    let spanForPara = document.createElement('span');
    divForHabit.setAttribute('class', 'habitItem');
    buttonForHabit.id = `updateStreak-${data[i].id}`;
    spanForPara.id = `habitstreak${i}`;
    h4ForHabitTitle.textContent = data[i].habit;
    paraForHabit.textContent = 'habit streak is:';
    let userHabitID = data[i].id;
    buttonForHabit.textContent = '+';
    let currentDate = new Date().toISOString().split('T')[0];
    let historyArr = data[i].history.map((item) => item.split('T')[0]);
    if (historyArr.includes(currentDate)) {
      //DATE COMPARISON
      buttonForHabit.disabled = true;
    } else {
      // console.log(historyArr.includes(currentDate));
      buttonForHabit.disabled = false;
    }
    buttonForHabit.addEventListener('click', streakUpdate);
    let overallSection = document.querySelector('#habits');
    overallSection.appendChild(h4ForHabitTitle);
    overallSection.appendChild(buttonForHabit);
    overallSection.appendChild(paraForHabit);
    paraForHabit.appendChild(spanForPara);
    if (data[i].history.length === 0) {
      spanForPara.textContent = '0';
    } else if (data[i].history.length === 1 && currentDate == data[i].history[0].split('T')[0]) {
      spanForPara.textContent = '1';
    } else {
      const oneDay = 24 * 60 * 60 * 1000;
      for (let j = 0; j < data[i].history.length - 1; j++) {
        let dateUnformatted1 = data[i].history[j];
        let dateUnformatted2 = data[i].history[j + 1];
        let dateSemiformatted1 = dateUnformatted1.split('T');
        let dateSemiformatted2 = dateUnformatted2.split('T');
        let dateArray1 = dateSemiformatted1[0].split('-');
        let dateArray2 = dateSemiformatted2[0].split('-');
        let dateFormatted1 = new Date(dateArray1[0], dateArray1[1], dateArray1[2]);
        let dateFormatted2 = new Date(dateArray2[0], dateArray2[1], dateArray2[2]);
        const diffDays = Math.round(Math.abs((dateFormatted2 - dateFormatted1) / oneDay));

        if (diffDays === 1 || data[i].history.length === 1) {
          counter++;
          spanForPara.textContent = counter;
        } else {
          counter = 0;
          spanForPara.textContent = '0';
        }
      }
    }
  }
}

async function streakUpdate(e) {
  e.preventDefault();
  let userHabitID = e.target.id.split('-')[1];
  let options = {
    method: 'POST',
    header: { 'Content-Length': 0 },
  };

  let userid = await fetchUserIDByUsername(usernameInLocalStorage);
  console.log(userid);
  let streakData = await fetch(`http://localhost:3000/user/${userid}/habits/${userHabitID}`, options);
  let { err } = await streakData.json();
}

async function fetchUserIDByUsername(uName) {
  let response = await fetch(`http://localhost:3000/user/${uName}`);
  let userID = await response.json();
  return userID;
}

async function fetchUserHabitsByUsername(uName) {
  let response = await fetch(`http://localhost:3000/user/${uName}`);
  let userID = await response.json();
  //   console.log(userID);
  let res = await fetch(`http://localhost:3000/user/${userID}/habits`);
  let userHabitsRetrieved = await res.json();
  return userHabitsRetrieved;
}
