'use strict';

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//forEach

// movements.forEach((el, i) => {
//   if (el > 0) {
//     console.log(`You withdrew ${i + 1}: ${el}`);
//   } else {
//     console.log(`You deposited ${i + 1}: ${Math.abs(el)}`);
//   }
// })

//forEach with Maps and sets
//map
// currencies.forEach((value, key, map) => {
//   console.log(value, key);
// })

//set

// const currenciesUnique = new Set(['EUR', 'USD', 'GBP', 'EUR', 'USD', 'USD'])
// console.log(currenciesUnique);
// currenciesUnique.forEach((el) => {
//   console.log(el);
// })
///Slice method
// let arr = ['a', 'b', 'c', 'd', 'e']

// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-1));

//shallow copy
// console.log(arr.slice());

///Splice method
// const fruit = ["Banana", "Orange", "Lemon", "Apple", "Mango"]
// fruit.splice(1, 0, 'Strawberry')
// console.log(fruit);

// arr.splice(-1)
// console.log(arr);

//Reverse
// console.log(fruit.reverse());
// console.log(fruit);


//CONCAT
// const arr2 = ['j', 'i', 'h', 'g', 'f']
// arr2.reverse()

// const letters = arr.concat(arr2)
// console.log(letters);

//JOIN

// console.log(letters.join(' - '));


///CODING CHALLENGE 1
// const checkDogs = function (juliaDogs, kateDogs) {
//   const juliaArr = juliaDogs.slice(1, -2)
//   const julia_kate = [...juliaArr, ...kateDogs]
//   // console.log(julia_kate);

//   julia_kate.forEach((el, i) => {
//     const age = el > 2 ? 'adult' : 'puppy'
//     console.log(`Dog number ${i + 1}: is an ${age}, and is ${el} years old 🐶`);
//   })


// }

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])

// ***k map method**
// 1ERO = 1.1

// const movementsUSD = movements.map(el => el * 1.1)
// console.log(movementsUSD);

// const bank = movements.map((el, i) => `Movements ${i + 1}: You ${el > 0 ? 'deposite' : 'withdrew'} ${Math.abs(el)}`)
// console.log(bank)

// ***k Filter method**

const deposits = movements.filter(el => {
  return el > 0
})

// console.log(deposits);

const withdrawls = movements.filter(el => {
  return el < 0
})
// console.log(withdrawls);

// ***k reduce method**
const totalBalance = movements.reduce((acc, currentValue) => acc + currentValue, 0)
// console.log(totalBalance);

//find maximum value

const maxNum = movements.reduce((acc, curr) => {
  return acc > curr ? acc : curr
}, movements[0])  //start from the valu of the first index

// console.log(maxNum)

//****CHAINING ALL 3 ARRAY METHODS*****/
const euroToUsd = 1.1;

//PIPELINE
const totalDepositesUSD = movements.filter(mov => mov > 0).map(mov => mov * euroToUsd).reduce((acc, cv) => acc + cv)
// console.log(totalDepositesUSD);


// ****FIND METHOD****

const firstWithdrawal = movements.find(mov => mov < 0)
// console.log(firstWithdrawal);

// ****FIND METHOD****


const check = movements.every(el => el < 0)

// console.log(check);

// ** Some and Every

//***flat and flatmap

const arr = [[1, 2, 3], [4, 5, 6], 7, 8]
// console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8]
// console.log(arrDeep.flat(2));

const arr2 = arrDeep.flatMap(x => [x])

// const accountMovements = accounts.map(acc => acc.movements)
// console.log(accountMovements.flat());

// const total = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov)
// console.log(total);

// var strRe = (n, s) => {
//   let str = '';
//   for (let i = 0; i < n; i++) {
//     str += s
//   }
//   return str
// }
// console.log(strRe(7, 'Saida'))

// const greet = () => 'hello world!'

// console.log(greet());



// console.log(arr2);

// Coding Challenge #2
/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/


// function calcAverageHumanAge(ages) {
//   const humanAge = ages.map(dogAge => {
//     return dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4;
//   })
//   console.log(humanAge);
//   const less18 = humanAge.filter(less => {
//     return less >= 18;
//   })
//   console.log(less18);

//   const avgDogAge = less18.reduce((acc, curr, i, arr) => {
//     return Math.trunc(acc + curr / arr.length)
//   }, 0)
//   console.log(avgDogAge);

// }

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])


// Coding Challenge #3 
/*
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

// const calcAverageHumanAge = ages => ages.map(dAge => dAge <= 2 ? 2 * dAge : 16 + dAge * 4).filter(adult => adult >= 18)
//   .reduce((acc, cv, _, arr) => acc + cv / arr.length, 0)

// // console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// // console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])
// );

// const strReverse = (str) => {
//   return str.split('').reverse().join('')
// }
// console.log(strReverse('saida'));

// function strRe(str) {
//   let revstr = ''

//   for (let i = str.length - 1; i >= 0; i--) {
//     revstr += str[i]
//   }

//   return revstr
// }

// // console.log(strRe('saida'));

// const workDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];
// const returnedValue = workDays.forEach(function (day) {
//   return day;
// });

// console.log('returnedValue: ', returnedValue); // undefined


// ***** SORT METHOD

//strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

//The Compare Function
/*
If the result is negative a is sorted before b.

If the result is positive b is sorted before a.

If the result is 0 no changes are done with the sort order of the two values.
*/

const sormov = movements.sort((a, b) => b - a)

console.log(sormov);

const num = [-700, -230, 1200, 1400]

const sortnum = num.sort((a, b) => a - b)

console.log(sortnum);