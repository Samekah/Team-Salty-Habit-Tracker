let categoryItems = document.querySelectorAll("[id^='category']");

for(let i = 0; i < categoryItems.length; i++){
    
    categoryItems[i].addEventListener("click", ()=>{
        let categoryTitle =  categoryItems[i].textContent;
        

        
    }); 
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