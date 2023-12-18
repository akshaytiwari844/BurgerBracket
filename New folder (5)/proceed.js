const checkdata = JSON.parse(localStorage.getItem('cart1')) || [];
console.log(checkdata);
let totalprice =0;
for(let item of checkdata){
    totalprice+=item.price*item.quantity
}
