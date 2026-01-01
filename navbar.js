var btnBurger = document.getElementById("btnBurger");

btnBurger.addEventListener("click", function(){
  var navListRes = document.getElementById("navListRes");
  navListRes.classList.toggle("active");
})