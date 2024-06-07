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
const inventory1 = document.getElementById('inv1');
const inventory2 = document.getElementById('inv2');
const inventory3 = document.getElementById('inv3');
const inventory4 = document.getElementById('inv4');
const inventory5 = document.getElementById('inv5');

const secondCard = document.getElementById('second-card');
const thirdCard = document.getElementById('third-card');
const text = document.getElementById('text')

let store = false;
let base = true;
let wasteland = false;
let isFighting = false;
let myWeapon = 'Knife';
let weaponDMG = 0
let myHealth = 100;
let myMoney = 10;
let mobLife = 0;


// ------------------------ Objects and Arrays----------------------------------
const locations = {
    store: 'Store',
    base: 'base',
    wasteLand: 'WasteLand'
}
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
        HLT: 400
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
    let mob = randomMob[Math.floor(Math.random() * randomMob.length )]
    let dmg = 0;
    
    
    const dialog = [`you have encountered a ${mob} what will you do?`, 'you attacked', 'it attacked','it died', 'you died' ]
    text.textContent = dialog[0]
    if(mob === 'goul'){
        dmg = 20
        mobLife = 45
    } else if(mob === 'mirelurk Queen'){
        dmg = 88
        mobLife = 200
    }
    else if(mob === 'rader'){
        dmg = 30
        mobLife = 57
    }
    else if(mob === 'mole rat'){
        dmg = 10
        mobLife = 20
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
    }
    console.log('mob does ' + dmg + " damage")
    console.log('your weapon does ' + weaponDMG + ' damage')

    
   
}
function attacked () {
        if(mobLife > 0){
           mobLife += -weaponDMG; 
        } else {
            text.textContent = `the ${mob} has died. click 'Wasteland' to continue ` 
        }
        console.log(mobLife)
        console.log(weaponDMG)
        
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

//------------------------------------

const fruits = ['apples','bananans','oranges']
const food = {
    fruit: 'apple',
    soup: 'tomato soup',
    dessert: 'cake'
}

let randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
let randomFood = Object.values(food)
let randomfood = randomFood[Math.floor(Math.random() * randomFood.length)]
console.log(randomFruit)
console.log(randomfood)
