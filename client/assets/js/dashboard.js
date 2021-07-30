const baseApiUrl = 'https://habitual-2021.herokuapp.com';
//const baseApiUrl = 'http://localhost:3000';

const usernameInLocalStorage = localStorage.getItem('username');
let logoutButton
function load() {
  console.log('load is seen');
  fetchHabitToDashboard(usernameInLocalStorage);
  renderUsernameToDashboard(usernameInLocalStorage);
  logoutButton = document.getElementById('logout');
  logoutButton.addEventListener('click', () => {
    logout();
  });
}


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

async function fetchHabitToDashboard(uName) {

  // let userID = await fetchUserIDByUsername(uName);
  let data = await fetchUserHabitsByUsername(uName);
  renderHabitToDashboard(data)
}

function renderHabitToDashboard(data) {
  for (let i = 0; i < data.length; i++) {

    let userHabitID = data[i].id;

    let divForHabit = document.createElement('div');
    let h4ForHabitTitle = document.createElement('h4');
    let buttonForHabit = document.createElement('button');
    let paraForHabit = document.createElement('p');
    let spanForPara = document.createElement('span');

    divForHabit.classList.add('habitItem');
    buttonForHabit.id = `updateStreak-${userHabitID}`;
    spanForPara.id = `habitStreak-${userHabitID}`;
    h4ForHabitTitle.textContent = data[i].habit;
    paraForHabit.textContent = 'habit streak is: ';
    
    let currentDate = new Date().toISOString().split('T')[0];
    let historyArr = data[i].history.map((item) => item.split('T')[0]);

    if (historyArr.includes(currentDate)) {
      buttonForHabit.innerHTML = '&check;';
      buttonForHabit.disabled = true;
    } else {
      buttonForHabit.textContent = '+';
      buttonForHabit.disabled = false;
    }

    buttonForHabit.addEventListener('click', streakUpdate);

    let counter = 0;

    if (data[i].history.length === 0) {
      spanForPara.textContent = '0';
    } else if (data[i].history.length === 1 && currentDate == data[i].history[0].split('T')[0]) {
      spanForPara.textContent = '1';
    } else {
      const oneDay = 24 * 60 * 60 * 1000;
      for (let j = 0; j < data[i].history.length; j++) {
        let dateUnformatted1 = data[i].history[j];
        let dateUnformatted2;
        if(j === data[i].history.length - 1) {
          if (historyArr.includes(currentDate)) {
            dateUnformatted2 = new Date(Date.now() + oneDay).toISOString()
          } else {
            dateUnformatted2 = new Date().toISOString()
          }
        } else {
          dateUnformatted2 = data[i].history[j + 1];
        }    
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

    let overallSection = document.querySelector('#habits');

    overallSection.appendChild(h4ForHabitTitle);
    overallSection.appendChild(buttonForHabit);
    overallSection.appendChild(paraForHabit);
    paraForHabit.appendChild(spanForPara);

  }
}

async function streakUpdate(e) {

  let userHabitID = e.target.id.split('-')[1];
  let options = {
    method: 'POST',
    header: { 'Content-Length': 0 },
  };

  let userid = await fetchUserIDByUsername(usernameInLocalStorage);
  let streakData = await fetch(`${baseApiUrl}/user/${userid}/habits/${userHabitID}`, options);
  let { err } = await streakData.json();

  location.reload();

}

async function fetchUserIDByUsername(uName) {
  let response = await fetch(`${baseApiUrl}/user/${uName}`);
  let userID = await response.json();
  return userID;
}

async function fetchUserHabitsByUsername(uName) {
  let userID = await fetchUserIDByUsername(uName);
  let res = await fetch(`${baseApiUrl}/user/${userID}/habits`);
  let userHabitsRetrieved = await res.json();
  return userHabitsRetrieved;
}

try {
  module.exports = {renderUsernameToDashboard, renderHabitToDashboard}
} catch (error) {
 console.log('running in browser') 
} 

