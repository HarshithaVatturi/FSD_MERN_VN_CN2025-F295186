/*A theatre booking system has: totalSeats = 120 and bookedSeats = 
78. Write a program to Calculate available seats, Check if the show is
“Almost Full” if seats < 20, “Moderate Availability” if seats between 20–
60, “Plenty of Seats Available” if seats > 60. Print both the exact number 
of seats left and the status message.*/

let totalSeats = 120;
let bookedSeats = 78;
let availableseats=totalSeats-bookedSeats;
console.log(`The available seats are: ${availableseats}`);

if(availableseats<20)
    {
        console.log(`Almost Full`);
    }
else if (availableseats<20 && availableseats>60)
    {
       console.log(`Moderate availablity`);

    }
else
    {
        console.log(`Plentyy of seats available`);
    }