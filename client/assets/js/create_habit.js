let categoryItems = document.querySelectorAll("[id^='category']");
let selectedHabit;
let habitFrequency;
let startDate = 

window.onload = function(){
    console.log("loaded");
    setup();
};

// for(let i = 0; i < categoryItems.length; i++){
    
//     categoryItems[i].addEventListener("click", ()=>{

//         let categoryTitle =  categoryItems[i].textContent;
     
//     }); 

// }
async function setup(){
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
        if(((buttonLength - 1)/3 && i === buttonLength-1) || buttonLength === 1){
            categoryDiv.class = "col-12 d-flex justify-content-center";
        }
        else if (((buttonLength - 2)/3 && i === buttonLength-3) || buttonLength === 1){
            categoryDiv.class = "col-6 d-flex justify-content-center";
        }
        categoryDiv.class = "col d-flex justify-content-center";
        

        categoryDiv.append(categoryButton);
        sectionToAppend.append(categoryDiv);
    }
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

/*Todo:
    -[x] find each category button
    -[x] get all categories from db
    -[] turn JSOn into array
    -[] for every item pull category name add to button
    -[] hide all category buttons when category selected and show habit
    -[] Change H1 to say "select a habit and frequency"
    -[] add event listener for submit button
    -[] Send data in variables to be added to database   
    -[] Send back to main page with new item created
*/