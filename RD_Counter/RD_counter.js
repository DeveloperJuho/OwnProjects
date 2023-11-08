/*/ Counts picks required to complete Ring Domination in WWE Supercard.
    A card is finished when every shard is found.
    Finding a shard lowers the amount of cards by one.
/*/

var cards = [32,36,36];
var pickChance;
var pickAmount = 0;
var pickData = [];

// Function that uses progressive chance for getting a shard
function progressive(chance=2, chanceraise=2, cap=30){
    let i = cards[0];
    let cardsLeft;
    let pickFound = false;
    let howManyPicks = 0;
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

// Function that uses linear chance for getting a shard
function linear(chance = 10){
    pickChance = chance;
    // Let's do a function for just one card

    let i = cards[0];
    let cardsLeft;
    let pickFound = false;
    let howManyPicks = 0;
    
    //console.log(i);
    // As long as there are cards to choose from, we have to find a shard
    // Lower the amount of cards when ever a pick is found
    // The last card is always a shard

    for(i; i > 0; i--){
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

        pickData.push(["Remaining:" + i, "Pick to find:" + howManyPicks]);

        //Nullify used picks on one shard

        howManyPicks = 0;

    }

    
    console.log(pickData);
    console.log("In total it took: " + pickAmount);

    //Clean-up

    pickAmount = 0;
    pickData.length = 0;
}

linear();

console.log("---------------");

progressive(2,1,10);


