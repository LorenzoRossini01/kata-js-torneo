// Arrays
const fighters = [
  { name: "Freezer", power: 8000 },
  { name: "Vegeta", power: 8500 },
  { name: "Crilin", power: 500 },
  { name: "Mr Satan", power: 50 },
  { name: "Junior", power: 6000 },
  { name: "Goku", power: 9001 },
  { name: "Tensing", power: 450 },
  { name: "Videl", power: 300 },
  { name: "Bulma", power: 20 },
  { name: "C-18", power: 7800 },
  { name: "Gohan", power: 8900 },
  { name: "Trunks", power: 1250 },
];

const weapons = [
  { name: "Ventaglio della Musa", power: 15 },
  { name: "Scouter", power: 30 },
  { name: "Bastone Roshi", power: 60 },
  { name: "Fagioli Magici", power: 70 },
  { name: "Katana di Yajirobei", power: 85 },
  { name: "Spada del Dragone Azzurro", power: 115 },
  { name: "Armatura Saiyan", power: 145 },
  { name: "Cannone da braccio", power: 170 },
  { name: "Nuvola d'oro", power: 200 },
  { name: "Bastone Nyoi", power: 220 },
  { name: "Spada Z", power: 235 },
  { name: "Orecchini Potara", power: 250 },
];

const fightersImages = [
  "img/freezer.jpg",
  "img/vegeta.png",
  "img/crilin.webp",
  "img/mrsatan.jpeg",
  "img/piccolo.jpg",
  "img/goku.jpg",
  "img/tensing.webp",
  "img/videl.webp",
  "img/bulma.webp",
  "img/c18.jpg",
  "img/gohan",
  "img/trunks.jpg",
];

weaponsImages = [
  "img/ventagliomusa.webp",
  "img/scouter.webp",
  "img/roshi.webp",
  "img/fagioli.webp",
  "img/katana.webp",
  "img/dragoneazzurro.webp",
  "img/armatura sayan.webp",
  "img/cannone.webp",
  "img/nuvola.webp",
  "img/bastone.webp",
  "img/spadaz.jpg",
  "img/potara.webp",
];

let fightersWithWeapons = [];
let tranedFighters = [];
let filteredTrainedFighters = [];
let winningFighters = [];
let roundWinners = [];
let isTrained = false;
let afterFirstRound = false;
let podiumList = [];

// dom selectors
const startButton = document.getElementById("start-tournament");
const TrainButton = document.getElementById("train-button");
const WeaponButton = document.getElementById("weapon-button");
const nextFightButton = document.getElementById("next-fight");
const nextFightContainer = document.getElementById("next-fight-container");
nextFightContainer.classList.add("hidden");
const TournamentCharacterSection = document.getElementById(
  "tournament-characters"
);
const TournamentWeaponsrSection = document.getElementById("tournament-weapons");
const TournamentBrackets = document.getElementById("tournament-brackets");
const roundWinnersList = document.getElementById("round-winners");
const TournamentBracketsRow = document.querySelector(".tournament-brackets");
const podiumListElement = document.getElementById("podium-list");

console.table(fighters);
console.table(weapons);

// aggiunta immagine all'array
function addImgToArray(array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    array2[i].image = array1[i];
  }

  // console.table(fighters);
}

// stampa card in pagina
function printCard(element, item) {
  if (item.weaponPower) {
    element.innerHTML += `
    <div class="col">
      <div class="img-wrapper bg-light">
        <img src="${item.image}" alt="${item.name}" />
        <div class="img-overlay">
          <h2 class="card-text">${item.name}</h2>
          <div class="card-detail">
            <h2 class="card-text">${item.name}</h2>
            <p><strong>Final Power:</strong> ${item.power}</p>
            <p><strong>Weapon:</strong> ${item.weaponName}</p>
            <p><strong>Weapon Power:</strong> ${item.weaponPower}</p>
          </div>
        </div>
      </div>
    </div>`;
  } else {
    element.innerHTML += `
    <div class="col">
  <div class="img-wrapper bg-light">
  <img src="${item.image}"  alt="${item.name}"/>
  <div class="img-overlay">
  <h2 class="card-text">${item.name}</h2>
  <div class="card-detail">
  <h2 class="card-text">${item.name}</h2>
  <p><strong>Power:</strong> ${item.power}</p>
  </div>
  </div>
  </div>
  </div>`;
  }
}

