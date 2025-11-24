/*Write a program that takes a number and prints whether it is even/odd, 
positive/negative/zero, and whether it is divisible by both 3 and 5.*/

let num=40;

if(num%2==0)
    {
    console.log("Number is even");
    }
else
    {
    console.log("Numberr is odd");
    }
if(num>0)
    {
    console.log("Number is positive");
    }
else if(num<0)
    {
    console.log("Numberr is negative");
    }
else
    {
    console.log("Numberr is zero");
    }
if(num%3==0 && num%5==0)
    {
    console.log("Number is divisible by both 3 and 5");
    }
else
    {
    console.log("Number is not divisible by both 3 and 5");
    }