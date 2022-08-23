const input = document.getElementById("country")


    fetch("./data.json").then((res) => res.json()).then(data => {
        autocomplete(input, data.countries)
});



function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });


    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}


// VALIDATION


const form = document.querySelector("[data-form]");
const inputs = document.querySelectorAll(".input");



inputs.forEach(input => {
    input.addEventListener("input", () => {
        if(input.validity.valid) {
            input.parentNode.lastChild.textContent = "";
            input.parentNode.lastChild.className = "error";
        }else {
           showError(input);
        }
    })
});

form.addEventListener("submit", (e) => {
    for (let i = 0; i < inputs.length; i++) {
         if(!inputs[i].validity.valid) {
            showError(inputs[i])
            e.preventDefault();
         }
    }
})

function showError(input) {
    if(input.validity.valueMissing) {
        input.parentNode.lastChild.textContent  = "You need to enter the correct input!"
        input.parentNode.lastChild.className = "error active";
    
    }else if(input.validity.typeMismatch) {
        input.parentNode.lastChild.textContent = `Entered value needs to be a/an ${input.name}`
    }
    input.parentNode.lastChild.className = "error active";
}







