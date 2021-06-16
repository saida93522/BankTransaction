/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



//Application


//Account 1
const displayMovements = function (movements, sort = false) {
    containerMovements.innerHTML = ''

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements
    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `
      <div class="movements__row">
       <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
       <div class="movements__value">${mov} €</div>
      </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html)
    });
}

// displayMovements(account1.movements)

//display current balance
const displayCurrentBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance}€`;
};


//display calc Summary

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, cv) => acc + cv, 0)
    labelSumIn.innerHTML = `${incomes}€`

    const outcome = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
    labelSumOut.innerHTML = `${Math.abs(outcome)}€`

    const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate) / 100).filter((int, i, arr) => {
        // console.log(arr);
        return int >= 1
    }).reduce((acc, int) => acc + int, 0)
    labelSumInterest.innerHTML = `${interest}€`

}



//Creating username
const createUserName = function (accountsArray) { //acounts
    accountsArray.forEach(accElement => { //accElement ===> acount1, account2, .....
        accElement.userName = accElement.owner.toLowerCase().split(' ').map(el => el[0]).join('') //userName is anew object, hold owner initials
    })
}
createUserName(accounts) //pass array that hold all accounts

//Update ui

const updateUI = function (acc) {
    //Display movements
    displayMovements(acc.movements)

    //Display balance

    displayCurrentBalance(acc)

    //Display summary

    calcDisplaySummary(acc)
}

//EVENT HANDLER
let currentAccount;

btnLogin.addEventListener('click', function (e) {
    //prevent form from submitting
    e.preventDefault()

    sorted = false

    currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value)
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) { //ternary operator
        //display UI and welcome message 
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
        containerApp.style.opacity = 100

        //Clear input fields
        inputLoginUsername.value = inputLoginPin.value = ''
        inputLoginPin.blur(); // pin input loses focus

        //Update UI
        updateUI(currentAccount)
    }
})

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);

    const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value) //js, stw...

    inputTransferAmount.value = inputTransferTo.value = ''

    if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.userName !== currentAccount.userName) {
        //doing transfer
        currentAccount.movements.push(-amount)
        receiverAcc.movements.push(+amount)

        //Update UI
        updateUI(currentAccount)
    }

})

btnLoan.addEventListener('click', function (e) {
    e.preventDefault()

    const amount = Number(inputLoanAmount.value)

    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        // Add movements
        currentAccount.movements.push(amount);

        //update ui
        updateUI(currentAccount)
    }
    inputLoanAmount.value = ''

})

let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault()

    displayMovements(currentAccount.movements, !sorted);

    sorted = !sorted;

})

//close account
btnClose.addEventListener('click', function (e) {
    e.preventDefault()

    if (
        inputCloseUsername.value === currentAccount.userName && Number(inputClosePin.value) === currentAccount.pin) {
        const closeacc = accounts.findIndex(acc => acc.userName === currentAccount.userName)
        console.log(closeacc);

        //delete account
        accounts.splice(closeacc, 1)

        //Hide UI
        containerApp.style.opacity = 0
    }

    inputCloseUsername.value = inputClosePin.value = ''

})