/*Write a program that takes marks (0–100) and prints the grade 
(A/B/C/F). Also take an age input and use a ternary operator to print 
“Adult” or “Minor”.*/

let marks = 49;
if (marks >= 80) {
    console.log("A grade")
}
else if (marks >= 60) {
    console.log("B grade")
}
else if (marks >= 40) {
    console.log("C grade")
}
else {

    console.log("F grade")
}



let age = 21
console.log(age >= 18 ? "Adult" : "Minor");