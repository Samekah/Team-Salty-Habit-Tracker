let habitHeading = document.querySelector("#instruction");
let frequency = document.querySelector("#dropdown");
let submit = document.querySelector("#submitHabit");

frequency.setAttribute("style", "display:none !important"); 
submit.setAttribute("style", "display:none !important"); 
console.log(frequency)

let selectedHabitId;
let habitFrequency;
let startDate; 

window.onload = function(){
    console.log("loaded");
    setup();
};

async function setup(){
    habitHeading.style.marginLeft ="10px";
    habitHeading.textContent = "category";

    const categoryData = await getAllCategories();
    let sectionToAppend = document.querySelector("#habitForm")

    // console.log(categoryData);
    let buttonLength = categoryData.length;
    
    for(let i = 0; i< buttonLength; i++){
        let categoryButton = document.createElement("button");
        categoryButton.textContent = categoryData[i].category;
        categoryButton.id = `category${i+1}`;
        categoryButton.value = categoryData[i].id;

        let categoryDiv = document.createElement("div");

        console.log((buttonLength - 1)/3);

        if(((buttonLength - 1)/3 === 1 && i === buttonLength-1) || buttonLength === 1){
            console.log("hello")
            categoryDiv.setAttribute("class", "col-12 d-flex justify-content-center")
        }
        else if (((buttonLength - 2)/3  === 1 && i === buttonLength-3) || buttonLength === 2){
            console.log("hello2")
            categoryDiv.setAttribute("class", "col-6 d-flex justify-content-center") ;
        }
        else{
            console.log("skipped ifs");
            categoryDiv.setAttribute("class", "col d-flex justify-content-center");
        }

        categoryDiv.append(categoryButton);
        sectionToAppend.append(categoryDiv);
    }

    let categoryItems = document.querySelectorAll("[id^='category']");
    console.log(categoryItems);
    let allHabitData = await getAllHabits();
    let specificHabitData = [];
   
    for(let i = 0; i < categoryItems.length; i++){
        // console.log("hellooooo");
        categoryItems[i].addEventListener("click", ()=>{
            
            selectedHabitId = categoryItems[i].value;
            console.log(`it is: ${allHabitData}`);
            
            for(const habit of allHabitData){
                if(habit.category_id == selectedHabitId){
                    specificHabitData.push(habit);
                } 
            }
            console.log(specificHabitData);
            habitHeading.textContent = "habit and frequency";
            hideButtons(categoryItems);
           
            buttonLength = specificHabitData.length

            for(let j = 0; j< buttonLength; j++){
                let habitButton = document.createElement("button");
                habitButton.textContent = specificHabitData[j].habit_name;
                habitButton.id = `habit${j+1}`;
                    
                let habitDiv = document.createElement("div");
        
                     
                if(((buttonLength - 1)/3 === 1 && j === buttonLength-1) || buttonLength === 1){
                    console.log("hello")
                    habitDiv.setAttribute("class", "col-12 d-flex justify-content-center")
                }
                else if (((buttonLength - 2)/3  === 1 && j === buttonLength-3) || buttonLength === 2){
                    console.log("hello2")
                    habitDiv.setAttribute("class", "col-6 d-flex justify-content-center") ;
                }
                else{
                    console.log("skipped ifs");
                    habitDiv.setAttribute("class", "col d-flex justify-content-center");
                }
        
                habitDiv.append(habitButton);
                sectionToAppend.append(habitDiv);
            }
            console.log(frequency);
            frequency.setAttribute("style", "display:flex !important"); 
            submit.setAttribute("style", "display:flex !important"); 
        }); 

    }

    let habitItems = document.querySelectorAll("button[id^='habit']");
    console.log(habitItems);

}

async function getAllCategories(){
    console.log("here");
    try{
        const response = await fetch(`http://localhost:3000/category/`);
        const data = await response.json();
        return data;
    } catch(err){
        console.warn(err);
    }

}

async function getAllHabits(id){
    console.log("here we are");
    try{
        const response = await fetch(`http://localhost:3000/habit/`);
        const data = await response.json();
        return data;
    } catch(err){
        console.warn(err);
    }

}

function hideButtons(object){
    for(btn of object){
        btn.style.margin = "0px";
        btn.style.display = "none";
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

/*Todo:
    -[x] find each category button
    -[x] get all categories from db
    -[x] for every item pull category name add to button
    -[x] hide all category buttons when category selected and show habit
    -[x] Change H1 to say "select a habit and frequency"
    -[] add event listener to dropdown
    -[] add event listener for submit button
    -[] Send data in variables to be added to database   
    -[] Send back to main page with new item created
*/