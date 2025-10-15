const express = require("express");

const app = express();

function getPrimeNumbers(n, init = 1, reverse = false) {
    let primeNumbers = [];

    while (primeNumbers.length < n) {
        if (isPrime(init)) primeNumbers.push(init);
        init++;
    }

    if (reverse) {
        return {
            "primos": primeNumbers.reverse()
        }
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

//criando varios endpoints

// app.get("/primos/3", (req, res) => {
//     res.send(JSON.stringify(getPrimeNumbers(3)));
// });

// app.get("/primos/4", (req, res) => {
//     res.send(JSON.stringify(getPrimeNumbers(4)));
// });

// app.get("/primos/5", (req, res) => {
//     res.send(JSON.stringify(getPrimeNumbers(5)));
// });

// usando parametros
app.get("/primos/:num", (req, res) => {
    res.send(JSON.stringify(getPrimeNumbers(req.params.num)));
});

//primos a partir de um numero
app.get("/primos/:num/ini/:init", (req, res) => {
    res.send(JSON.stringify(getPrimeNumbers(req.params.num, req.params.init)));
});

//reverter
app.get("/primos/:num/rev", (req, res) => {
    res.send(JSON.stringify(getPrimeNumbers(req.params.num, true)));
});

//reverter: primos a partir de um numero
app.get("/primos/:num/ini/:init/rev", (req, res) => {
    res.send(JSON.stringify(getPrimeNumbers(req.params.num, req.params.init, true)));
});

app.listen(8080, () => {
    console.log("Acesse http://localhost:8080");
})