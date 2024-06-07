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



function locationss () {
    if(base === true) {
        secondCard.style.display = "none";  
        thirdCard.style.display = "block"; 
        text.textContent = 'you have entered the base'
        firstBtn.textContent = 'Store'
        secondBtn.textContent = 'Base';
        thirdBtn.textContent = 'Wasteland'
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
        firstBtn.textContent = 'Base';
        secondBtn.textContent = 'Attack';
        thirdBtn.textContent = 'Run!!!'
    }
    
}
locationss()



firstBtn.addEventListener('click', () => {
    if(store !== true && firstBtn.textContent === 'Store'){
        store = true;
        base = false;  
        wasteland = false;  
    } else base = true;
    locationss()
})

secondBtn.addEventListener('click', () => {
    if(base !== true){
        store = false;
        base = true; 
        wasteland = false;  
    } 
    locationss()
})

thirdBtn.addEventListener('click', () => {
    if(wasteland !== true){
        store = false;
        base = false
        wasteland = true;  
    } 
    locationss()
})
