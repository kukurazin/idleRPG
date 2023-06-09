// import { defaultSettings } from './js/defaulSettings';

// const { strength, intellect, agility, stamina, spirit, freeSkillPoint } =
//   defaultSettings;

let strength = 0;
let intellect = 0;
let agility = 0;
let stamina = 0;
let spirit = 0;
let freeSkillPoint = 0;

let attackPower = 0;
let magicPower = 0;
let critChance = 0;
let critCheck = 0;
let critMultiplier = 1.8;
let dodgeChance = 0;
let dodgeCheck = 0;
let hpRegen = 0;
let hitChance = 0;
let missChance = 0;
let weaponSkill = 1;

let enemyCritChance = 10;
let enemyCritCheck = 0;
let enemyCritMultiplier = 1.5;
let enemyMissChance = 5;
let enemyDodgeChance = 10;
let enemyDodgeCheck = 0;

let exp = 1;
let fullExp = 80;
let expPercent = 0;
let hpPercent = 0;
let enHpPercent = 0;
let playerLevel = 1;

let health = 1;
let damage = 0;
let healthAmount = 1;
let currentEnemy = '';
let enemyList = [
  {
    name: 'Squirrel',
    hp: 45,
    damage: Math.round(Math.random() * 10),
    expForKill: Math.round(Math.random() * 10 + 10),
  },
  {
    name: 'Rat',
    hp: 55,
    damage: Math.round(Math.random() * 10),
    expForKill: Math.round(Math.random() * 10 + 10),
  },
  {
    name: 'Bird',
    hp: 35,
    damage: Math.round(Math.random() * 10),
    expForKill: Math.round(Math.random() * 10 + 10),
  },
];

let enemyName = '';
let enemyHealth = 1;
let enemyDamage = 0;
let enemyHealthAmount = 1;
let killExp = 0;

let warrior = {
  str: 5,
  int: 2,
  agi: 4,
  stam: 7,
  spi: 1,
};

let mage = {
  str: 2,
  int: 5,
  agi: 2,
  stam: 4,
  spi: 4,
};

let str = document.getElementById('str');
str.textContent = strength;

let int = document.getElementById('int');
int.textContent = intellect;

let agi = document.getElementById('agi');
agi.textContent = agility;

let stam = document.getElementById('stam');
stam.textContent = stamina;

let spi = document.getElementById('spi');
spi.textContent = spirit;

const goWar = document.getElementById('warriorChosed');
goWar.addEventListener('click', function () {
  strength = warrior.str;
  intellect = warrior.int;
  agility = warrior.agi;
  stamina = warrior.stam;
  spirit = warrior.spi;

  health = stamina * 10;
  healthAmount = health;

  document.getElementById('chosing').style.display = 'none';
  getEnemy();
});

const goMage = document.getElementById('mageChosed');
goMage.addEventListener('click', function () {
  strength = mage.str;
  intellect = mage.int;
  agility = mage.agi;
  stamina = mage.stam;
  spirit = mage.spi;
  getEnemy();

  document.getElementById('chosing').style.display = 'none';
});

//----------------------------------------------------------------------------------------------------------------------!

