export let ready = JSON.parse(localStorage.getItem('ready')) || [];

export function readylocal(){
	localStorage.setItem('ready',JSON.stringify(ready));
}