
  const mealsRow = document.querySelector("#mealsRow");
  const searchByNameInput = document.querySelector("#searchByNameInput");
  const searchByFirstLetterInput = document.querySelector(
    "#searchByFirstLetterInput"
  );
  const userName = document.querySelector("#name");
  const email = document.querySelector("#email");
  const age = document.querySelector("#age");
  const phone = document.querySelector("#phone");
  const password = document.querySelector("#password");
  const repassword = document.querySelector("#repassword");
  const invalidUserName = document.querySelector("#invalidName");
  const invalidEmail = document.querySelector("#invalidEmail");
  const invalidAge = document.querySelector("#invalidAge");
  const invalidPhone = document.querySelector("#invalidPhone");
  const invalidPassword = document.querySelector("#invalidPassword");
  const invalidRepassword = document.querySelector("#invalidRepassword");
  let count = 0; // a variable to count valid inputs for the contact us

  // Event Listeners
  // Side navigation button
  $("#openBtn").click(function () {
    if ($("#navBarr").width() == "250") {
      $("#openBtn").text("≣");
      $("#content").animate({ marginLeft: "0px" }, "slow");
      $("#navBarr").animate({ width: "0px" });
      $("#navBarr a").animate({ top: "300px" }, 500);
    } else {
      $("#openBtn").text("X");
      $("#sidenavFooter").show();
      $("#navBarr").animate({ width: "250px" }, "slow");
      for (let i = 0; i < 5; i++) {
        $("#navBarr a")
          .eq(i)
          .animate({ top: 0 }, (i + 5) * 100);
      }
      $("#content").animate({ marginLeft: "250px" }, "slow");
    }
  });
  // Side Navigation search tab
  $(".search").click(function () {
    $("#home").hide();
    $("#openBtn").click();
    $("#contact").hide();
    $("#search").show();
    // resseting the search inputs
    searchByNameInput.value = "";
    searchByFirstLetterInput.value = "";
  });
  // Side Navigation categories tab
  $(".categories").click(function () {
    $("#openBtn").click();
    $("#search").hide();
    $("#contact").hide();
    $("#home").show();
    getCategories();
  });
  // Side Navigation area tab
  $(".area").click(function () {
    $("#openBtn").click();
    getArea();
  });
  // Side Navigation ingredients tab
  $(".ingredients").click(function () {
    $("#openBtn").click();
    $("#search").hide();
    $("#contact").hide();
    $("#home").show();
    getIngredients();
  });
  // logo to home screen
  $("#logo").click(function () {
    searchByName([]);
    $("#contact").hide();
  });
  $(".contact").click(function () {
    $("#home").hide();
    $("#openBtn").click();
    $("#search").hide();
    $("#contact").css({
      display: "flex",
      "justify-content": "center",
      "align-items": "center",
      "min-height": "100vh",
      "margin-top": "auto",
    });
    // resseting the form
    userName.value = "";
    email.value = "";
    age.value = "";
    phone.value = "";
    password.value = "";
    repassword.value = "";
    count = 0;
    hideItem(invalidUserName);
    hideItem(invalidEmail);
    hideItem(invalidPhone);
    hideItem(invalidAge);
    hideItem(invalidPassword);
    hideItem(invalidRepassword);
  });
  searchByNameInput.addEventListener("keyup", function (e) {
    // console.log(e.target.value);
    searchByName(e.target.value);
    // e.target.value="";
  });
  searchByFirstLetterInput.addEventListener("keyup", async function (e) {
    await searchByFirstLetter(e.target.value);
    // e.target.value="";
  });

  $(userName).blur(function () {
    validateName();
  });
  $(email).blur(function () {
    validateEmail();
  });
  $(phone).blur(function () {
    validatePhone();
  });
  $(age).blur(function () {
    validateAge();
  });
  $(password).blur(function () {
    validatePassword();
  });
  $(repassword).blur(function () {
    validateRepassword();
  });
  $(document).on("click", ".mealsFig", function (e) {
    getMealFullDetails(e.target.id);
  });
  $(document).on("click", ".categoryFigure", function (e) {
    displayCategories(e.target.parentElement.id);
    // console.log(e.target.id);
    // console.log(e.target);
    // console.log(e.target.parentElement.id);
  });
  $(document).on("click", ".areaMeals", function (e) {
    getAreaMeals(e.target.id);
    console.log(e.target.id);
    console.log(e.target);
  });
  // categoryFigure
  // onclick                             = "getIngredientMeals('${arr[i].strIngredient}')"
  $(document).on("click", ".ingredientMeals", function (e) {
    getIngredientMeals(e.target.id);
    console.log(e.target.id);
    console.log(e.target);
  });
  // Functions
  // UI meals display function
  function displayMeals(mealItem) {
    let cartoona = "";
    for (let i = 0; i < mealItem.length; i++) {
      cartoona += `
        <div class = "col-md-3">
        <figure class = " position-relative overflow-hidden rounded-2 ">
            <img src = "${mealItem[i].strMealThumb}" class=" w-100" alt="${mealItem[i].strMeal}">
            <figcaption id  ="${mealItem[i].idMeal}" class="mealsFig figCap position-absolute d-flex align-items-center text-danger p-5"><h3>${mealItem[i].strMeal}</h3></figcaption>
        </figure>
    </div>
        `;
    }
    mealsRow.innerHTML = cartoona;
  }

  // Search name
  async function searchByName(term) {
    mealsRow.innerHTML = "";
    $("#loading").fadeIn(500);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    response = await response.json();
    $("#home").show();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $("#loading").fadeOut(500);
    $("#contact").hide();
  }

