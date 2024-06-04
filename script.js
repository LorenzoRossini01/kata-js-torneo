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

let fightersWithWeapons = [];
let trainedFightersWithWeapons = [];
let filteredTrainedFighters = [];
let winningFighters = [];

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
function checkFightersNumber(array) {
  if (array.length % 2 !== 0) {
    const fighterBot = {
      name: "Broly",
      power: 4000,

      trainedPower: 4000 * Math.floor(Math.random() * 101),
    };
    array.push(fighterBot);
    // console.table(array);
  }
}
function fight(array) {
  checkFightersNumber(array);

  console.table(array);
  let roundWinners = [];

  while (array.length > 1) {
    let fighter1 = array.shift();
    let fighter2 = array.shift();

    if (fighter1.trainedPower > fighter2.trainedPower) {
      console.log(`${fighter1.name} ha vinto contro ${fighter2.name}`);
      roundWinners.push(fighter1);
    } else if (fighter1.trainedPower < fighter2.trainedPower) {
      console.log(`${fighter2.name} ha vinto contro ${fighter1.name}`);
      roundWinners.push(fighter2);
    } else {
      console.log(`Pareggio! Nessuno avanza.`);
    }
  }

  if (array.length === 1) {
    roundWinners.push(array[0]);
  }
  return roundWinners;
}

// milestone 5 - premiazione -> i combattenti con il livello di forza maggiore arrivano sul podio
function podium(array) {
  array.sort((a, b) => b.trainedPower - a.trainedPower);
  console.table(array);

  let winner = array[0];
  let second = array[1];
  let third = array[2];
  if (winner) console.log(`${winner.name} ha vinto il podio! 1`);
  if (second) console.log(`${second.name} ha vinto il podio! 2`);
  if (third) console.log(`${third.name} ha vinto il podio! 3`);
}

function startTournament() {
  console.warn(`======================Fighter List======================`);
  console.table(fighters);

  console.warn(`======================Weapon List======================`);
  console.table(weapons);

  setTimeout(() => {
    console.warn(`======================Getting Weapons======================`);
    ChooseWeapon(weapons, fighters);
    console.table(fightersWithWeapons);

    setTimeout(() => {
      console.warn(`======================Training======================`);
      TrainingFighter();
      console.table(trainedFightersWithWeapons);

      setTimeout(() => {
        console.warn(
          `======================Qualification======================`
        );
        FilterFighter();
        console.table(filteredTrainedFighters);

        let i = 0;
        function nextFightRound() {
          if (filteredTrainedFighters.length > 3) {
            i++;
            console.warn(
              `======================Round ${i}======================`
            );
            filteredTrainedFighters = fight(filteredTrainedFighters);
            winningFighters = [...filteredTrainedFighters];
            setTimeout(nextFightRound, 2000);
          } else if (filteredTrainedFighters.length > 1) {
            i++;
            console.warn(
              `======================Round ${i}======================`
            );
            filteredTrainedFighters = fight(filteredTrainedFighters);
            setTimeout(nextFightRound, 2000);
          } else {
            console.warn(`======================Podium======================`);
            podium(winningFighters);
          }
        }

        nextFightRound();
      }, 1000);
    }, 2000);
  }, 2000);
}

startTournament();
