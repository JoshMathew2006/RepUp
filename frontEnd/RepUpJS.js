document.addEventListener("DOMContentLoaded", () => {
    const exercises = {
  "Running":   { unit: "Mile(s)" },
  "Walking":   { unit: "Mile(s)" },
  "Cycling":   { unit: "Mile(s)" },
  "Swimming":  { unit: "Lap(s)" },
  "Jump Rope": { unit: "Single Unders" },
  "Elliptical":{ unit: "Hours" },
  "Aerobics":  { unit: "Hours" }
};

// Step 2: Track the currently selected exercise
let selectedExercise = null;

function selectExercise(button) {
    selectedExercise = button.getAttribute('data-value');
    document.getElementById('dropdown3').textContent = selectedExercise;
  }

  // Grab all dropdown buttons
  const dropdownButtons = document.querySelectorAll("#dropdownCard3 .dropdown-item");

  dropdownButtons.forEach(button => {
    button.addEventListener("click", () => {
      selectExercise(button);
    });
  })

// Step 4: When user clicks "Add Exercise"
const add1 = document.getElementById('add-exercise');
if(add1)
{
  add1.addEventListener('click', function() {
  if (!selectedExercise) {
    alert("Please select an exercise first!");
    return;
  }
  createExerciseInput(selectedExercise);
});

}

// Step 5: Create the amount input and first save button
function createExerciseInput(exercise) {
  const info = exercises[exercise];
  if (!info) return;

  // Clear previous inputs/buttons
  document.getElementById('inputContainer').innerHTML = "";
  document.getElementById('saveInpBtn').innerHTML = "";
  document.getElementById('inputContainer2').innerHTML = "";
  document.getElementById('saveInpBtn2').innerHTML = "";

  // Amount input
  const amountInput = document.createElement('input');
  amountInput.type = 'text';
  amountInput.className = 'inputText1';
  switch(exercise)
  {
    case "Running":
        amountInput.placeholder = "How many miles did you run?";
        break;
    case "Walking":
        amountInput.placeholder = "How many miles did you walk?";
        break;
    case "Cycling":
        amountInput.placeholder = "How many miles did you cycle?";
        break;
    case "Swimming":
        amountInput.placeholder = "How many laps did you swim?";
        break;
    case "Jump Rope":
        amountInput.placeholder = "How many single unders did you complete?";
        break;
    case "Elliptical":
        amountInput.placeholder = "How many hours were you on the elliptical";
        break;
    case "Aerobics":
        amountInput.placeholder = "How many hours did you do aerobics?";
        break;
  }
  document.getElementById('inputContainer').appendChild(amountInput);

  // Save button for amount
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.className = 'cardioSaveBtn';
  document.getElementById('saveInpBtn').appendChild(saveBtn);
  if(saveBtn)
  {
    saveBtn.addEventListener('click', function() {
    if (!amountInput.value) {
      alert("Please enter a value!");
      return;
    }
    goToCaloriesStep(exercise, amountInput.value, info.unit);
  });

  }
}

// Step 6: Create calorie input and save button
function goToCaloriesStep(exercise, amount, unit) {
  const container = document.getElementById('inputContainer2');
  const btnContainer = document.getElementById('saveInpBtn2');

  container.innerHTML = "";
  btnContainer.innerHTML = "";

  const calInput = document.createElement('input');
  calInput.type = 'text';
  calInput.className = 'inputText2';
  calInput.placeholder = "How many calories did you burn?";
  container.appendChild(calInput);

  const saveBtn2 = document.createElement('button');
  saveBtn2.textContent = 'Save';
  saveBtn2.className = 'cardioSaveBtn';
  btnContainer.appendChild(saveBtn2);

  saveBtn2.addEventListener('click', function() {
    if (!calInput.value) {
      alert("Please enter calories burned!");
      return;
    }
    addExerciseToList(exercise, amount, unit, calInput.value);
  });
}

// Step 7: Add exercise to list and prevent duplicates
function addExerciseToList(exercise, amount, unit, calories) {
  const list = document.getElementById('cardio-list');

  // Check for duplicates
  for (let item of list.children) {
    if (item.dataset.exercise === exercise) {
      alert("You've already added this exercise!");
      return;
    }
  }

  const li = document.createElement('li');
  li.dataset.exercise = exercise;
  li.textContent = `${exercise}: ${amount} ${unit} | Calories Burned: ${calories}`;
  li.className = "cardioListItem"
  list.appendChild(li);

  // Reset inputs
  document.getElementById('inputContainer').innerHTML = "";
  document.getElementById('saveInpBtn').innerHTML = "";
  document.getElementById('inputContainer2').innerHTML = "";
  document.getElementById('saveInpBtn2').innerHTML = "";
}

const register = document.getElementById("reg");

if(register)
{

  register.addEventListener("click" , function(){

  window.location.href = "register.html";
  });

}

const createAcc = document.getElementById("createAcc");
if(createAcc)
{
  createAcc.addEventListener("click" , () => {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {"Content-type": "application/json" },
      body: JSON.stringify({username, password, firstName, lastName})
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        else{
          window.location.href = "setup.html";
        }
        return res.json();
      })
      .then(data => {
        console.log("server response: " , data)
      })
      .catch(error => console.error(error));

  })
  console.log("done");

}

