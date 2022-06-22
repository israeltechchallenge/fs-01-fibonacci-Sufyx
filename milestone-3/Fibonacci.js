/* 
 * ITC Full-Stack Bootcamp
 * Fibonacci assignment
 * 19/06/2022
 * Asaf Gilboa
*/


document.getElementById("getY").addEventListener("click", function(e) {
    const x = document.getElementById("inputX").value;

    if ((isNaN(x)) || (x < 0) || (x != parseInt(x)) || (x > 100)) {
        document.getElementById("result").innerHTML = "Illegal input"
        return;
    }
    const y = fibonacciRecursion(x);
    document.getElementById("result").innerHTML = y;
});


function fibonacciRecursion(x, a = 0, b = 1)
{
    if (x === 0){
        return a;
    }
    if (x === 1){
        return b;
    }
    return fibonacciRecursion(x - 1, b, a + b);
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
