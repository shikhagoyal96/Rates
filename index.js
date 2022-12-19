console.log("JAVASCRIPT WORKING");
var newList = ['Loan', 'Finance', 'Debt'];
var hamburgerIcon = document.querySelector(".hamburger");
var login = document.querySelector(".login");
var mainContainer = document.querySelector(".mainContainer");
var menuItem = document.querySelector(".menu-items");
var closeMenu = document.querySelector(".close");

login.addEventListener("click", openLoginJSFeature);
hamburgerIcon.addEventListener("click", openMenu);
closeMenu.addEventListener("click", function () {
    menuItem.style.display = "none";
    hamburgerIcon.style.opacity = '1';
    window.scrollTo(0, 0);

   var newElements = document.querySelectorAll(".item.special");
   for(var i = 0; i < newElements.length; i++) {
       newElements[i].remove();
    }
})

function showMenuItems(){
    hamburgerIcon.style.opacity = '0';
    menuItem.style.display = "block";
}

function openLoginJSFeature() {
    window.scrollTo(0, mainContainer.scrollHeight);

    showMenuItems();

    var newElements = document.querySelectorAll(".item.special");
    console.log(newElements);
    if(newElements.length == 0) {
        for (var i = 0; i < newList.reverse().length; i++) {
            var newElement = document.createElement('li');
            newElement.classList.add('item','special');
            var newContext = document.createTextNode(newList[i]);
            var newLi = newElement.appendChild(newContext);
            menuItem.insertBefore(newElement, menuItem.children[1]);
        }
    }
}

function openMenu(){
    showMenuItems();
}