const loginBtn = document.getElementById("loginBtn");

if(loginBtn)
{

  loginBtn.addEventListener("click", () => {
    const username = document.getElementById("usernameInp").value;
    const password = document.getElementById("pwdInp").value;

    fetch("http://localhost:3000/login", { 
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if(data.error)
        {
          alert(data.error);
          
        }
        else if(data.message == "incorrect password")
        {
          alert("invalid credentials");
        }
        else if(data.message === "login successful" && data.token)
        {
          localStorage.setItem("token", data.token);
          window.location.href = "setup.html";
          console.log(localStorage.getItem("token"));
        }
        else
        {
          console.log("no clue what just happened" , data);
        }

      })
  
  });

}

const account = document.getElementById("settings1");

if(account){
  account.addEventListener("click" , () => {
    window.location.href = "profile.html";
  })
}

const updateUsername = document.getElementById("usernameSave")

if(updateUsername)
{
  updateUsername.addEventListener("click" , () => {
    const newUsername = document.getElementById("usernameUpdate").value;
    const token = localStorage.getItem("token");
    if(!newUsername || newUsername.trim() === "")
    {
      alert("please input a valid username");
      return;
    }
    fetch("http://localhost:3000/updateUsername" , {
      method: "PUT",
      headers: {"Content-type": "application/json" , "Authorization": `Bearer ${token}`},
      body: JSON.stringify({newUsername})
    })
      .then(async res => {
      const data = await res.json();
      if (!res.ok) {
      // handle error responses
      alert(data.error || "Update failed");
      throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return data;
      })
      .then(data => {
      console.log("Update successful:", data);
      alert("Username updated successfully!");
      })
      .catch(err => console.error("Fetch error:", err));

  });
    
}

const updatePwd = document.getElementById("pwdSave");

if(updatePwd)
{
  updatePwd.addEventListener("click", () =>{
    const newPwd = document.getElementById("pwdUpdate").value;
    const token = localStorage.getItem("token");
    if(!newPwd || newPwd.trim() === "")
    {
      alert("please input a valid password");
      return;
    }
    fetch("http://localhost:3000/updatePwd" , {
      method: "PUT",
      headers: {"Content-type": "application/json" , "Authorization": `Bearer ${token}`},
      body: JSON.stringify({newPwd})
    })
      .then(async res => {
      const data = await res.json();
      if (!res.ok) {
      // handle error responses
      alert(data.error || "Update failed");
      throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return data;
      })
      .then(data => {
      console.log("Update successful:", data);
      alert("password updated successfully!");
      })
      .catch(err => console.error("Fetch error:", err));

  })
}

const saveSetup = document.getElementById("saveSetup");

if(saveSetup)
{
  saveSetup.addEventListener("click", () => {

    if(document.getElementById("gain").checked)
    {
      const bulking = true;
    }
    else if(document.getElementById("lose").checked)
    {
      const bulking = false;
    }
    const current = document.getElementById("target").value;
    const target = document.getElementById("current").value;
    fetch("http://localhost:3000/setUp", {

      method: "PUT",
      headers: {"Content-type": "application/json" , "Authorization": `Bearer ${token}`},
      body: JSON.stringify({bulking, current, target})
    
    })
    .then

  })
}

}); //ending bracket for the dom content loaded wrapper