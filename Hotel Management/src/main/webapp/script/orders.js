import { foods } from "../data/food.js"; 
import { orderjs } from "../data/orderjs.js";
import { readylocal, ready } from "../data/ready.js";


nullchecker();
function nullchecker(){
	if(orderjs.length === 0){
		ordermsgnull();
	}
	else{
		ordermsg();
		movetoready();
	}
}


function deleteorder(){
    orderjs.splice(0,orderjs.length);
    localStorage.setItem('orderjs',JSON.stringify(orderjs));
}

function ordermsg(){
	let html = '';
	let currdate='';
	let currtime='';
	let aftime='';
	console.log(orderjs);
	orderjs.forEach((orderfood)=>{
		
			let a = dateandtime(orderfood.datetime);
			
			// getting time by getting hour, minute, seconds 
			currdate = a.getDate() + "-"+ a.getMonth() + "-" + a.getFullYear();
			console.log("-->",currdate);
			currtime = a.getHours() +":" + a.getMinutes() +":"+ a.getSeconds();
			console.log("-->",currtime);
			
			//adding delivery time to original time
			a.setMinutes ( a.getMinutes() + 5 );
			
			aftime = a.getHours() +":" + a.getMinutes() +":"+ a.getSeconds();
			console.log("-->",aftime);
			
			//displaying date and time.
			//document.querySelector('.order-list-js').innerHTML=htmlorder;
			html += `
				<div class="order-outer">
				
					<div class="order-list order-list-js">
						${listheorder(orderfood)}
		            </div>
            		
            		
					<div class="order-date order-date-js"> 
		                 <div class="date">Order place at ${currdate} ${currtime}</div>
				    	 <div class="date">Order will ready at ${aftime}</div>
		            </div>
		            
        		</div>
			`;
			//document.querySelector('.order-date-js').innerHTML=datehtml;
			
	});
	//console.log(html);
	document.querySelector('.order-head-js').innerHTML=html;
	
}

//list the food inside the parcel
function listheorder(orderfood){
	let htmlorder='';
	orderfood.parcel.forEach((pack)=>{
			let matchget = "";
			foods.forEach((foodget)=>{
				if(foodget.id===pack.id){
					matchget = foodget;
				}	
			});
			//console.log(matchget.name);
			htmlorder+=`
				<div class="food">${matchget.name}&#215;1</div>				
			`;
		});
		return htmlorder;
}

// when oderjs is null i.e, empty parcel
function ordermsgnull(){
	
	document.querySelector('.order-head-js').innerHTML=`
		<div class="empty-parcel">Empty Orders<span class="emoji">&#128551;</span></div>
	`;
}

//string to Indian date format
function dateandtime(datetime){
	 
	let timedate = new Date(datetime);
	var currentOffset = timedate.getTimezoneOffset();
	var ISTOffset = 330;
	var a = new Date(timedate.getTime() + (ISTOffset + currentOffset)*60000);
	//console.log(":::",a);
	return a;
}

function movetoready(){
	let index = 0;
	let len = orderjs.length;
	orderjs.forEach((orderfood)=>{
		let a = dateandtime(orderfood.datetime);
		a.setMinutes ( a.getMinutes() + 5 );
		a=a.getTime();
		let datenow = new Date();
		let b = dateandtime(datenow).getTime();
		let diff = a-b;
		console.log(a,",",b);
		console.log(diff);
		
		if(a<b){
			ready.push(orderfood);
			readylocal();
			orderjs.splice(index,1);
			localStorage.setItem('orderjs',JSON.stringify(orderjs));
		}
		index++;
	});
	console.log(ready);
	console.log(orderjs);
	if(orderjs.length<len){
		nullchecker();
		console.log(len,orderjs.length);
	}
}

