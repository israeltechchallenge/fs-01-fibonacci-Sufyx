/* 
 * ITC Full-Stack Bootcamp
 * Fibonacci assignment
 * 19/06/2022
 * Asaf Gilboa
 */


async function fiboFetch(fiboServer) {

  const response = await fetch(fiboServer);
  if (!response.ok) {
    const err = await response.text();
    throw Error(err);
    // return err;
  }
  const fibo = await response.json();
  return fibo.result;
}

async function fiboServerCall(num) {
  let fiboServer = "http://localhost:5050/fibonacci/";
  fiboServer += num;
  let res = document.getElementById("result");

  fiboFetch(fiboServer).then(data => {
    res.style.display = "initial";
    document.getElementById("loader").classList.add("d-none");

    res.classList.add("fs-4");
    res.classList.remove("text-danger");
    res.innerHTML = (`<u><b>${data}</b></u>`);
    
  }).catch(error => {
    res.style.display = "initial";
    document.getElementById("loader").classList.add("d-none");
    console.log(error);
    res.classList.remove("fs-4");
    res.classList.add("text-danger");
    res.innerHTML = (`Server Error: ${error}`);
  });
}


document.getElementById("getY").addEventListener("click", function (e) {
  document.getElementById("result").style.display = "none";
  document.getElementById("result").innerHTML = '';
  document.getElementById("message").innerHTML = '';
  document.getElementById("inputX").classList.remove("text-danger", "border-danger");

  const x = document.getElementById("inputX").value;

  if ((x > 50) || (x < 1)) {
    document.getElementById("inputX").classList.add("text-danger", "border-danger");
    let message = ( (x > 50) ? "Can't be larger than 50" : "Can't be less than 1");
    document.getElementById("message").innerHTML = message;
  } else {
    // document.getElementById("loader").style.display = "initial";
    document.getElementById("loader").classList.remove("d-none");
    fiboServerCall(x);
  }

});