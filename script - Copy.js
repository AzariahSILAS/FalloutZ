//------------------------------ variables ---------------------------------------------
//      stats 
const health = document.getElementById('health');
const money = document.getElementById('money')
const weapon = document.getElementById('weapon')
//      constrols
const locationName = document.getElementById('locationName')
const firstBtn = document.getElementById('firstBtn');
const secondBtn = document.getElementById('secondBtn');
const thirdBtn = document.getElementById('thirdBtn');
//    inventory
const INVname = document.getElementById('INVname')
const KnifeBtn = document.getElementById('KnifeBtn');
const BowBtn = document.getElementById('BowBtn');
const SwordBtn = document.getElementById('SwordBtn');
const GunBtn = document.getElementById('GunBtn');
const PowerArmerBtn = document.getElementById('PowerArmerBtn');
const HealthBtn = document.getElementById('HealthBtn');



const secondCard = document.getElementById('second-card');
const thirdCard = document.getElementById('third-card');
const text = document.getElementById('text')

let store = false;
let base = true;
let wasteland = false;
let isFighting = false;
let myWeapon = 'Stick';
let weaponDMG = 0
let myHealth = 100;
let myMoney = 10;
let mobLife = 0;
let dmg = 0;
let mob;
let mobDrop;

// ------------------------ Objects and Arrays----------------------------------
// function Weapons(name, DMG, PRC, HLT) {
//     this.name = name;
//     this.DMG = DMG;
//     this.PRC = PRC;
//     this.HLT = HLT;
// }

const weaponsObj ={
    Knife: {
        DMG:10,
        PRC: 10
    }, 
    Bow: { 
        DMG:20,
        PRC: 30
    },
    Sword:{ 
        DMG:30,
        PRC: 40
    },
    Gun:{ 
        DMG:50,
        PRC: 60
    },
    'Power Armer': {
        DMG: 150,
        HLT: 400,
        PRC: 200
    },
    stick:{
        DMG: 5
    },
    Health:{
        PRC: 50
    }
};

const mobsObj = {
    goul:{
        DMG: 20,
        HLT: 45,
        DRP: 45
    },
    rader: {
        DMG: 30,
        HLT: 57,
        DRP: 57
    },
    'mole rat': {
        DMG: 10,
        HLT: 20,
        DRP: 20
    },
    'mirelurk Queen': {
        DMG: 88,
        HLT: 200,
        DRP: 200
    }

};
const state = {
    base: {
        buttons:['Store','Base','Wasteland'],
        text: 'you are in the base'

    },
    store: {
        buttons:['Store','Base','Wasteland'],
        text: 'you are in the store'
    },
    wasteland: {
        buttons:['Base',{explore:['explore','fight'],fight:['attack','run']}],
        text: 'you are in the store'
    }


}
//------------------------- fucntions and statments------------------------------

function myState () {
   health.textContent = myHealth;
   money.textContent = myMoney;
   weapon.textContent = myWeapon;
}
myState ()

function locationss () {
    if(base === true && store === false) {
        secondCard.style.display = "none";  
        thirdCard.style.display = "block"; 
        text.textContent = 'you have entered the base'
        firstBtn.textContent = 'Store'
        secondBtn.textContent = 'Base';
        thirdBtn.textContent = 'Wasteland'
        wasteland = false
    } else if (store === true) {
        secondCard.style.display = "block";
        thirdCard.style.display = "block";
        text.textContent = 'you have entered the store' 
        base = false;
        wasteland = false;
        secondBtn.textContent = 'Base';
        thirdBtn.textContent = 'Wasteland'

    } else if (wasteland === true){
        secondCard.style.display = "none";  
        thirdCard.style.display = "block"; 
        text.textContent = "you've entered the wasteLand !!!"
        base = false;
        store = false; 
        isFighting = true;
        firstBtn.textContent = 'Base';
        secondBtn.textContent = 'Attack';
        thirdBtn.textContent = 'Run!!!'
        Fighting ()
    }
  
    console.log(store)
}
locationss()

