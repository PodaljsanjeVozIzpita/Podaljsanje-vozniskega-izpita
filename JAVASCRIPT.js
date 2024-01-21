const u = 0;
document.addEventListener("DOMContentLoaded", function () {

    const users = [
      { email: "maj@gmail.com", password: "123" },
      { email: "admin@gmail.com", password: "123" },
    ];
    const id = 1;
    function validateLogin(email, password) {
      return users.some(user => user.email === email && user.password === password);
    }
    const loginForm = document.getElementById("loginForm");
    const prijavaButton = document.getElementById("prijava");
    const odjavaButton = document.getElementById("odjava");
    const main = document.getElementById("main");
    const driverLicenseForm = document.getElementById("driverLicenseForm");
    const modal = new bootstrap.Modal(document.getElementById("myModal"));
    let gemail = '';

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("geslo");
      const email = emailInput.value;
      gemail = email;
      const password = passwordInput.value;

      if (validateLogin(email, password)) {
        modal.hide();
        prijavaButton.textContent = email;
        prijavaButton.setAttribute("disabled", true);
        odjavaButton.style.display = "block";

        if(email == "maj@gmail.com")
        {
            main.style.visibility = "visible";
            driverLicenseForm.style.visibility = "visible";
            document.getElementById("tadrugi").style.visibility = "visible"
            zahtevaZaPodaljsanje.forEach(item => {
                if (item.mail === email) {
                    const newDiv = document.createElement('div');
                    newDiv.innerHTML = `<img src="${item.slika}" alt="Image"><h2>${item.naslov}</h2>${item.mail}</h2></h2>POTRJEN!</h2>`;
                    document.getElementById("tadrugi").appendChild(newDiv);
                }
            });
        }
        else
        {
            main.style.visibility = "visible";
            driverLicenseForm.style.visibility = "hidden";
            document.getElementById("tadrugi").style.visibility = "hidden"

            zahtevaZaPodaljsanje.forEach(item => {
                const newDiv = document.createElement('div');
                const potrdi = document.createElement('button');
                potrdi.textContent = 'Potrdi';
                potrdi.classList.add('btn', 'btn-primary');
                const zavrni = document.createElement('button');
                zavrni.textContent = 'Zavrni';
                zavrni.classList.add('btn');
                newDiv.id = "div" + id;
                potrdi.id = "potrdi" + id;
                zavrni.id = "zavrni" + id;
                newDiv.innerHTML = `<img src="${item.slika}" alt="Image"><h2>${item.naslov}</h2>${item.mail}</h2>`;
                main.appendChild(newDiv);
                newDiv.appendChild(potrdi);
                newDiv.appendChild(zavrni);

                potrdi.addEventListener("click", function () {
                    item.potrjen = 1;
                    newDiv.style.visibility = "hidden";
                  });

                zavrni.addEventListener("click", function () {
                  item.potrjen = 0;
                  newDiv.style.visibility = "hidden";
                });
            });
        }


        alert("Login successful!");
      } else {
        alert("Invalid email or password. Please try again.");
        emailInput.value = "";
        passwordInput.value = "";
      }
    });

    odjavaButton.addEventListener("click", function () {
      prijavaButton.textContent = "Prijava";
      prijavaButton.removeAttribute("disabled");
      odjavaButton.style.display = "none";
    });

    let zahtevaZaPodaljsanje = [];
    

    const forma = document.getElementById('driverLicenseForm');
    

    forma.addEventListener('submit', function(event) {
        event.preventDefault();
    

        const naslov = document.getElementById('address').value;
        const slika  = document.getElementById('uploadPhoto').value;
    

        if (naslov.trim() === '' || slika.trim() === '') {
            alert('Prosim, izpolnite vsa polja.');
            return;
        }
    
        const podatki = {
            slika: slika,
            naslov: naslov,
            mail:gemail,
            potrjen:0
        };
    
        zahtevaZaPodaljsanje.push(podatki);
    
        document.getElementById('address').value = '';
        document.getElementById('uploadPhoto').value = '';
        document.getElementById('uploadDocument').value = '';

        driverLicenseForm.style.visibility = "hidden";
    
    });

  });

  window.addEventListener('load', function() {
    openPopup();
    function openPopup() {
      if(u == 0)
      {
        document.getElementById('popup').style.display = 'block';
        u = 1;
      }
    }
  });

