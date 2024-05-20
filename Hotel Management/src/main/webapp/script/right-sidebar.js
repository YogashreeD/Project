import { foods } from "../data/food.js";
import { packOff } from "./menu.js";
import { parcel, totalQuantity, addingtolocal } from "../data/parcel.js";
import { orderjs } from "../data/orderjs.js";

export function listparcel(){

    let today = dayjs();
    document.querySelector('.date-time').innerHTML=`Date: ${today.format('D-MM-YYYY')}`;

    let html='';
    let totalprice=0;
    parcel.forEach((pack)=>{
        let packid = pack.id;
        let match;
        foods.forEach((food)=>{
            if(food.id===packid)
                match=food;
        });
        totalprice+=match.price;
        if(pack.quantity>0){
            html+=`
                <div>${match.name}</div>
                <div>&#8377;${match.price}</div>
                <div>${pack.quantity}</div>
            `;
        }
    });
    document.querySelector('.total-quantity').innerHTML=html;
    document.querySelector('.price').innerHTML=`&#8377;${totalprice}`;
}

//parcel list for order page

//export let dateorder = dayjs().format('D-MM-YYYY');
//export let timeorder = dayjs().format('HH-mm-ss');
let order = document.querySelector('.order-button');
    order.addEventListener('click',()=>{
		
		let orderdate = dayjs().format('D-MM-YYYY');
        let ordertime = dayjs().format('HH:mm:ss');
        let datetime = new Date();
		
		//console.log("----------------");
		orderjs.push({
			parcel,
			datetime
		});	
		//console.log(orderjs);
		localStorage.setItem("orderjs",JSON.stringify(orderjs));
			
		let personid = "abcdefg";
		orderdate.toString();
		ordertime.toString();
        let orderlist = {
			personid,
			orderdate,
			ordertime
		};
		let arr = JSON.stringify(orderlist);
        let ip = document.getElementById("orderlist-js");
        ip.value=arr;
        //console.log((ip.value));
        
        
		let orderpack = JSON.stringify(parcel);
		let ip2 = document.getElementById("orderlist2-js");
		ip2.value=orderpack;
		//console.log(ip2.value);
		
		
        //console.log('order');        
        let orderclasss=document.querySelector('.order-popup').classList;
        orderclasss.add('order-popup-toggle');
        deleteparcel();
        //console.log(parcel);
        totalQuantity();
        setTimeout(()=>{
            orderclasss.remove('order-popup-toggle');
        },2000);

        
    });

function deleteparcel(){
    parcel.forEach((pack)=>{
        packOff(pack.id);
    })
    parcel.splice(0,parcel.length);
    addingtolocal();
}