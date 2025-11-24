/*Write a program that prints whether a given bus number goes to Route A
(even) or Route B (odd).*/

/*var busname= 56;
if(busname%2==0)
 {
    console.log(`Route A`)
 }
else
 {
    console.log(`Route B`)
 }*/

function route(bus) 
{
    return bus % 2 === 0 ? "Route A" : "Route B";
}

console.log(route(89));



