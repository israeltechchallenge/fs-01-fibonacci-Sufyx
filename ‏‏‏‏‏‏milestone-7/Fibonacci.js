/* 
 * ITC Full-Stack Bootcamp
 * Fibonacci assignment
 * 19/06/2022
 * Asaf Gilboa
 */


const SERVER_URL = "http://localhost:5050/fibonacci/";
resultHistory();


/**
 * Calls the server for the Fibonacci calculation
 *  of the number received as argument
 * @param {Number} num 
 */
async function fiboServerCall(num) {

  let fiboServer = SERVER_URL + num;
  let res = document.getElementById("result");

  fiboFetch(fiboServer).then(data => {
    displayResult(true);
    res.innerHTML = (`<u><b class="fs-4">${data}</b></u>`);
    resultHistory();
  }).catch(error => {
    displayResult(true);
    res.classList.add("text-danger");
    res.classList.remove("fs-4");
    console.log(error);
    res.innerHTML = (`Server ${error}`);
  });
}
async function fiboFetch(fiboServer) {
  const response = await fetch(fiboServer);
  if (!response.ok) {
    const err = await response.text();
    throw Error(err);
  }
  const fibo = await response.json();
  return fibo.result;
}


/**
 * Activates when the calculation button ("is") is clicked.
 * Retrieves the result and displays it. 
 */
document.getElementById("getY").addEventListener("click", function (e) {
  const x = document.getElementById("inputX").value;
  res = document.getElementById("result");
  res.innerHTML = '';

  if ((x > 50) || (x < 1)) {
    document.getElementById("inputX").classList.add("text-danger", "border-danger");
    let message = ((x > 50) ? "Can't be larger than 50" : "Can't be less than 1");
    document.getElementById("message").classList.remove("d-none");
    document.getElementById("message").innerHTML = message;
  } else {
    displayResult(false);
    if (document.getElementById("saveCalcCheck").checked) {
      fiboServerCall(x);
    } else {
      document.getElementById("loader1").classList.add("text-primary");
      setTimeout(function () {
        document.getElementById("loader1").classList.remove("text-primary");
        res.innerHTML = (`<u><b class="fs-4">${localFiboSolve(x)}</b></u>`);
        displayResult(true);
      }, "1000")
    }
  }

});


/**
 * A function to retrieve and display the history of Fibonacci calculations
 * done by the server.
 */
async function resultHistory(selectVal) {

  document.getElementById("loader2").classList.remove("d-none");
  document.getElementById("resultsDisplay").innerHTML = "";

  const response = await fetch("http://localhost:5050/getFibonacciResults");
  const allResults = await response.json();

  // let selectVal = document.getElementById("sortBy").value;
  let sortOrder = "Desc";
  let sortValue = "createdDate";
  if ((selectVal == 1) || (selectVal == 2)) {
    sortValue = "number";
  }
  if ((selectVal == 1) || (selectVal == 3)) {
    sortOrder = "Asc";
  }
  let resultArray = [...sortResults(allResults.results, sortValue, sortOrder)];

  for (let i = 0; i < 5; i++) {
    let current = resultArray[i];
    let lineDate = new Date(current.createdDate);
    lineDate = lineDate.toString();
    lineDate = lineDate.substring(0, lineDate.length - 19);
    let newText = (`The Fibonnaci Of <b>${current.number}</b> is <b>${current.result}</b>.
                    Calculated at: ${lineDate} (Israel Standard Time)`);
    let newLine = document.createElement("span");
    newLine.classList.add("w-a", "border-bottom", "pb-2", "mb-2", "border-secondary", "resultLine");
    newLine.innerHTML = newText;
    document.getElementById("resultsDisplay").appendChild(newLine);
  }

  document.getElementById("loader2").classList.add("d-none");

}


/**
 * Returns the fibonacci number at x.
 * Uses a "tail recursion".
 */
function localFiboSolve(x, a = 0, b = 1) {
  if (x === 0) {
    return a;
  }
  if (x === 1) {
    return b;
  }
  return localFiboSolve(x - 1, b, a + b);
}


/**
 * Receives an Objects array representing the Fibonnaci calculations history,
 * as well as arguments for the criteria and order to sort by.
 * @param {Array [Object]} resultsArray 
 * @param {String} sortVal 
 * @param {String} sortOrder 
 * @returns An array sorted according to parameters specified by arguments
 */
function sortResults(resultsArray, sortVal, sortOrder) {
  let sortedArray = [...resultsArray];

  sortedArray.sort(function (a, b) {
    let sorter = 1;
    if (sortOrder === "Asc") {
      sorter = (sorter * -1);
    }

    if (eval(`a.${sortVal} < b.${sortVal}`)) {
      return sorter;
    } else if (eval(`a.${sortVal} > b.${sortVal}`)) {
      return (sorter * -1);
    } else {
      return 0;
    }
  });

  return sortedArray;
}


function displayResult(show) {
  document.getElementById("result").classList.remove("text-danger");
  if (show) {
    document.getElementById("loader1").classList.add("d-none");
    document.getElementById("result").style.display = "initial";
  } else {
    document.getElementById("loader1").classList.remove("d-none");
    document.getElementById("result").style.display = "none";
  }
  
}


// Event listener for changes in the select element (sort-by)
// document.getElementById("sortBy").addEventListener("change", resultHistory);

// function sortSelect(sortVal) {
//   sortOptions.forEach(option => {
//     option.addEventListener('click', (e) => {
//       console.log(`option: ${option.value} | e: ${e.target.nodeName}`);
//     });
//   });
// }


// Event listener for changes in the input element
document.getElementById("inputX").addEventListener("input", function (e) {
  e.target.classList.remove("text-danger", "border-danger");
  document.getElementById("message").classList.add("d-none");
});
