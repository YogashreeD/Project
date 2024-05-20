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
                        <img class="vnv-img" src="Images/Veg-nonveg-img/veg-img.jpg">
                        <p class="vnv-tag">Veg</p>
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

document.querySelectorAll('.js-pack-button')
.forEach((button)=>{
    button.addEventListener('click',()=>{
        console.log('pack');
    });
})