//random meal
  searchByName([]);

  // Search by meal name
  async function searchByFirstLetter(term) {
    mealsRow.innerHTML = ``;
    $("#loading").fadeIn(500);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
    );
    response = await response.json();
    // console.log(displayMeals(response.meals) );
    $("#home").show();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $("#loading").fadeOut(500);
  }

  // get the available categories from the API and prepare them for the UI
  async function getCategories() {
    mealsRow.innerHTML = ``;
    $("#loading").fadeIn(450);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );

    response = await response.json();
    $("#home").show();
    displaCategoryMeals(response.categories);
    $("#loading").fadeOut(450);
  }

  // show the available categories fetched from the API on the UI
  //TODO - how to get all the childern on click get the parent id and pass it to onclick action
  function displaCategoryMeals(mealsItem) {
    let cartoona = "";
    for (let i = 0; i < mealsItem.length; i++) {
      cartoona += `
        <div class = "col-md-3 ">
        <figure  id ="${mealsItem[i].strCategory}" class  = "categoryFigure position-relative overflow-hidden rounded-2 bg-color-black ">
            <img src = "${mealsItem[i].strCategoryThumb}" class="w-100 " alt="${mealsItem[i].strCategory}">
            <figcaption id = "${mealsItem[i].strCategory}" class="figCap position-absolute d-flex align-items-center flex-column  text-black p-2">
            <h3  class="categoryFigure fw-bold ">${mealsItem[i].strCategory}</h3>
            <p class="text-center categoryFigure">${mealsItem[i].strCategoryDescription}</p>
            </figcaption>
        </figure>
    </div>
        `;
    }
    mealsRow.innerHTML = cartoona;
  }

  //  get the clicked category meals from API and send them to the UI
  async function displayCategories(mealsItem) {
    mealsRow.innerHTML = ``;
    $("#loading").fadeIn(500);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealsItem}`
    );
    response = await response.json();
    $("#home").show();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $("#loading").fadeOut(500);
  }

  // list the available areas from the API and prepare them for the UI
  async function getArea() {
    mealsRow.innerHTML = "";
    $("#loading").fadeIn(500);
    let respone = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    respone = await respone.json();
    displayArea(respone.meals);
    $("#loading").fadeOut(500);
  }

  //  show the available areas fetched from the API on the UI
  function displayArea(aeaaMeals) {
    let cartona = "";
    for (let i = 0; i < aeaaMeals.length; i++) {
      cartona += `
        <div  class = "areaMeals col-md-3">
                <div  class="  rounded-2 text-center ">
              <i id="${aeaaMeals[i].strArea}" class = "fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${aeaaMeals[i].strArea}</h3>
                </div>
        </div>
        `;
    }
    mealsRow.innerHTML = cartona;
  }
  //  get the clicked category meals from API and send them to the UI
  async function getAreaMeals(term) {
    mealsRow.innerHTML = ``;
    $("#loading").fadeIn(500);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`
    );
    response = await response.json();
    $("#home").show();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $("#loading").fadeOut(500);
  }

  // list the available ingredients from the API and prepare them for the UI
  async function getIngredients() {
    mealsRow.innerHTML = "";
    $("#loading").fadeIn(500);
    let respone = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    respone = await respone.json();
    console.log(respone.meals);
    displayIngredients(respone.meals);
    $("#loading").fadeOut(500);
  }
  //  show the available ingredients fetched from the API on the UI
  function displayIngredients(arr) {
    let cartona = "";
    for (let i = 0; i < arr.length; i++) {
      cartona += `
        <div class                                  = "col-md-3 ">
        <figure id="${
          arr[i].strIngredient
        }"  class="ingredientMeals position-relative overflow-hidden rounded-2 ">
            <img src = "https://www.themealdb.com/images/ingredients/${
              arr[i].strIngredient
            }.png" class="w-100 " alt="${arr[i].strIngredient}">
            
            <figcaption id= "${
              arr[i].idIngredient
            }" class="figCap position-absolute d-flex align-items-center flex-column  text-black p-2">
            <h3  class="ingredientMeals fw-bold ">${arr[i].strIngredient}</h3>
            <p class="ingredientMeals">
         
            </p>           
            </figcaption>
        </figure>
    </div>
        `;
    }
    mealsRow.innerHTML = cartona;
  }
  // Filter by main ingredient
  async function getIngredientMeals(term) {
    mealsRow.innerHTML = ``;
    $("#loading").fadeIn(500);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`
    );
    response = await response.json();
    $("#home").show();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $("#loading").fadeOut(500);
  }
  // Lookup full meal details by id
  async function getMealFullDetails(id) {
    mealsRow.innerHTML = "";
    $("#loading").fadeIn(500);
    let respone = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    respone = await respone.json();
    displayMealDetails(respone.meals[0]);
    $("#loading").fadeOut(500);
  }
  // UI meals display function
  function displayMealDetails(arr) {
    $("#search").hide();
    let recipe = "";
    for (let i = 1; i <= 20; i++) {
      if (arr[`strIngredient${i}`] != null && arr[`strIngredient${i}`] != "") {
        recipe += `
            <li class                               = "alert alert-info m-2 p-1">${
              arr[`strMeasure${i}`]
            } ${arr[`strIngredient${i}`]}</li>
            `;
      }
    }
    let tags = arr.strTags?.split(",");
    if (!tags) tags = [];
    let tagsStr = "";
    for (let tag in tags) {
      tagsStr += `
        <li class= "alert alert-danger m-2 p-1">${tags[tag]}</li>`;
    }
    mealsRow.innerHTML = `
        <div class = "col-md-4">
        <figure class = " position-relative overflow-hidden rounded-2 ">
            <img src = "${arr.strMealThumb}" class=" w-100" alt="${arr.strMeal}">
            <figcaption  class  = "  d-flex align-items-center p-2"><h3>${arr.strMeal}</h3></figcaption>
        </figure>
    </div>
    <div class= "col-md-8">
        <h2>Instructions</h2>
        <p>${arr.strInstructions}</p>
        <h2><span class = "fw-bolder">Area</span>:${arr.strArea}</h2>
        <h2><span class= "fw-bolder">Category</span>:${arr.strCategory}</h2>
        <h2>Recipe : </h2>
        <ul class = "list-unstyled d-flex g-3 flex-wrap">
        ${recipe}
        </ul>
        <h2>Tags : </h2>
        <ul class = "list-unstyled d-flex g-3 flex-wrap">
        ${tagsStr}
        </ul>
        <a target = "_blank" href="${arr.strSource}" class="btn btn-success">Source</a>
        <a target = "_blank" href="${arr.strYoutube}" class="btn btn-danger">Youtube</a>
</div>
        `;
  }




  function validateName() {
    var regex = /^[a-zA-Z 0-9]{3,}$/gm;
    if (regex.test(userName.value) == true) {
      hideItem(invalidUserName);
      count++;
      return true;
    } else {
      showHiddenItem(invalidUserName);
      count--;
      return false;
    }
  }

  function validateEmail() {
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
    if (regex.test(email.value) == true) {
      hideItem(invalidEmail);
      count++;
      return true;
    } else {
      showHiddenItem(invalidEmail);
      count--;
      return false;
    }
  }

  function validatePhone() {
    var regex = /^01[0125]{1}[0-9]{8}$/gm;
    if (regex.test(phone.value) == true) {
      hideItem(invalidPhone);
      count++;
      return true;
    } else {
      showHiddenItem(invalidPhone);
      count--;
      return false;
    }
  }

  function validateAge() {
    var regex = /^[1-9]{0,1}[0-9]{1}$|100$/gm;
    if (regex.test(age.value) == true) {
      hideItem(invalidAge);
      count++;
      return true;
    } else {
      showHiddenItem(invalidAge);
      count--;
      return false;
    }
  }

  function validatePassword() {
    var regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/g;
    if (regex.test(password.value) == true) {
      hideItem(invalidPassword);
      count++;
      return true;
    } else {
      showHiddenItem(invalidPassword);
      count--;
      return false;
    }
  }

  function validateRepassword() {
    var regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/g;
    if (
      regex.test(repassword.value) == true &&
      repassword.value == password.value
    ) {
      hideItem(invalidRepassword);
      count++;
      validateInputs();
      return true;
    } else {
      showHiddenItem(invalidRepassword);
      return false;
    }
  }
  


  function showHiddenItem(item) {
    item.classList.replace("d-none", "d-block");
  }

  function hideItem(item) {
    item.classList.replace("d-block", "d-none");
  }









