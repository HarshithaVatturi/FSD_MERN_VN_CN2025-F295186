/*5. Create an array of 5 numbers and print:
o The sum
o The largest number*/


let anew=[1,2,3,4,5];
let sum=0;
for (let i=0;i<anew.length;i++)
{
    sum=sum+anew[i];
}
console.log(`The sum is: ${sum}`);

let largest =anew[0];
for(i=0;i<anew.length;i++)
{
    if(anew[i]>largest)
    {
        largest=anew[i];
    }
}
console.log(`This is the largest number: ${largest}`);