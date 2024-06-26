let menuToggle = document.querySelector(".menu-toggle");
let navbarContent = document.querySelector(".navbar-content");

menuToggle.click();

menuToggle.addEventListener("click", (e) => {
    if (!menuToggle.checked) {
        navbarContent.style.animation = "nav-in 150ms ease-in-out 0ms forwards";
    } else {
        navbarContent.style.animation =
            "nav-out 150ms ease-in-out 0ms forwards";
    }
});

function animatePlane() {
    const button = document.querySelector('.submit-button');
    const planeIcon = button.querySelector('.fa-plane');
    planeIcon.classList.add('animated');
  
    const smoke = document.createElement('i');
    smoke.classList.add('smoke');
    button.insertBefore(smoke, planeIcon.nextSibling);
  
    setTimeout(() => {
      smoke.remove();
      planeIcon.classList.remove('animated');
    }, 1000); // Adjust the duration as needed
  }
  
  

const source = document.getElementById("source");
const sourceResults = document.getElementById("source-results");
const destination = document.getElementById("destination");
const destinationResults = document.getElementById("destination-results");

fetch("suggestions.json")
    .then((response) => response.json())
    .then((data) => {
        source.addEventListener("input", () => {
            const searchTerm = source.value.toLowerCase();
            if (searchTerm.length > 0) {
                const matchingKeys = Object.keys(data)
                    .filter((key) => key.toLowerCase().startsWith(searchTerm))
                    .sort((a, b) => a.localeCompare(b));
                sourceResults.innerHTML = "";
                const list = document.createElement("div");
                list.classList.add("result-flex")
                matchingKeys.slice(0, 3).forEach((key) => {
                    const li = document.createElement("li");
                    li.textContent = key;
                    li.addEventListener("click", () => {
                        source.value = key;
                        sourceResults.innerHTML = "";
                    });
                    list.appendChild(li);
                });
                if (matchingKeys.length > 0) {
                    sourceResults.style.display = "block";
                    sourceResults.appendChild(list);
                } else {
                    sourceResults.style.display = "none";
                }
            } else {
                sourceResults.style.display = "none";
            }
        });

        destination.addEventListener("input", () => {
            const searchTerm = destination.value.toLowerCase();
            if (searchTerm.length > 0) {
                const matchingKeys = Object.keys(data)
                    .filter((key) => key.toLowerCase().startsWith(searchTerm))
                    .sort((a, b) => a.localeCompare(b));
                destinationResults.innerHTML = "";
                const list = document.createElement("ul");
                matchingKeys.slice(0, 3).forEach((key) => {
                    const li = document.createElement("li");
                    li.textContent = key;
                    li.addEventListener("click", () => {
                        destination.value = key;
                        destinationResults.style.display = "none";
                    });
                    list.appendChild(li);
                });
                if (matchingKeys.length > 0) {
                    destinationResults.style.display = "block";
                    destinationResults.appendChild(list);
                } else {
                    destinationResults.style.display = "none";
                }
            } else {
                destinationResults.style.display = "none";
            }
        });
    });




let form = document.querySelector(".form-container");
form.addEventListener("submit", (e) =>{
    e.preventDefault(); 

    let src = document.querySelector("#source")
    let dst = document.querySelector("#destination")
    
    async function fetchData() {
        try {
          const query = src.value + "-" + dst.value;  
          const url = "https://aerothon-60-backend-production.up.railway.app/req/"
          const response = await fetch(`${url}${query}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data); 
          window.location.href = "map.html?"+query+"&data="+data
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      }

    fetchData();
})