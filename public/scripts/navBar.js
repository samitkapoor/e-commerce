// this script pins the nav bar on top and changes its style
var content = document.getElementById("content");

content.addEventListener("scroll", () => {
  var navBar = document.getElementById("nav-bar");
  console.log(content.scrollTop);
  if (content.scrollTop == 0) {
    navBar.classList.remove("stick");
  } else {
    navBar.classList.add("stick");
  }
});