function update() {
  str.textContent = strength;
  int.textContent = intellect;
  agi.textContent = agility;
  stam.textContent = stamina;
  spi.textContent = spirit;

  attackPower = strength;
  magicPower = intellect;
  critChance = agility;
  dodgeChance = agility;

  if (health > 1) {
    dodgeCheck = Math.floor(Math.random() * 100);
    enemyDodgeCheck = Math.floor(Math.random() * 100);
  }

  if (dodgeCheck > dodgeChance) {
    enemyCritCheck = Math.floor(Math.random() * 10);

    enemyDamage = enemyDamage + Math.floor(Math.random() * 3);

    if (enemyCritCheck <= enemyCritChance) {
      enemyDamage = Math.floor(enemyDamage * enemyCritMultiplier);
    }

    healthAmount -= enemyDamage;
  }

  if (enemyDodgeCheck > enemyDodgeChance) {
    critCheck = Math.floor(Math.random() * 10);

    damage = attackPower + magicPower + Math.floor(Math.random() * 3);

    if (critCheck <= critChance) {
      damage = Math.floor(damage * critMultiplier);
    }

    enemyHealthAmount -= damage;
  }

  if (enemyHealthAmount < 1) {
    exp += killExp;
    getEnemy();
  }

  if (healthAmount < 1) {
    getEnemy();
  }

  expPercent = Math.round(exp / (fullExp / 100));
  hpPercent = Math.round(healthAmount / (health / 100));
  enHpPercent = Math.round(enemyHealthAmount / (enemyHealth / 100));

  updateFillBarExp(expPercent);
  updateFillBarHp(hpPercent);
  updateFillBarEnHp(enHpPercent);

  if (exp + killExp >= fullExp) {
    exp = exp + killExp - fullExp;
    expPercent = Math.round(exp / (fullExp / 100));
    fullExp *= 1.13;
    fullExp = Math.round(fullExp);
    playerLevel++;
    freeSkillPoint++;
    updateFillBarExp(expPercent);
  }

  document.getElementById('expText').textContent = exp + '/' + fullExp;
  document.getElementById('hpText').textContent = healthAmount + '/' + health;
  document.getElementById('enHpText').textContent =
    enemyHealthAmount + '/' + enemyHealth;
  document.getElementById('expPerc').textContent = expPercent + '%';
  document.getElementById('levelCounter').textContent = playerLevel;
  document.getElementById('crChance').textContent = critChance + '%';
  document.getElementById('crMult').textContent = critMultiplier + 'x';
  document.getElementById('dodgeCh').textContent = dodgeChance + '%';
  document.getElementById('pointsCounter').textContent = freeSkillPoint;
}

setInterval(update, 500);

//----------------------------------------------------------------------------------------------------------------------!

const fillProgressExp = document.getElementById('fill-bar-exp-progress');

function updateFillBarExp(progress) {
  fillProgressExp.style.width = progress + '%';
}

const fillProgressHp = document.getElementById('fill-bar-hp-progress');

function updateFillBarHp(hpProgress) {
  fillProgressHp.style.width = hpProgress + '%';
}

const fillProgressEnHp = document.getElementById('fill-bar-en-hp-progress');

function updateFillBarEnHp(enHpProgress) {
  fillProgressEnHp.style.width = enHpProgress + '%';
}

function getEnemy() {
  currentEnemy = enemyList[Math.floor(Math.random() * 3)];
  enemyName = currentEnemy.name;
  enemyHealth = currentEnemy.hp;
  enemyHealthAmount = enemyHealth;
  killExp = currentEnemy.expForKill;
  enemyDamage = currentEnemy.damage;

  health = stamina * 10;
  healthAmount = health;

  document.getElementById('enemyName').textContent = enemyName;
}

document.getElementById('strUp').addEventListener('click', function () {
  strUpgrade();
});

function strUpgrade() {
  if (freeSkillPoint > 0) {
    strength++;
    freeSkillPoint--;
  }
}

document.getElementById('intUp').addEventListener('click', function () {
  intrUpgrade();
});

function intUpgrade() {
  if (freeSkillPoint > 0) {
    intellect++;
    freeSkillPoint--;
  }
}

document.getElementById('agiUp').addEventListener('click', function () {
  agiUpgrade();
});

function agiUpgrade() {
  if (freeSkillPoint > 0) {
    agility++;
    freeSkillPoint--;
  }
}

document.getElementById('stamUp').addEventListener('click', function () {
  stamUpgrade();
});

function stamUpgrade() {
  if (freeSkillPoint > 0) {
    stamina++;
    freeSkillPoint--;
  }
}

document.getElementById('spiUp').addEventListener('click', function () {
  spiUpgrade();
});

function spiUpgrade() {
  if (freeSkillPoint > 0) {
    spirit++;
    freeSkillPoint--;
  }
}
