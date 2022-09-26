//constant to select all sections in the index.html file
const sections = document.querySelectorAll('section');
//constant to get the navigation elsement to fill with elements 
const navigationbar = document.querySelector('#navbar__list');


/*start of creating the dynamic navigation bar*/
//counter to select sections
let i = 1;
//loop of sections
for (section of sections) {
    //element that will be added to the navigation
    const navigationElement = document.createElement('li');
    //element to be used in creating the navigationElement
    const y = "#section" + i;
    //creating the link to sections
    navigationElement.innerHTML = "<a href=\"" + y + "\">" + "Section " + i + "</a>";
    //editing the <a> style
    navigationElement.firstChild.style.cssText = ("all: inherit;");
    //setting the class of the element
    navigationElement.setAttribute("class", "menu__link");
    //adding event listener to the navigation options
    navigationElement.addEventListener("click", function(event) {
        //prevrnting default behaviour of <a>
        event.preventDefault();
        //changing the behaviour to smooth scrolling
        document.querySelector(this.firstChild.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });
    //adding the element we created to the navigation options
    navigationbar.appendChild(navigationElement);
    //increminting the counter
    i++;

}
/*end of creating the dynamic navigation bar*/


/*start adding the active state function*/
window.addEventListener("scroll", () => {
    //A loop through the sections
    for (let j = 0; j < sections.length; j++) {
        let scroll = window.scrollY;
        //calcualting where is the top of the section
        let topOfSection = sections[j].getBoundingClientRect().top + scroll - window.innerHeight;
        //calcualting where is the bottom of the section
        let bottomOfSection = sections[j].getBoundingClientRect().bottom + scroll - window.innerHeight;
        if (scroll <= bottomOfSection && scroll >= topOfSection) {
            //adding active section class
            sections[j].setAttribute('class', 'your-active-class');
            //adding the active state to the navigation elment
            navigationbar.children[j].setAttribute('class', 'active_menu__link');
        } else {
            //removing active section class
            sections[j].classList.remove('your-active-class');
            //removing the active state to the navigation elment
            navigationbar.children[j].setAttribute('class', 'menu__link');
        }
    }
});
/*end of adding the active state function*/


/*start of function that hide the navigationbar when there is no scrolling for 3 seconds */
let x;
window.addEventListener('scroll', function(event) {
    navigationbar.style.display = "block";
    if (typeof x != 'undefined') {
        clearTimeout(x);
    }
    x = setTimeout(function() {
        navigationbar.style.display = "none";
    }, 3000);
});
/*end of function that hide the navigationbar when there is no scrolling for 3 seconds */