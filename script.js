const fighters = [
  {
    name: "Freezer",
    power: 8000,
  },
  {
    name: "Vegeta",
    power: 8500,
  },
  {
    name: "Crilin",
    power: 500,
  },
  {
    name: "Mr Satan",
    power: 50,
  },
  {
    name: "Junior",
    power: 6000,
  },
  {
    name: "Goku",
    power: 9001,
  },
  {
    name: "Tensing",
    power: 450,
  },
  {
    name: "Videl",
    power: 300,
  },
  {
    name: "Bulma",
    power: 20,
  },
  {
    name: "C-18",
    power: 7800,
  },
  {
    name: "Gohan",
    power: 8900,
  },
  {
    name: "Trunks",
    power: 1250,
  },
];

const weapons = [
  {
    name: "Ventaglio della Musa",
    power: 15,
  },
  {
    name: "Scouter",
    power: 30,
  },
  {
    name: "Bastone Roshi",
    power: 60,
  },
  {
    name: "Fagioli Magici",
    power: 70,
  },
  {
    name: "Katana di Yajirobei",
    power: 85,
  },
  {
    name: "Spada del Dragone Azzurro",
    power: 115,
  },
  {
    name: "Armatura Saiyan",
    power: 145,
  },
  {
    name: "Cannone da braccio",
    power: 170,
  },
  {
    name: "Nuvola d'oro",
    power: 200,
  },
  {
    name: "Bastone Nyoi",
    power: 220,
  },
  {
    name: "Spada Z",
    power: 235,
  },
  {
    name: "Orecchini Potara",
    power: 250,
  },
];

let fightersWithWeapons = [];
let trainedFightersWithWeapons = [];
let filteredTrainedFighters = [];
let winningFighters = [];

console.table(fighters);
console.table(weapons);

// milestone 1 scelta dell'arma
function ChooseWeapon(weapons, fighters) {
  // funzione per mescolare l'array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //   mescolo l'array delle weapons
  const shuffledWeapons = shuffleArray([...weapons]);

  // Assegna le weapon ai fighters
  fightersWithWeapons = fighters.map((fighter, i) => {
    return {
      ...fighter,
      weaponIndex: weapons.findIndex(
        (weapon) => weapon.name === shuffledWeapons[i].name
      ),
      weaponName: shuffledWeapons[i].name,
      weaponPower: shuffledWeapons[i].power,
    };
  });
}

// milestone 2 allenamento fighters
function TrainingFighter() {
  trainedFightersWithWeapons = fightersWithWeapons.map((fighter) => ({
    ...fighter,
    trainedPower:
      (fighter.power + fighter.weaponPower) * Math.floor(Math.random() * 101),
  }));
}

// milestone 3 qualificazione -> filtraggio dei fighters
function FilterFighter() {
  filteredTrainedFighters = trainedFightersWithWeapons.filter(
    (fighter) => fighter.trainedPower >= 10000
  );
  filteredTrainedFighters = filteredTrainedFighters.map((fighter) => {
    return {
      name: fighter.name,
      power: fighter.power,
      trainedPower: fighter.trainedPower,
    };
  });
}

// milestone 4 - combattimento -> pg con potenza maggiore vince
function checkFightersNumber() {
  if (filteredTrainedFighters.length % 2 !== 0) {
    const fighterBot = {
      name: "Broly",
      power: 4000,

      trainedPower: 4000 * Math.floor(Math.random() * 101),
    };
    filteredTrainedFighters.push(fighterBot);
    console.table(filteredTrainedFighters);
  }
}
function fight() {
  checkFightersNumber();
  while (filteredTrainedFighters.length > 1) {
    let fighter1 = filteredTrainedFighters[0];
    let fighter2 = filteredTrainedFighters[1];

    if (fighter1.trainedPower > fighter2.trainedPower) {
      console.log(`${fighter1.name} ha vinto! contro ${fighter2.name}`);
      winningFighters.push(fighter1);
    } else if (fighter1.trainedPower < fighter2.trainedPower) {
      console.log(`${fighter2.name} ha vinto! contro ${fighter1.name}`);
      winningFighters.push(fighter2);
    } else {
      console.log(`Pareggio!`);
    }
    filteredTrainedFighters.splice(0, 2);
  }
}

ChooseWeapon(weapons, fighters);
// console.table(fightersWithWeapons);

TrainingFighter();
// console.table(trainedFightersWithWeapons);

FilterFighter();
console.table(filteredTrainedFighters);

fight();
console.table(winningFighters);
