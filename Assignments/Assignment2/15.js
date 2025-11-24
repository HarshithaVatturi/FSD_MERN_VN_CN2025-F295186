/*Given monthly expenses [2000, 1500, 3500, 4000], write a function to 
calculate and print the total money spent.*/

function TExpenses(expenses)
{
    let total = 0;

    for (let i = 0; i < expenses.length; i++) 
    {
        total=total+ expenses[i];
    }

    console.log(`Total money spent: ${total}`);
}

let monthlyExpenses = [2000, 1500, 3500, 4000];
TExpenses(monthlyExpenses);
