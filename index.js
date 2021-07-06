const formElt = document.querySelector('#loto-form');

const __lotoNumbers = () => {
    let arr = [];
    const lotoNumbersElt = document.querySelectorAll('#loto-inputs input[type="number"]');
    for (let i = 0; i < lotoNumbersElt.length; i++) {
        arr.push(lotoNumbersElt[i].value);
    }
    return arr;
};

const __isInputValid = (id) => {
    const inputElt = formElt.querySelector(`#${id}`);
    const errorElt = formElt.querySelector(`#missing-${id}`);
    if (inputElt.value === '') {
        errorElt.classList.remove('d-none');
        return false;
    }
    else if (inputElt.value !== '' && !errorElt.classList.contains('d-none')) {
        errorElt.classList.add('d-none');
    }
    return true;
};

const __isEmailValid = (email) => {
    const errorElt = formElt.querySelector('#wrong-email');
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) == false) {
        errorElt.classList.remove('d-none');
        return false;
    }
    else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) && !errorElt.classList.contains('d-none')) {
        errorElt.classList.add('d-none');
    }
    return true;
}

const __getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const __isLotoValid = (bool, list) => {
    const validElt = formElt.querySelector('#valid-numbers');
    const invalidElt = formElt.querySelector('#invalid-numbers');
    if (bool === true) {
        validElt.classList.remove('d-none');
        if (!invalidElt.classList.contains('d-none')) invalidElt.classList.add('d-none');
    }
    else {
        invalidElt.classList.remove('d-none');
        invalidElt.querySelector('strong').textContent = list.join(', ');
        if (!validElt.classList.contains('d-none')) validElt.classList.add('d-none');
    }
};


const checkLoto = () => {
    formElt.addEventListener('click', (e) => {
        e.preventDefault();
        const email = formElt.querySelector('#email').value;
        const lotoNumbersElt = document.querySelectorAll('#loto-inputs input[type="number"]');
        const lotoNumbers = __lotoNumbers();
        let lotoArr = [];
        let isNumberValid = true;

        __isInputValid('firstname');
        __isInputValid('lastname');
        __isInputValid('email');
        __isEmailValid(email);
        for (let i = 0; i < lotoNumbersElt.length; i++) {
            __isInputValid(`number-${i}`);
            lotoArr.push(__getRandomIntInclusive(1, 10));
            if (isNumberValid === true && lotoArr[i] !== lotoNumbers[i]) {
                isNumberValid = false;
            }
        }
        if (__getRandomIntInclusive(0, 1) === 0) {
            lotoArr = lotoNumbers;
            isNumberValid = true;
        }
        if (lotoNumbers.includes('')) return false;
        __isLotoValid(isNumberValid, lotoArr);
    });
};


document.addEventListener('DOMContentLoaded', () => {
    checkLoto();
});