// milestone 1 scelta dell'arma

function shuffleArray(array) {
  // Ciclo l'array dall'ultimo elemento al primo
  for (let i = array.length - 1; i > 0; i--) {
    //Genero un index random i2
    const i2 = Math.floor(Math.random() * (i + 1));
    // Scambio gli elementi con index i con quelli con index i2
    [array[i], array[i2]] = [array[i2], array[i]];
  }
  // ritorno l'array mescolato
  return array;
}
function ChooseWeapon(weapons, fighters) {
  // funzione per mescolare l'array

  //   mescolo l'array delle weapons
  const shuffledWeapons = shuffleArray(weapons);

  // Assegna le weapon ai fighters
  fightersWithWeapons = fighters.map((fighter, i) => {
    return {
      ...fighter,
      power: fighter.power + shuffledWeapons[i].power,
      weaponIndex: weapons.findIndex(
        (weapon) => weapon.name === shuffledWeapons[i].name
      ),
      weaponName: shuffledWeapons[i].name,
      weaponPower: shuffledWeapons[i].power,
    };
  });

  TournamentCharacterSection.innerHTML = "";
  fightersWithWeapons.forEach((fighter) => {
    printCard(TournamentCharacterSection, fighter);
    // TournamentBracketsSection.;
  });
}

// milestone 2 allenamento fighters
function TrainingFighter() {
  if (fightersWithWeapons.length > 0) {
    tranedFighters = fightersWithWeapons.map((fighter) => ({
      ...fighter,
      power:
        fighter.power +
        fighter.weaponPower * (Math.floor(Math.random() * 100) + 1),
    }));
    if (roundWinners.length > 0) {
      roundWinners = roundWinners.map((fighter) => ({
        ...fighter,
        power:
          fighter.power +
          fighter.weaponPower * (Math.floor(Math.random() * 100) + 1),
      }));
    }
  } else {
    tranedFighters = fighters.map((fighter) => ({
      ...fighter,
      power: fighter.power * Math.floor(Math.random() * 101),
    }));
    if (roundWinners.length > 0) {
      roundWinners = roundWinners.map((fighter) => ({
        ...fighter,
        power:
          fighter.power +
          fighter.weaponPower * (Math.floor(Math.random() * 100) + 1),
      }));
    }
  }

  TournamentCharacterSection.innerHTML = "";
  tranedFighters.forEach((fighter) => {
    printCard(TournamentCharacterSection, fighter);
    // TournamentBracketsSection.;
  });

  isTrained = true;
}

// milestone 3 qualificazione -> filtraggio dei fighters
function FilterFighter() {
  if (isTrained) {
    filteredTrainedFighters = tranedFighters.filter(
      (fighter) => fighter.power >= 10000
    );
  } else {
    filteredTrainedFighters = fighters.filter(
      (fighter) => fighter.power >= 2000
    );
  }
  filteredTrainedFighters = filteredTrainedFighters.map((fighter) => {
    return {
      name: fighter.name,
      power: fighter.power,
      image: fighter.image,
    };
  });
}

