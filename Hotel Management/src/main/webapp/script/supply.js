import { foods } from "../data/food.js";
import { ready } from "../data/ready.js";

//deleteready();
if(ready.length === 0){
	readynull();
}
else{
	displayready()
}
function deleteready(){
    ready.splice(0,ready.length);
    localStorage.setItem('ready',JSON.stringify(ready));
}	


function displayready(){
	let mainhhtml = '';
	let currdate='';
	let currtime='';
	ready.forEach((pack)=>{
		
		let a = dateandtime(pack.datetime);
			
			// getting time by getting hour, minute, seconds 
		currdate = a.getDate() + "-"+ a.getMonth() + "-" + a.getFullYear();
		//console.log("-->",currdate);
		currtime = a.getHours() +":" + a.getMinutes() +":"+ a.getSeconds();
		//console.log("-->",currtime);
		
		mainhhtml = `
			<div class="ready-outer">
				
				<div class="ready-list">
					${readylist(pack)}
	            </div>
	            
	            <div class="ready-date o"> 
	                 <div class="date">Order place at ${currdate} ${currtime}</div>
			    	 <div class="date">Order is ready to serve</div>
	            </div>
	            
    		</div>
		`; 
		
	});
	document.querySelector('.ready-head-js').innerHTML=mainhhtml;
	//console.log(mainhhtml);
	//console.log(ready);
}

function readylist(pack){
	let htmllist = '';
	pack.parcel.forEach((fr)=>{
		let match = '';
		foods.forEach((food)=>{
			if(fr.id === food.id){
				match=food;
			}
		});
		htmllist+= `
			<div class="food">${match.name}&#215;1</div>
		`;
	});
	return htmllist;
}

function readynull(){
	
	document.querySelector('.ready-head-js').innerHTML=`
		<div class="empty-parcel">Parcel gets sold out<span class="emoji">&#128521;</span></div>
	`;
}

function dateandtime(datetime){
	 
	let timedate = new Date(datetime);
	var currentOffset = timedate.getTimezoneOffset();
	var ISTOffset = 330;
	var a = new Date(timedate.getTime() + (ISTOffset + currentOffset)*60000);
	//console.log(":::",a);
	return a;
}




