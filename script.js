const btncart=document.querySelector("#cart-icon");
const cart=document.querySelector(".cart");
const btnclose=document.querySelector("#close");

btncart.addEventListener("click" ,()=>{
    cart.classList.add("cart-active");
});

btnclose.addEventListener("click", ()=>{
    cart.classList.remove("cart-active");
});

 document.addEventListener("DOMContentLoaded" ,LoadFood);

 function LoadFood(){
   LoadContent();
}

 function  LoadContent(){
   //remove food item from the cart
        let  btnRemove =document.querySelectorAll(".cart-remove")
        btnRemove.forEach((btn)=>{
        btn.addEventListener("click", removeItem);
        });
   //product item change event
        let  quantity=document.querySelectorAll(".cart-quantity")
        quantity.forEach((input)=>{
        input.addEventListener("change", changeQty);
   });

   //product cart

        let cartBtn=document.querySelectorAll('.cart-icon');
        console.log(cartBtn)
        cartBtn.forEach((btn)=>{
        btn.addEventListener("click", addCart);
        });

updateTotal();


}
    //RemoveItem 
        function removeItem(){
                    if(confirm("Are you sure to remove")){
                      let title=this.parentElement.querySelector(".cart-food-title").innerHTML; 
                  
                        itemList=itemList.filter(ele=>ele.title!=title);
                    this.parentElement.remove();
                    LoadContent()
                    }
                };

    //change quantity
        function changeQty(){
                    if(isNaN(this.value) || this.value<1){
                    this.value=1;
                    };
                    LoadContent();
                    

 };

 let itemList=[];


//addCart
  function addCart(){
      let food=this.parentElement;
      let title=(food.querySelector('.food-title').innerHTML);
      let price=food.querySelector('.food-price').innerHTML;
      let img=food.querySelector('.food1').src;
      let newProduct={title,price,img}

      //check product already exist in cart
      if(itemList.find((ele)=>ele.title==newProduct.title))
      {
        alert("Product already added in cart");
        return;
      }
      else{
        itemList.push(newProduct)
      }
       
      let newProductElement= createCartProduct(title,price,img);
       let element=document.createElement('div');
       element.innerHTML=newProductElement;
       let cartBasket=document.querySelector('.cart-content');
       cartBasket.append(element);
       LoadContent();
     };
    

    function createCartProduct(title,price,img){
        return `
         <div class="cart-box">
        <img src="${img}" class="cart-img1">
        <div class="details-box">
            <div class="cart-food-title">${title}</div>
            <div class="price-box">
                 <div class="cart-price">${price}</div>
                 <div class="cart-amt">${price}</div>
            </div>
        <input type="number" value="1" class="cart-quantity">
            </div>
            <ion-icon name="trash-outline" class="cart-remove"></ion-icon>
        </div> `;
    }

    function updateTotal(){
            const cartItems=document.querySelectorAll(".cart-box");
            const totalValue=document.querySelector(".total-price");
    
            let total=0;

    cartItems.forEach(product=>{
        let priceElement=product.querySelector(".cart-price")
        let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty=product.querySelector(".cart-quantity").value;
        total+=(price*qty);
        product.querySelector('.cart-amt').innerText="Rs."+price*qty;
    });
    totalValue.innerHTML="Rs."+total;
       

    //add a count in icon
const cartCount=document.querySelector(".cart-count");
let count=itemList.length;
cartCount.innerHTML=count;
  if(count==0){
        cartCount.style.display="none";
  }
  else{
         cartCount.style.display="block";
  }

}
