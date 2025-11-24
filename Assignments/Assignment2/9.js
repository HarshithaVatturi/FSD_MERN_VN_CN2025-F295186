/*Two delivery persons earn ₹300 and ₹500.
Use a ternary operator to print who earns more and by how much.*/

let person1=300;
let person2=500;

let result = person1 > person2? 
`Person 1 earns more :${person1 - person2}` : `Person 2 earns more :${person2 - person1}`;

console.log(result);
