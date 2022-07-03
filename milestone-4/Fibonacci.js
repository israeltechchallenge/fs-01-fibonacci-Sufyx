/* 
 * ITC Full-Stack Bootcamp
 * Fibonacci assignment
 * 19/06/2022
 * Asaf Gilboa
 */


async function fiboFetch(fiboServer) {
  const response = await fetch(fiboServer);
  const fibo = await response.json();
  return fibo.result;
}

async function fiboServerCall(num) {
  let fiboServer = "http://localhost:5050/fibonacci/";
  fiboServer += num;
  fiboFetch(fiboServer).then(data => {
    document.getElementById("result").innerHTML = (data);
  });
}


document.getElementById("getY").addEventListener("click", function (e) {

  document.getElementById("result").innerHTML = '';
  const x = document.getElementById("inputX").value;

  fiboServerCall(x);

});
