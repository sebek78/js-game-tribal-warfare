import { KILLED_IN_BATTLE } from "./constants";

export default function battle(currentPlayer, people) {
  const defPlayer = currentPlayer === 0 ? 1 : 0;
  const peopleCopy = people.map(p => Object.assign({}, p));
  let attackers = peopleCopy.filter(person => person.owner === currentPlayer);
  let defenders = peopleCopy.filter(person => person.owner === defPlayer);

  // shooting phase
  attackers.forEach(att => {
    const defendersLeft = defenders.reduce((prevValue, def) => {
      if (def.owner !== KILLED_IN_BATTLE) return (prevValue += 1);
      else return prevValue;
    }, 0);
    if (att.rangeWeapon !== null && defendersLeft > 0) {
      const shot = d10();
      if (shot <= att.rangeWeapon.value) {
        let killed = null;
        while (killed === null) {
          let id = randomHit(defenders.length);
          if (defenders[id].owner !== KILLED_IN_BATTLE) killed = id;
        }
        defenders[killed].owner = KILLED_IN_BATTLE;
        console.log("AR killed", defenders[killed]);
      }
    }
  });
  defenders.forEach(def => {
    const attackersLeft = attackers.reduce((prevValue, att) => {
      if (att.owner !== KILLED_IN_BATTLE) return (prevValue += 1);
      else return prevValue;
    }, 0);
    if (def.rangeWeapon !== null && attackersLeft > 0) {
      const shot = d10();
      if (shot <= def.rangeWeapon.value) {
        let killed = null;
        while (killed === null) {
          let id = randomHit(attackers.length);
          if (attackers[id].owner !== KILLED_IN_BATTLE) killed = id;
        }
        attackers[killed].owner = KILLED_IN_BATTLE;
        console.log("DR killed", attackers[killed]);
      }
    }
  });

  // melee fight
  let attackers2 = peopleCopy.filter(person => person.owner === currentPlayer);
  let defenders2 = peopleCopy.filter(person => person.owner === defPlayer);
  attackers2.forEach(att => {
    let defendersLeft = defenders2.reduce((prevValue, def) => {
      if (def.owner !== KILLED_IN_BATTLE) return (prevValue += 1);
      else return prevValue;
    }, 0);
    const weaponStr = att.meleeWeapon !== null ? att.meleeWeapon.value : 0;
    const hit = d10();
    if (hit <= att.value + weaponStr && defendersLeft > 0) {
      let oppId = null;
      while (oppId === null) {
        let id = randomHit(defenders2.length);
        if (defenders2[id].owner !== KILLED_IN_BATTLE) oppId = id;
      }
      defenders2[oppId].owner = KILLED_IN_BATTLE;
      console.log("AM killed", defenders2[oppId]);
    }
  });
  defenders2.forEach(def => {
    let attackersLeft = attackers2.reduce((prevValue, att) => {
      if (att.owner !== KILLED_IN_BATTLE) return (prevValue += 1);
      else return prevValue;
    }, 0);
    const weaponStr = def.meleeWeapon !== null ? def.meleeWeapon.value : 0;
    const hit = d10();
    if (hit <= def.value + weaponStr && attackersLeft > 0) {
      let oppId = null;
      while (oppId === null) {
        let id = randomHit(attackers2.length);
        if (attackers2[id].owner !== KILLED_IN_BATTLE) oppId = id;
      }
      attackers2[oppId].owner = KILLED_IN_BATTLE;
      console.log("DM killed", attackers2[oppId]);
    }
  });
  // after battle
  const killedIds = peopleCopy
    .map(person => (person.owner === KILLED_IN_BATTLE ? person.id : null))
    .filter(p => p !== null);
  console.log(killedIds);
  return killedIds;
}

function randomHit(range) {
  return Math.floor(Math.random() * range);
}

function d10() {
  return Math.floor(Math.random() * 10 + 1);
}