function Fighting () {
    
    let randomMob = Object.keys(mobsObj)
    mob = randomMob[Math.floor(Math.random() * randomMob.length )]
    
    const dialog = [`you have encountered a ${mob} what will you do?`, 'you attacked', 'it attacked','it died', 'you died' ]
    text.textContent = dialog[0]
    
    if(mob === 'goul'){
        dmg = 20
        mobLife = 45
        mobDrop = 45

    } else if(mob === 'mirelurk Queen'){
        dmg = 88
        mobLife = 200
        mobDrop = 200
    }
    else if(mob === 'rader'){
        dmg = 30
        mobLife = 57
        mobDrop = 57
    }
    else if(mob === 'mole rat'){
        dmg = 10
        mobLife = 20
        mobDrop = 20
    };

    if(myWeapon === 'Knife'){
        weaponDMG = 10
    } else if (myWeapon === 'Bow') {
        weaponDMG = 20
    } else if (myWeapon === 'Sword') {
        weaponDMG = 30
    } else if (myWeapon === 'Gun') {
        weaponDMG = 50
    } else if (myWeapon === 'Power Armer') {
        weaponDMG = 150
    } else if (myWeapon === 'Stick'){
        weaponDMG = 5 
    }
    // console.log('mob does ' + dmg + " damage")
    // console.log('your weapon does ' + weaponDMG + ' damage')

   
}
let fightingState = true;

function gameOver() {
    if(myHealth < 0){
        myHealth = 0
        text.textContent =' you died try Again'

    }
} 
gameOver()


function attacked () {
        
    
        if(mobLife > 1 && myHealth > 0){
            myHealth -= + dmg;
            mobLife += -weaponDMG;
            if (mobLife < 0) {
                mobLife = 0
            }
           text.textContent =' the ' + mob + ' has ' + mobLife + ' life'
           fightingState = true;
           



        } else if (mobLife < 1 && fightingState === true) {
            text.textContent = `the ${mob} has died. click 'Wasteland' to continue`;
            myMoney += mobDrop;
            fightingState = false
      
        }
        
        console.log('the mob dropssss ' + mobDrop)
        
        myState ()
}





firstBtn.addEventListener('click', () => {
    if(store !== true && firstBtn.textContent === 'Store'){
        store = true;
        base = false;  
        wasteland = false;  
    } else base = true;

    locationss()
})

secondBtn.addEventListener('click', () => {
    if(base !== true && secondBtn.textContent === 'Base'){
        store = false;
        base = true; 
        wasteland = false;  
        locationss()
    } else if (wasteland === true && secondBtn.textContent === 'Attack' ) {
        attacked ()
    }
    
})

thirdBtn.addEventListener('click', () => {
    if(wasteland !== true){
        store = false;
        base = false
        wasteland = true;  
        locationss()
    } 
    
})

//-----------------store items-------------------

function Weapons(name, DMG, PRC, HLT) {
    this.name = name;
    this.DMG = DMG;
    this.PRC = PRC;
    this.HLT = HLT;
}

KnifeBtn.addEventListener('click', () => {
    if(myMoney >= weaponsObj.Knife.PRC ){
        myWeapon = 'Knife'
        myMoney -= weaponsObj.Knife.PRC;
        
    }
    myState ()
})

BowBtn.addEventListener('click', () => {
    if(myMoney >= weaponsObj.Bow.PRC ){
        myWeapon = 'Bow'
        myMoney -= weaponsObj.Bow.PRC;
        
    }
    myState ()
})

SwordBtn.addEventListener('click', () => {
    if(myMoney >= weaponsObj.Sword.PRC ){
        myWeapon = 'Sword'
        myMoney -= weaponsObj.Sword.PRC;
        
    }
    myState ()   
})

GunBtn.addEventListener('click', () => {
    if(myMoney >= weaponsObj.Gun.PRC ){
        myWeapon = 'Gun'
        myMoney -= weaponsObj.Gun.PRC;
        
    }
    myState ()   
})

PowerArmerBtn.addEventListener('click', () => {
    if(myMoney >= weaponsObj["Power Armer"].PRC ){
        myWeapon = 'Power Armer';
        myMoney -= weaponsObj["Power Armer"].PRC;
        myHealth = weaponsObj["Power Armer"].HLT;
        
    }
    myState ()   
})

HealthBtn.addEventListener('click', () => {
    if(myMoney >= weaponsObj.Health.PRC ){
        myHealth += weaponsObj.Health.PRC
        myMoney -= weaponsObj.Health.PRC;
        
    }
    myState ()
})
