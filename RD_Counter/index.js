// Variables for calculations
var cards;
var pickChance;
var pickAmount;
var pickData;

// Variales for Webpage elements
var tableData;
var bodyData;
var valueData;
var rightSideData;


document.addEventListener("DOMContentLoaded", () => {
    // After DOM has loaded, fill variables
    cards = [32,36,36];
    pickAmount = 0;
    pickData = "";

    tableData = document.querySelector("table");
    bodyData = tableData.querySelector("tbody");
    valueField = document.querySelector("input");
    valueData = valueField.value;
    rightSideData = document.querySelector(".right");
    chanceButton = document.querySelector(".chanceButton");

    chanceButton.addEventListener("click", linear);

    console.log(valueData);
});

// Function that uses linear chance for getting a shard
// When converting to web based API, these have to be async
function linear(){
    // Check if a table is already filled, delete it if it does
    setTimeout(removePreviousTable,100);
    // Check if right side is filled with data, delete it if it does
    setTimeout(removeRightSideData, 100);
    // Update the value from the input field
    setTimeout(updateFieldValue, 100);
    // Do calculations and fill the data fields
    setTimeout(linearCalculation, 100);
}
// Function that uses progressive chance for getting a shard
function progressive(){
    // Check if a table is already filled, delete it if it does
    setTimeout(removePreviousTable,100);
    // Check if right side is filled with data, delete it if it does
    setTimeout(removeRightSideData, 100);

    // This one will need input fields for chance raise and chance cap
    // Update the value from the input field
    setTimeout(updateFieldValue, 100);
    // Do calculations and fill the data fields
    setTimeout(progressiveCalculation, 100);
}
//
function removePreviousTable(){
    tableData.querySelector("table");
    bodyData = tableData.querySelector("tbody");

    if (bodyData !== null){
        tableData.removeChild(tableData.querySelector("tbody"));
    }
}
//
function removeRightSideData(){
    let rightData = document.querySelector(".right");
    let dataText = rightData.querySelector("p");
    if (dataText !== null){
        rightData.removeChild(rightData.querySelector("p"));
    } 
}
//
function updateFieldValue(){
    valueField = document.querySelector("input");
    valueData = valueField.value;
    console.log(valueData);
}
//
function linearCalculation(){
    
    let i = 32;
    let cardsLeft;
    let pickFound = false;
    let howManyPicks = 0;

    //Variables for row creation
    var tableHead = document.createElement("tbody");

    if(valueData !== ""){
        pickChance = valueData;
        console.log(valueData);
    }
    else{
        pickChance = 10;
        console.log(pickChance);
    }
    
    // As long as there are cards to choose from, we have to find a shard
    // Lower the amount of cards when ever a pick is found
    // The last card is always a shard

    for(i; i > 0; i--){

        
        var newRow = document.createElement("tr");
        var firstData = document.createElement("td");
        var secondData = document.createElement("td");
        
        firstData.className = "firstElement";
        secondData.className = "secondElement";

        //Variables for the counting
        pickFound = false;
        cardsLeft = i;
        //One round in this loop means one pick
        while (pickFound == false){
            // Raise the amount of picks
            pickAmount++;
            howManyPicks++;
            // This finds a pick when the 5% chance hits or there is only one card left
            if(Math.random()*100+1 <= pickChance || cardsLeft == 1){
                pickFound = true;
            }
            // If a pick was not found, lower the amount of cards remaining on board
            cardsLeft--;
        }

        //Pick has been found, let's do some data
        firstData.textContent = i;
        secondData.textContent = howManyPicks;

        newRow.appendChild(firstData);
        newRow.appendChild(secondData);

        tableHead.appendChild(newRow);

        tableData.appendChild(tableHead);

        //Nullify used picks on one shard

        howManyPicks = 0;

    }

    console.log(pickAmount / 4);

    //At this point we know how many picks were needed, so we can show the data
    let dataText = document.createElement("p");
    dataText.textContent = "To unlock this card " + pickAmount + " picks were required";
    rightSideData.appendChild(dataText);
    //Clean-up

    pickAmount = 0;
    pickData.length = 0;
}

///

function progressiveCalculation(){
    let i = 32;
    let cardsLeft;
    let pickFound = false;
    let howManyPicks = 0;
    // These must be acquired from UI
    let baseChance = chance;
    let chanceRaise = chanceraise;
    let pullCap = cap;

    for(i; i > 0; i--){
        //In the beginning of every loop, set pick chance back to base chance
        pickFound = false;
        cardsLeft = i;
        pickChance = baseChance;
        howManyPicks = 0;
        pickChance = baseChance;

        //One round in this loop means one pick
        while (pickFound == false){
            // Raise the amount of picks
            pickAmount++;
            howManyPicks++;

            if(Math.random()*100+1 <= pickChance || cardsLeft == 1){
                pickFound = true;
            }
            else{
                // If a pick was not found, lower the amount of cards remaining on board and raise chance up to the cap
                cardsLeft--;
                if(pickChance < pullCap){
                    pickChance += chanceRaise;
                    // In case pick chance went over the wanted cap, set chance to the hard cap
                    if(pickChance > pullCap) pickChance = pullCap;
                }
            }
            
        }

        //Pick has been found, let's do some data

        pickData.push(["Remaining:" + i, "Pick to find:" + howManyPicks, "Chance to pick was: " + pickChance]);

    }

    
    console.log(pickData);
    console.log("In total it took " + pickAmount);

    //Clean-up

    pickAmount = 0;
    pickData.length = 0;

}
