//------------------------------ variables ---------------------------------------------
//      stats 
const health = document.getElementById('health');
const money = document.getElementById('money')
const weapon = document.getElementById('weapon')
//      constrols
const locationName = document.getElementById('locationName')
const firstBtn = document.getElementById('firstbtn');
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


console.log()

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
    bow: { 
        DMG:20,
        PRC: 30
    },
    sword:{ 
        DMG:30,
        PRC: 40
    },
    gun:{ 
        DMG:50,
        PRC: 60
    },
    'power armer': {
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
    raders: {
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


function atTheStore () {
    INVname.textContent = 'Store Invetory';
    inventory1.textContent = 'Knife';
    inventory2.textContent = 'Bow'; 
    inventory3.textContent = 'Sword'; 
    inventory4.textContent = 'Gun'; 
    inventory5.textContent = 'Power Armer'; 

    secondCard.style.display = "block";
    thirdCard.style.display = "none";



}
function atTheBase () {
   secondCard.style.display = "none";

}
atTheBase ()