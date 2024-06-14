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
let place = true;
let wasteland = false;
let isFighting = false;
let myWeapon = new Weapons('stick', 10, undefined );
let weaponDMG = 0
let myHealth = 100;
let myMoney = 1000;
let mobLife = 100;
let dmg = 0;
let mob;
let mobDrop;

// ------------------------ Objects and Arrays----------------------------------

//------------------------- fucntions and statments------------------------------

function myState () {
   health.textContent = myHealth;
   money.textContent = myMoney;
   weapon.textContent = myWeapon.name;
}
myState ()


// function gameOver() {
//     if(myHealth < 0){
//         myHealth = 0
//         text.textContent =' you died try Again'

//     }
// } 
// gameOver()


// function attacked () {
        
    
//         if(mobLife > 1 && myHealth > 0){
//             myHealth -= + dmg;
//             mobLife += -myWeapon.DMG;
//             if (mobLife < 0) {
//                 mobLife = 0
//             }
//            text.textContent =' the ' + mob + ' has ' + mobLife + ' life'
//            fightingState = true;
           



//         } else if (mobLife < 1 && fightingState === true) {
//             text.textContent = `the ${mob} has died. click 'Wasteland' to continue`;
//             myMoney += mobDrop;
//             fightingState = false
      
//         }
        
        
//         myState ()
// }
function mobList(name, dmg, hlt, drp) {
    this.name = name;
    this.dmg = dmg;
    this.hlt = hlt;
    this.drp = drp;
    
}

function died() {
    fightingState = true
    if (mob.hlt < 1 && fightingState === true) {
        text.textContent = `the ${mob.name} has died. click 'Run' to continue`;
        myMoney += mob.drp;
        fightingState = false;
    }
}

function locations(textCnt, frstBtnCnt, scndBtnCnt, tirdBtnCnt, strState){
    this.textCnt = textCnt;
    this.frstBtnCnt = frstBtnCnt;
    this.scndBtnCnt = scndBtnCnt;
    this.tirdBtnCnt = tirdBtnCnt;
    this.strState = strState;

    this.setBtnTCntandSetstrState = function(){
        locationName.textContent = textCnt;
        firstBtn.textContent = frstBtnCnt;
        secondBtn.textContent = scndBtnCnt;
        thirdBtn.textContent = tirdBtnCnt;
  
        if(this.strState === 'open') {
            secondCard.style.display = "block"; 
        } else secondCard.style.display = "none";
        
    }

    this.combat = function( ){
        const moleRat = new mobList('mole rat', 10, 10, 20);
        const roul = new mobList('Goul', 20, 20, 40);
        const rader = new mobList('rader', 30, 30, 60);
        const mirelurkQueen = new mobList('mirelurk Queen', 200, 200, 400)
        const mobArray = [moleRat,roul,rader,mirelurkQueen]

        let randomMob = mobArray
        mob = randomMob[Math.floor(Math.random() * randomMob.length )]
    
        const dialog = [`you have encountered a ${mob.name} what will you do?`, 'you attacked', 'it attacked','it died', 'you died' ]
        text.textContent = dialog[0]


    }
    this.attack = function(){
        
        if(mob.hlt > 1 && myHealth > 0){
            myHealth -= + mob.dmg;
            mob.hlt += -myWeapon.DMG;
            if (mobLife < 0) {
                mobLife = 0
            }
           text.textContent =' the ' + mob.name + ' has ' + mob.hlt + ' life'
         
           



        } else if (mob.hlt < 1 ) {
            text.textContent = `the ${mob.name} has died. click 'Run' to continue`;
            myMoney += mob.drp;
            this.combat();
        }
        console.log('attack')
        console.log(mob.hlt)
    }
    
    myState()


}
function Weapons(name, DMG, PRC, HLT) {
    this.name = name;
    this.DMG = DMG;
    this.PRC = PRC;
    this.HLT = HLT;
    this.attack = function() {
        mobLife -= this.DMG;
    }
}

const firseBase = new locations('Base','Store','Base','Wasteland','close')
firseBase.setBtnTCntandSetstrState();
const controlBtns = [firstBtn, secondBtn, thirdBtn,];

for(let i = 0; i < controlBtns.length; i++){
    let controlBtn = controlBtns[i]
    controlBtn.addEventListener('click', ()=> {
        if(i === 0){
            const place = new locations('Store','Store','Base','Wasteland','open')
            place.setBtnTCntandSetstrState();
            text.textContent = 'you have entered the Store'
        } else if(i === 1 && secondBtn.textContent !=='Attack' ){
            const place = new locations('Base','Store','Base','Wasteland','close')
            place.setBtnTCntandSetstrState();
            text.textContent = 'you have entered the Base'

        } else if(i === 2){
            const place = new locations('Wasteland','Base','Attack','Run!!!','close')
            place.setBtnTCntandSetstrState();
            place.combat();
            fightingState = true;
        } else if(i === 1 && secondBtn.textContent ==='Attack' ){
            const place = new locations('Base','Store','Base','Wasteland','close')
            place.attack();
            died()
        }
        
    })
}


const shopBtns = [KnifeBtn, BowBtn, SwordBtn, GunBtn, PowerArmerBtn, HealthBtn]

for(let i = 0; i < shopBtns.length; i++) {
    shopBtns[i].addEventListener('click', ()=>{
        if(i === 0  ){
            myWeapon = new Weapons("Knife", 10, 10)
            myWeapon.attack()
            myMoney -= myWeapon.PRC;
            myState ()
        } else if(i === 1){
            myWeapon = new Weapons("Bow", 20, 30)
            myMoney -= myWeapon.PRC;
           myState ()
        } else if(i === 2 ){
            myWeapon = new Weapons("Sword", 30, 40)
            myMoney -= myWeapon.PRC;
            myState () 
        } else if(i === 3 ){
            myWeapon = new Weapons("Gun", 60, 60)
            myMoney -= myWeapon.PRC;
            myState () 
        } else if(i === 4 ){
            myWeapon = new Weapons("Power Armer", 150, 200, 400)
            myMoney -= myWeapon.PRC;
            myState () 
        } else if(i === 5 ){
            myWeapon = new Weapons("Health", undefined, 50, 50)
            myMoney -= myWeapon.PRC;
            myState () 
        }  
    })
} 