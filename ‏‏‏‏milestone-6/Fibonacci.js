/* 
 * ITC Full-Stack Bootcamp
 * Fibonacci assignment
 * 19/06/2022
 * Asaf Gilboa
 */


resultHistory();

async function fiboFetch(fiboServer) {
  const response = await fetch(fiboServer);
  if (!response.ok) {
    const err = await response.text();
    throw Error(err);
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
    document.getElementById("loader1").classList.add("d-none");
    resultHistory();

    res.classList.add("fs-4");
    res.classList.remove("text-danger");
    res.innerHTML = (`<u><b class="fs-4">${data}</b></u>`);

  }).catch(error => {
    res.style.display = "initial";
    document.getElementById("loader1").classList.add("d-none");

    console.log(error);
    res.classList.remove("fs-4");
    res.classList.add("text-danger");
    res.innerHTML = (`Server ${error}`);
  });
}


document.getElementById("getY").addEventListener("click", function (e) {
  document.getElementById("result").style.display = "none";
  document.getElementById("result").innerHTML = '';
  // document.getElementById("inputX").classList.remove("text-danger", "border-danger");

  const x = document.getElementById("inputX").value;


  if ((x > 50) || (x < 1)) {
    document.getElementById("inputX").classList.add("text-danger", "border-danger");
    let message = ((x > 50) ? "Can't be larger than 50" : "Can't be less than 1");
    document.getElementById("message").innerHTML = message;
  } else {
    document.getElementById("loader1").classList.remove("d-none");
    fiboServerCall(x);
  }

});


async function resultHistory() {
  document.getElementById("loader2").classList.remove("d-none");

  const response = await fetch("http://localhost:5050/getFibonacciResults");
  const allResults = await response.json();

  document.getElementById("resultsDisplay").innerHTML = '';
  let resultArray = [...sortResultsByDate(allResults.results)];

  for (let i = 0; i < 5; i++) {
    let current = resultArray[i];
    let lineDate = new Date(current.createdDate);
    lineDate = lineDate.toString();
    lineDate = lineDate.substring(0, lineDate.length - 19);

    let newText = (`The Fibonnaci Of <b>${current.number}</b> is <b>${current.result}</b>.
                    Calculated at: ${lineDate} (Israel Standard Time)`);

    let newLine = document.createElement("span");
    newLine.classList.add("fs-5", "w-a", "border-bottom", "pb-3", "border-secondary");
    newLine.innerHTML = newText;
    document.getElementById("resultsDisplay").appendChild(newLine);
  }

  document.getElementById("loader2").classList.add("d-none");

}

function sortResultsByDate(resultsArray) {
  let sortedArray = [...resultsArray];
  sortedArray.sort(function (a, b) {
    if (a.createdDate < b.createdDate) {
      return 1;
    } else if (a.createdDate > b.createdDate) {
      return -1;
    } else {
      return 0;
    }
  });
  return sortedArray;
}


document.getElementById("inputX").addEventListener("input", function (e) {
  document.getElementById("inputX").classList.remove("text-danger", "border-danger");
  document.getElementById("message").innerHTML = '';
});
