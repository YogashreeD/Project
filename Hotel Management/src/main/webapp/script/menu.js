import { foods } from "../data/food.js";
import { addParcel,displaypackAddOn } from "../data/parcel.js";
import { listparcel } from "./right-sidebar.js";

//global scope of a function
window.addParcel = addParcel;
window.displayParcel =displayParcel;
window.packAddOn = packAddOn;

//displaying all item in cart
displayfood();
export function displayfood(){
    let foodHTML='';
    foods.forEach((food)=>{
        foodHTML+= `
            <div class="menu-container">

                <div class="menu-img">
                    <img class="food-img" src=${food.image}>
                </div>

                <div class="menu-desc">
                    <div class="menu-info">
                        <p class="menu-name">${food.name}</p>
                        <p class="menu-price">&#8377;${food.price}</p>
                        <div class="menu-vnv-desc">
                            <img class="vnv-img" src="Images/Veg-nonveg-img/${food.kind}-img.jpg">
                            <p class="vnv-tag">${food.kind}</p>
                        </div>
                    </div>
                    <div class="menu-pack js-menu-pack-${food.id}">
                        <button class="pack-button js-pack-button"
                        data-food-id=${food.id}>Pack</button>
                    </div>
                    
                </div>
                
            </div>
        `; 
    });
    document.querySelector('.js-menu-grid').innerHTML=foodHTML;
    //display packAddOn 
    displaypackAddOn();
}


//eventlistener for pack button
document.querySelectorAll('.js-pack-button')
    .forEach((button)=>{
        button.addEventListener('click',()=>{
            let id = button.dataset.foodId;
            displayParcel(true);
            packAddOn(id);
            addParcel(id,'plus');
        });
    });

//display right sidebar
export function displayParcel(bool){
    let rslist = document.querySelector('.right-sidebar').classList;
    let blist = document.querySelector('.body').classList;
    let hmlist = document.querySelector('.hotel-menu').classList;
    if(bool){
        rslist.add('right-sidebar-toggle');
        blist.add('body-toggle');
        hmlist.add('hotel-menu-toggle');
        listparcel();
    }
    else{
        rslist.remove('right-sidebar-toggle');
        blist.remove('body-toggle');
        hmlist.remove('hotel-menu-toggle');
    }
        
}

//extra quantity to pack again
export function packOff(id){
    
    let packHTML= `
            <button class="pack-button js-pack-button"
            data-food-id=${id} 
            onclick="
            let id = dataset.foodId;
            window.displayParcel(true);
            window.packAddOn(id);
            window.addParcel(id,'plus');
            ">Pack</button>
        `;
    document.querySelector(`.js-menu-pack-${id}`).innerHTML=packHTML;
}


//Extra quantity
//funcion inside an event should not be in module scope
//convert module scope of a fuction to global scope
function packAddOn(id){
    
    let packHTML= `
        <div class="add-quantity">
            <button class="minus" data-food-id=${id}
            onclick="
            let id = dataset.foodId;
            window.addParcel(id,'minus');">-</button>

            <div class="js-quantity-${id}">1</div>

            <button class="plus js-plus" data-food-id=${id}
            onclick="
            let id = dataset.foodId;
            addParcel(id,'plus');">+</button>
        </div>
        `;
    document.querySelector(`.js-menu-pack-${id}`).innerHTML=packHTML;
}

