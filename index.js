const express = require("express");

const app = express();

function getPrimeNumbers(n) {
    let primeNumbers = [1];
    let num = 2;

    while (primeNumbers.length < n) {
        if (isPrime(num)) primeNumbers.push(num);
        num++;
    }

    return {
        "primos": primeNumbers
    }
}

function isPrime(num) {
    for (let i = 2; i < num; i++) {
        if (num % i == 0) return false;
    }
    return true;
}


app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.get("/primos/3", (req, res) => {
    res.send(JSON.stringify(getPrimeNumbers(3)));
});

app.get("/primos/4", (req, res) => {
    res.send(JSON.stringify(getPrimeNumbers(4)));
});

app.get("/primos/5", (req, res) => {
    res.send(JSON.stringify(getPrimeNumbers(5)));
});

app.listen(8080, () => {
    console.log("Acesse http://localhost:8080");
})