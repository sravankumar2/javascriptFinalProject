$(document).ready(function(){

console.log("dom loaded")

var list1=$("#clothing-card")
var list2=$("#accessory-card")
function creatList(obj,list,p){
    var grid=$("<div>").addClass("product-card")
  
    grid.attr("id",obj.id)
    var ancor=$("<a>").attr("href","./productDetails.html?product_id="+p)
    
    var image=$("<img>").attr({
        src:obj.preview,
        alt:obj.name+"pic"
    })
      
    image.addClass("product-image")
    ancor.append(image)
    grid.append(ancor)
    var details=$("<div>").addClass("product-meta")
    var titleText=$("<h4>")
    titleText.text(obj.name)
    details.append(titleText)
    var brandName=$("<h5>")
    brandName.text(obj.brand)
    details.append(brandName)
    var Price=$("<p>")
    Price.text("Rs "+obj.price)
    details.append(Price)
    ancor.append(details)
    list.append(grid)

}



    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product",function(response){
        var productList=response;
       // console.log(checkOutList)
   
       for(var i=0; i<productList.length; i++){

           if(productList[i].isAccessory){
            creatList(productList[i],list2,i+1)
           }
           else{
            console.log(list1)
            creatList(productList[i],list1,i+1)
           }
       }
       

       var checkOutList = window.localStorage.getItem('checkOut-list');
       checkOutList = checkOutList === null || checkOutList === '' ? [] : checkOutList;
       checkOutList = checkOutList.length > 0 ? JSON.parse(checkOutList) : [];
   
       var totalCount = 0;
       for(var i=0; i<checkOutList.length; i++) {
           totalCount = totalCount + checkOutList[i].count;
       }
   
       $('#cart-count').html(totalCount);
      
    })
})