let menuToggle = document.querySelector(".menu-toggle");
let navbarContent = document.querySelector(".navbar-content");

menuToggle.click();

menuToggle.addEventListener("click", (e) =>{
    if(!menuToggle.checked){
        navbarContent.style.animation = "nav-in 150ms ease-in-out 0ms forwards";
    }else{

        navbarContent.style.animation = "nav-out 150ms ease-in-out 0ms forwards";
    }
})