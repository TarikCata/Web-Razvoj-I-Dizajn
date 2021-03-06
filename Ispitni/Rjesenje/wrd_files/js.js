$.validator.addMethod(
  "regex",
  function (value, element, regexp) {
    var check = false;
    return this.optional(element) || regexp.test(value);
  },
  "Molim vas provjerite vas unos!"
);

var fomrma = $("#forma");

fomrma.validate({
  rules: {
    dostavaIme: {
      required: true,
      regex: /^[A-Z]{1}[a-zA-Z ]+[A-Z]{1}[a-zA-Z]+$/,
    },
    dostavaAdresa: {
      required: true,
      regex: /^[a-zA-Z]+$/,
    },
    dostavaGrad: {
      required: true,
      regex: /^[0-9]{5,}$/,
    },
    //+111-11-111-1111
    dostavaTelefon: {
      required: true,
      regex: /^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/,
    },
    messages: {
      dostavaIme: {
        required: "Ovo polje je obavezno!",
      },
      dostavaAdresa: {
        required: "Ovo polje je obavezno!",
      },
      dostavaGrad: {
        required: "Ovo polje je obavezno!",
      },

      dostavaTelefon: {
        required: "Ovo polje je obavezno!",
      },
    },
  },
});

napraviRedove = (obj) => {
  return `<tr class="glavno">
    <td>${obj.proizvodID}</td>
    <td>${obj.naziv}</td>
    <td>${obj.cijena}</td>
    <td>${obj.jedinicaMjere}</td>
    <td>${obj.likeCounter}</td>
    <td><button onclick="Lajkovi(${obj.proizvodID}})">LIKE</button></td>
    <td><button onclick="Odaberi(${obj.proizvodID})">ODABERI</button></td>
    </tr>`;
};
getPoziv = async () => {
  var urlSvi =
    "https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/GetProizvodiAll";
  try {
    const response = await fetch(urlSvi);
    const data = await response.json();
    refresh();
    for (const i in data) {
      document.querySelector("#tabelaID").innerHTML += napraviRedove(data[i]);
    }
  } catch (error) {
    console.error(error);
  }
};
getPoziv();

refresh = () => {
  $("#tabelaID tbody").empty();
};

Lajkovi = (id, e) => {
  let url =
    "https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Like?proizvodId=" +
    id;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.likeCounter++;
      getPoziv();
    })
    .catch((err) => console.log(err));
};

Odaberi = (id) => {
  document.getElementById("proizvodID").innerHTML = id;
};

postSlanje = (e) => {
  e.preventDefault();
  const data = {
    dostavaGrad: $("#dostavaGrad").val(),
    dostavaAdresa: $("#dostavaAdresa").val(),
    dostavaIme: $("#dostavaIme").val(),
    dostavaTelefon: $("#dostavaTelefon").val(),
    kolicina: $("#kolicina").val(),
  };
  fetch("http://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Dodaj", {
    method: "post",
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status !== 200) {
        console.log("Objekat nije poslan.");
        return;
      }
      res.json().then((data) => {
        console.log(data);
      });
    })
    .catch((err) => console.log(err));
};

napraviRedoveNarudzbe = (obj) => {
  return `<tr class="glavno">
    <td>${obj.proizvodID}</td>
    <td>${obj.naziv}</td>
    <td>${obj.cijena}</td>
    <td>${obj.kolicina}</td>
    <td>${obj.dostavaIme}</td>
    <td>${obj.dostavaAdresa}</td>
    <td>${obj.dostavaTelefon}</td>
    </tr>`;
};

getPozivRedovi = async () => {
  try {
    const res = await fetch(
      "https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/GetNarudzbeAll"
    );
    const data = await res.json();
    for (const i in data) {
      document.querySelector("#narudzbe").innerHTML += napraviRedoveNarudzbe(
        data[i]
      );
    }
  } catch (error) {
    console.error(error);
  }
};
getPozivRedovi();