// milestone 4 - combattimento -> pg con potenza maggiore vince
function checkFightersNumber(array) {
  if (array.length % 2 !== 0) {
    const fighterBot = {
      name: "Broly",
      power: 4000,
      image: "img/broly.png",

      trainedPower: 4000 * Math.floor(Math.random() * 101),
    };
    array.push(fighterBot);
    // console.table(array);
  }
}
function fight(array) {
  checkFightersNumber(array);

  console.table(array);

  startButton.classList.add("hidden");

  roundWinners = [];
  roundWinnersList.innerHTML = "";
  TournamentBrackets.innerHTML = "";
  while (array.length > 1) {
    let fighter1 = array.shift();
    let fighter2 = array.shift();

    TournamentBrackets.innerHTML += `            
    <li class="col">
      <div class="bg-light text-center d-flex justify-content-center align-items-center gap-3">
        <div class="img-wrapper" id="${fighter1.name}">
          <img src="${fighter1.image}" alt="" class="img-fluid" />
          <div class="img-overlay">
            <h3>${fighter1.name}</h3>
          </div>
        </div>
        <h3>VS</h3>
        <div class="img-wrapper" id="${fighter2.name}">
          <img src="${fighter2.image}" alt="" class="img-fluid" />
          <div class="img-overlay">
            <h3>${fighter2.name}</h3>
          </div>
        </div>
      </div>
    </li>`;

    if (fighter1.power < fighter2.power) {
      console.log(`${fighter2.name} ha vinto contro ${fighter1.name}`);
      let loser = document.getElementById(fighter1.name);
      loser.classList.add("loser");
      roundWinners.push(fighter2);
      podiumList.push(fighter1);
    } else if (fighter1.power > fighter2.power) {
      console.log(`${fighter1.name} ha vinto contro ${fighter2.name}`);
      let loser = document.getElementById(fighter2.name);
      loser.classList.add("loser");
      roundWinners.push(fighter1);
      podiumList.push(fighter2);
    } else {
      console.log(`Pareggio! Nessuno avanza.`);
    }
  }
  roundWinners.forEach((winner) => {
    printCard(roundWinnersList, winner);
  });
  if (array.length === 1) {
    nextFightContainer.classList.add("hidden");
    roundWinners.push(array[0]);
  }

  return roundWinners;
}

// milestone 5 - premiazione -> i combattenti con il livello di forza maggiore arrivano sul podio
function podium(array) {
  array.reverse();
  // console.log(array);
  // array.sort((a, b) => b.trainedPower - a.trainedPower);
  // console.table(array);

  let winner = roundWinners[0];
  let second = array[0];
  let third = array[1];

  if (winner) console.log(`${winner.name} ha vinto il podio! 1`);
  if (second) console.log(`${second.name} ha vinto il podio! 2`);
  if (third) console.log(`${third.name} ha vinto il podio! 3`);

  const podiumElement = document.getElementById("podium");
  podiumElement.classList.remove("hidden");
  printCard(podiumListElement, second);
  printCard(podiumListElement, winner);
  printCard(podiumListElement, third);
}

// #inizio torneo
// aggiunta immagini a fighters e weapons
addImgToArray(fightersImages, fighters);
addImgToArray(weaponsImages, weapons);

// stampa in pagina lista fighters e weapons
fighters.forEach((fighter) => {
  printCard(TournamentCharacterSection, fighter);
});
weapons.forEach((weapon) => {
  printCard(TournamentWeaponsrSection, weapon);
});

function startTournament() {
  console.warn(`======================Fighter List======================`);
  console.table(fighters);

  console.warn(`======================Weapon List======================`);
  console.table(weapons);

  console.warn(`======================Qualification======================`);
  FilterFighter();
  console.table(filteredTrainedFighters);

  let i = 0;
  nextFightContainer.classList.remove("hidden");

  if (filteredTrainedFighters.length > 3) {
    i++;
    console.warn(`======================Round ${i}======================`);
    filteredTrainedFighters = fight(filteredTrainedFighters);
    winningFighters = [...filteredTrainedFighters];
  } else if (filteredTrainedFighters.length > 1) {
    i++;
    nextFightContainer.classList.add("hidden");

    console.warn(`======================Round ${i}======================`);
    filteredTrainedFighters = fight(filteredTrainedFighters);
  } else {
    console.warn(`======================Podium======================`);
    podium(podiumList);
  }
}

startButton.addEventListener("click", function () {
  startTournament();
});

nextFightButton.addEventListener("click", function () {
  if (filteredTrainedFighters.length > 1) {
    nextFightContainer.classList.remove("hidden");

    // Esegui il combattimento
    filteredTrainedFighters = fight(filteredTrainedFighters);
  } else {
    nextFightContainer.classList.add("hidden");
    podium(podiumList);
  }
});
WeaponButton.addEventListener("click", function () {
  console.warn(`======================Getting Weapons======================`);
  ChooseWeapon(weapons, fighters);
  console.table(fightersWithWeapons);
});
TrainButton.addEventListener("click", function () {
  console.warn(`======================Training======================`);
  TrainingFighter();
  console.table(tranedFighters);
});
