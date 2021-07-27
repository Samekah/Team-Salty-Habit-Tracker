let categoryItems = document.querySelectorAll("[id^='category']");

window.onload = function(){

};

for(let i = 0; i < categoryItems.length; i++){
    
    categoryItems[i].addEventListener("click", ()=>{
    
    }); 
}

async function getAllCategories(){
    try{
        const response = await fetch(`http://localhost:3000/${category}`);
    } catch{

    }
}

/*Todo:
    -[x] find each category button
    -[] get value of category button and store in variable
    -[] hide all category buttons when category selected and show habitd
    -[] Change H1 to say "select a habit and frequency"
    -[] add event listener for submit button
    -[] Send data in variables to be added to database   
    -[] Send back to main page with new item created

*/