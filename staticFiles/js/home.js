document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("compararButton").addEventListener("click", comparar);
    document.getElementById("newAlphabet").addEventListener("click", selectAlphabet);
    document.getElementById("generarLenguajesButton").addEventListener("click", languagesShow);
    document.getElementById("potenciaAlfabetoButton").addEventListener("click", potenciaShow);
    document.getElementById("regexOpt").addEventListener("click", regexShow);
    document.getElementById("submit_alphabet").addEventListener("click", function(event){
        event.preventDefault();
        var input = document.getElementById("usersAlphabet").value;
        ajaxRequest('/create_alphabet/', {inputU:input}, 'alphabetForm', createAlphabet)
        clearDivs();
    })
    document.getElementById("submit_strings").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default form submission
        var string1 = document.getElementById("string1");
        var string2 = document.getElementById("string2");
        clearDivs();
        ajaxRequest('/compare_strings/', {string1: string1.value, string2: string2.value}, 'string_comparisson', compareStrings);
    });
    document.getElementById("submit_lenguajes").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default form submission
        var np = document.getElementById("numPalabras").value;
        var l = document.getElementById("longPalabras").value;
        clearDivs();
        ajaxRequest('/create_lenguaje/', {np: np, l: l}, 'lenguajesForm', createLenguage);
    });

    document.getElementById("submitP").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default form submission
        var n = document.getElementById("n").value;
        clearDivs();
        ajaxRequest('/calculate_power/', {n: n}, 'powerForm', createPower);
    });

    document.getElementById("submitRegex").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default form submission
        var complexN = document.getElementById("regexInput").value;
        clearDivs();
        ajaxRequest('/validateComplex/', {complexN: complexN}, 'regexForm', regex);
    });

    function createAlphabet(data) {
        var input = document.getElementById("usersAlphabet");
        var divE = document.getElementById("alphabet");
        if (divE) {
            divE.innerHTML = ""; // Clear previous content
    
            for (var i = 0; i < data.alphabet.length; i++) {
                var h4 = document.createElement('h4');
                h4.textContent = data.alphabet[i];
                 divE.appendChild(h4);

                 // Add comma if it's not the last letter
                 i < data.alphabet.length-1 && divE.appendChild(document.createTextNode(","));
            }
        } else {
            alert("No such div element with ID 'alphabet'");
        }
        divE.parentNode.style.gridTemplateRows = "1fr";
        changeButton('submit_alphabet', input)
    }
    

    function changeButton(button, input) {
        var button = document.getElementById(button);
        var buttonClassList = button.classList;

        if (buttonClassList.contains("btn-success")) {
            input.value = "";
            input.style.width = "0px";
            input.style.padding = "0px";
            input.placeholder = "";
            setTimeout(function() {
                input.style.background = "#DC3545";
            }, 300);
            input.disabled = true;
            buttonClassList.remove("btn-success");
            buttonClassList.add("btn-danger");
            button.innerHTML = "Limpiar";
        } else {
            input.style.width = "40%";
            input.style.padding = "";
            input.disabled = false;
            input.style.background = "";
            input.placeholder = "Separa por comas o intervalos";
            buttonClassList.remove("btn-danger");
            buttonClassList.add("btn-success");
            button.innerHTML = "OK";
        }
    }

    function ajaxRequest(url, data, csrf, handleResponse) {
        var csrftoken = document.getElementById(csrf).querySelector('[name="csrfmiddlewaretoken"]').value;

        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRFToken', csrftoken);
            },
            success: function(response) {
                handleResponse(response);
            },
            error: function(xhr, status, error) {
                console.error("Error:", status);
                console.error("Error message:", error);
                console.error("Response:", xhr.responseText);
                alert("Error: " + error);
            }
        });
    }

    function regex(data){
        response = data.response;
        divElement = document.getElementById("regexOutput");
        divElement.innerHTML = "";
        if(!response.success){
            var errorDiv = document.createElement('div');
            errorDiv.classList.add('alert');
            errorDiv.classList.add('alert-danger');
            errorDiv.textContent = response.message;
            divElement.appendChild(errorDiv);
        }else{
            var divElement = document.getElementById("regexOutput");
            var spinnerDiv = document.createElement('div');
            spinnerDiv.innerHTML = `<div class="d-flex justify-content-center">
                <button class="btn btn-success" disabled>
                    <span class="spinner-border spinner-border-sm"></span>
                    Loading..
                </button>
            </div>`;
            divElement.appendChild(spinnerDiv);

            setTimeout(function(){
            spinnerDiv.style.display = "none";
            var successDiv = document.createElement('div');
            successDiv.classList.add('alert');
            successDiv.classList.add('alert-success');
            successDiv.classList.add('fade')
            successDiv.classList.add('show')
            successDiv.textContent = response.message;
            divElement.appendChild(successDiv);
            }, 1000);
        }
    }

    function comparar() {
        clearDivs();
        var power = document.getElementById("power");
        var cadenas = document.getElementById("cadenas");
        var home = document.getElementById('home');
        var language = document.getElementById("lenguajeSection");
        var regex = document.getElementById("regexSection");

        language.style.gridTemplateRows = "0fr";
        home.style.gridTemplateRows = "0fr";
        cadenas.style.gridTemplateRows = "1fr";
        power.style.gridTemplateRows = "0fr";
        regex.style.gridTemplateRows = "0fr";
        unhideOption('newAlphabet'); 
    }

    function potenciaShow(){
        clearDivs();
        var power = document.getElementById("power");
        var cadenas = document.getElementById("cadenas");
        var home = document.getElementById('home');
        var language = document.getElementById("lenguajeSection");
        var regex = document.getElementById("regexSection");
        
        language.style.gridTemplateRows = "0fr";
        home.style.gridTemplateRows = "0fr";
        cadenas.style.gridTemplateRows = "0fr";
        power.style.gridTemplateRows = "1fr";
        regex.style.gridTemplateRows = "0fr";
        unhideOption('newAlphabet');
    }

    function regexShow(){
        clearDivs();
        var power = document.getElementById("power");
        var cadenas = document.getElementById("cadenas");
        var home = document.getElementById('home');
        var language = document.getElementById("lenguajeSection");
        var regex = document.getElementById("regexSection");
        
        language.style.gridTemplateRows = "0fr";
        home.style.gridTemplateRows = "0fr";
        cadenas.style.gridTemplateRows = "0fr";
        power.style.gridTemplateRows = "0fr";
        regex.style.gridTemplateRows = "1fr";
        unhideOption('newAlphabet');
    }
    

    function createLenguage(data) {
        response = data.response;
        var divE = document.getElementById('lenguajes');
        divE.innerHTML = "";
    
        if (!response.success) {
            var errorDiv = document.createElement('div');
            errorDiv.classList.add('alert');
            errorDiv.classList.add('alert-danger');
            errorDiv.textContent = response.message;
            divE.appendChild(errorDiv);
        } else {
            var spinnerDiv = document.createElement('div');
            spinnerDiv.innerHTML = `<div class="d-flex justify-content-center">
                <button class="btn btn-success" disabled>
                    <span class="spinner-border spinner-border-sm"></span>
                    Loading..
                </button>
            </div>`;
            divE.appendChild(spinnerDiv);
    
            setTimeout(function(){
                spinnerDiv.style.display = "none";
                var divE1 = document.createElement('div');
                divE1.classList.add('alert');
                divE1.classList.add('alert-warning');
                divE1.innerHTML = "";
    
                var divE2 = document.createElement('div');
                divE2.classList.add('alert');
                divE2.classList.add('alert-info');
                divE2.innerHTML = "";
    
                var divE3 = document.createElement('div');
                divE3.classList.add('alert');
                divE3.classList.add('alert-success');
                divE3.innerHTML = "";
    
                var output1 = "";
                var output2 = "";
                var output3 = "";
    
                output1 += "Lenguaje 1: {" + response.L1.join(", ") + "}";
                output2 += "Lenguaje 2: {" + response.L2.join(", ") + "}";
                if (response.LD) {
                    output3 += "Diferencia: {" + response.LD.join(", ") + "}";
                } else {
                    output3 = "No hay diferencia";
                }
    
                var h41 = document.createElement('h4');
                var h42 = document.createElement('h4');
                var h43 = document.createElement('h4');
                h41.textContent = output1;
                h42.textContent = output2;
                h43.textContent = output3;
    
                // Append h41 to divE1 and h42 to divE2
                divE1.appendChild(h41);
                divE2.appendChild(h42);
                divE3.appendChild(h43);
                divE.appendChild(divE1);
                divE.appendChild(divE2);
                divE.appendChild(divE3);
            }, 1000); // <-- Closing parenthesis moved inside setTimeout
        }
    }
    
    
        function createPower(data) {
            var response = data.response;
            divElement = document.getElementById("powerLanguage");
            divElement.innerHTML = "";
            if(!response.success){
                var errorDiv = document.createElement('div');
                errorDiv.classList.add('alert');
                errorDiv.classList.add('alert-danger');
                errorDiv.textContent = response.message;
                divElement.appendChild(errorDiv);
            }else{
                var spinnerDiv = document.createElement('div');
                spinnerDiv.innerHTML = `<div class="d-flex justify-content-center">
                    <button class="btn btn-success" disabled>
                        <span class="spinner-border spinner-border-sm"></span>
                        Loading..
                    </button>
                </div>`;
                divElement.appendChild(spinnerDiv);
    
            setTimeout(function(){
                spinnerDiv.style.display = "none";
                var errorDiv = document.createElement('div');
                errorDiv.classList.add('alert');
                errorDiv.classList.add('alert-success');
                var output1 =  "Lenguaje generado: {" + response.power.map(item => `(${item})`).join(", ") + "}";
                errorDiv.textContent = output1;
                divElement.appendChild(errorDiv);
            },1000);
            }
        }


    function unhideOption(id) {
        var option = document.getElementById(id);
        if (option) {
            option.style.display = "block";
        }
    }
    

    function hideOption(id) {
        option = document.getElementById(id);
        option.style.display = "none";
    }    

    function selectAlphabet() {
        clearDivs();
        var power = document.getElementById("power");
        var cadenas = document.getElementById("cadenas");
        var home = document.getElementById('home');
        var language = document.getElementById("lenguajeSection");
        var regex = document.getElementById("regexSection");

        language.style.gridTemplateRows = "0fr";
        home.style.gridTemplateRows = "1fr";
        cadenas.style.gridTemplateRows = "0fr";
        power.style.gridTemplateRows = "0fr";
        regex.style.gridTemplateRows = "0fr";
        hideOption('newAlphabet');
    }

    function languagesShow(){
        clearDivs();
        var power = document.getElementById("power");
        var cadenas = document.getElementById("cadenas");
        var home = document.getElementById("home");
        var language = document.getElementById("lenguajeSection");
        var regex = document.getElementById("regexSection");

        power.style.gridTemplateRows = "0fr";
        language.style.gridTemplateRows = "1fr";
        home.style.gridTemplateRows = "0fr";
        cadenas.style.gridTemplateRows = "0fr";
        regex.style.gridTemplateRows = "0fr";
        unhideOption('newAlphabet'); 
    }

    function generateInputs(){
        
    }

    function compareStrings(data) {
        response = data.result;
        if(!response.success){
            var divElement = document.getElementById('comparisson');
            divElement.innerHTML = "";
            var errorDiv = document.createElement('div');
            errorDiv.classList.add('alert');
            errorDiv.classList.add('alert-danger');
            errorDiv.textContent = response.message;
            divElement.appendChild(errorDiv);
        }else{
            var divElement = document.getElementById("comparisson");
            var spinnerDiv = document.createElement('div');
            spinnerDiv.innerHTML = `<div class="d-flex justify-content-center">
                <button class="btn btn-success" disabled>
                    <span class="spinner-border spinner-border-sm"></span>
                    Loading..
                </button>
            </div>`;
            divElement.appendChild(spinnerDiv);

            response = data.result.result;

            setTimeout(function(){

            spinnerDiv.style.display = "none";
            var ul = document.createElement('ul');
            ul.classList.add('list-group');
            ul.classList.add('list-group-flush');
            var li = document.createElement('li');
            li.classList.add('list-group-item');
            li.classList.add('active');
            li.textContent = "La cadena 1 es:";
            ul.appendChild(li);
    
            if (response.sufijoP) {
                var li1 = document.createElement('li');
                li1.classList.add('list-group-item');
                li1.textContent = "Sufijo propio de la cadena 2";
                ul.appendChild(li1);
            }
    
            if (response.sufijoI) {
                var li2 = document.createElement('li');
                li2.classList.add('list-group-item');
                li2.textContent = "Sufijo impropio de la cadena 2";
                ul.appendChild(li2);
            }
    
            if (response.subcadena) {
                var li3 = document.createElement('li');
                li3.classList.add('list-group-item');
                li3.textContent = "Subcadena de la cadena 2";
                ul.appendChild(li3);
            }
    
            if (response.subsecuencia) {
                var li4 = document.createElement('li');
                li4.classList.add('list-group-item');
                li4.textContent = "Subsecuencia de la cadena 2";
                ul.appendChild(li4);
            }
    
            divElement.appendChild(ul);
            }, 1000);
        }
        
    }

    function clearDivs(){
        var divElement = document.getElementById('comparisson');
        divElement.innerHTML = "";
        var divElement = document.getElementById('lenguajes');
        divElement.innerHTML = "";
        var divElement = document.getElementById('powerLanguage');
        divElement.innerHTML = "";
        var divElement = document.getElementById('regexOutput');
        divElement.innerHTML = "";
    }
        
});

