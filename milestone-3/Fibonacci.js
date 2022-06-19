/* 
 * ITC Full-Stack Bootcamp
 * Fibonacci assignment
 * 19/06/2022
 * Asaf Gilboa
*/


document.getElementById("getY").addEventListener("click", function(e) {
    document.getElementById("message").innerHTML = "";
    const x = document.getElementById("inputX").value;

    if ((isNaN(x)) || (x < 0) || (x != parseInt(x)) || (x > 30)) {
        document.getElementById("message").innerHTML = "Please enter a whole number between 0 and 30"; 
        return;
    }

    const y = fibonacciRecursion(x);

    document.getElementById("result").innerHTML = y;
});


function fibonacciRecursion(x) { 
    if (x <= 1) {
        return x;
    }
    return (fibonacciRecursion(x-1) + fibonacciRecursion(x-2));
}


function fibonacciOfX(x) {
    if (x <= 1) {
        return x;
    }

    let n1 = 0;
    let n2 = 1;
    let n3;
    for (let i = 2; i <= x; i++) {
        n3 = n1 + n2;
        n1 = n2;
        n2 = n3;
    }
    return n3;
}

//   x=?
let num1 = 0;
let num2 = 1;
let num3;
for (let i = 2; i <= x; i++) {
    num3 = num1 + num2;
    
}