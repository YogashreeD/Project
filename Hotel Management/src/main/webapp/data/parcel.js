import { packOff, displayParcel } from "../script/menu.js";

export let parcel = JSON.parse(localStorage.getItem('parcel'))||[
];

//add food to the parcel
export function addParcel(id,sym){
    let match;
    parcel.forEach((list)=>{
        if(list.id === id){
            match=list;
        }
    });
    if(match){
        if(sym==='minus' ){
            match.quantity-=1;
        }
        else
          match.quantity+=1;

        if(match.quantity===0){
            packOff(id);
            removePack(id);
        }
        else{
            document.querySelector(`.js-quantity-${id}`).innerHTML=match.quantity;
        } 
    }
    else{
        parcel.push({
            id,
            quantity:1
        });
        //addingtolocal();
    }
    totalQuantity();
    addingtolocal();
    //console.log(parcel);
}


//total quantity
export function totalQuantity(){
    let totalquan=0;
    parcel.forEach((pack)=>{
        totalquan+=pack.quantity;
    })
    if(totalquan===0){
        displayParcel(false);
    }
    else{
        displayParcel(true);
    }
    //console.log(totalquan);
}

//local storage
export function addingtolocal(){
    localStorage.setItem('parcel',JSON.stringify(parcel));
}

//display addon after refreshing
export function displaypackAddOn(){

    parcel.forEach((pack)=>{
        let packHTML= `
            <div class="add-quantity">
                <button class="minus" data-food-id=${pack.id}
                onclick="
                let id = dataset.foodId;
                window.addParcel(id,'minus');">-</button>

                <div class="js-quantity-${pack.id}">1</div>

                <button class="plus js-plus" data-food-id=${pack.id}
                onclick="
                let id = dataset.foodId;
                addParcel(id,'plus');">+</button>
            </div>
            `;
        document.querySelector(`.js-menu-pack-${pack.id}`).innerHTML=packHTML;
        document.querySelector(`.js-quantity-${pack.id}`).innerHTML=pack.quantity;
    });

    if(parcel.length>0){
        displayParcel(true);
    }
}

//remove food from parcel
function removePack(id){
    let newparcel=[];
    parcel.forEach((pack)=>{
        if(id!==pack.id){
            newparcel.push(pack);
        }
    })
    parcel=newparcel;
}