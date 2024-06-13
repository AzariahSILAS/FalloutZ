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
let myWeapon = new Weapons('stick', 10, undefined );
let weaponDMG = 0
let myHealth = 100;
let myMoney = 1000;
let mobLife = 0;
let dmg = 0;
let mob;
let mobDrop;

// ------------------------ Objects and Arrays----------------------------------
function allLocations(btn1,btn2,btn3){
    this.btn1 = btn1;
    this.btn2 = btn2;
    this.btn3 = btn3;
}
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
   weapon.textContent = myWeapon.name;
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
    const mobArray = ['goul', 'mirelurk Queen', 'rader', 'mole rat' ,]
    let randomMob = mobArray
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


const shopBtns = [KnifeBtn, BowBtn, SwordBtn, GunBtn, PowerArmerBtn, HealthBtn]

for(let i = 0; i < shopBtns.length; i++) {
    shopBtns[i].addEventListener('click', ()=>{
        if(i === 0  ){
            myWeapon = new Weapons("Knife", 10, 10)
            myMoney -= myWeapon.PRC;
            console.log(myWeapon.DMG)
            myState ()
            console.log(i)
        } else if(i === 1){
            myWeapon = new Weapons("Bow", 20, 30)
            myMoney -= myWeapon.PRC;
           myState ()
           console.log('this') 
        } else if(i === 2 ){
            myWeapon = new Weapons("Sword", 30, 40)
            myMoney -= myWeapon.PRC;
            myState () 
            console.log('worked')
        } else if(i === 3 ){
            myWeapon = new Weapons("Gun", 60, 60)
            myMoney -= myWeapon.PRC;
            myState () 
            console.log('Great')
        } else if(i === 4 ){
            myWeapon = new Weapons("Power Armer", 150, 200, 400)
            myMoney -= myWeapon.PRC;
            myState () 
            console.log(myWeapon.name)
            console.log('damage is '+myWeapon.DMG)
            console.log('price is '+myWeapon.PRC)
            console.log('health is '+myWeapon.HLT)
        } else if(i === 5 ){
            myWeapon = new Weapons("Health", undefined, 50, 50)
            myMoney -= myWeapon.PRC;
            myState () 
            console.log(myWeapon.name)
            console.log('damage is '+myWeapon.DMG)
            console.log('price is '+myWeapon.PRC)
            console.log('health is '+myWeapon.HLT)
        }  
    })
} 
