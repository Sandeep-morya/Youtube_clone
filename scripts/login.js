import { animLabel, resetAnim, user} from "../module.js";

const input = document.querySelectorAll("input");
const label = document.querySelectorAll("label");
const login_btn = document.querySelector(".login_btn");
const create_btn = document.querySelector(".create_btn");
let error=document.querySelector('.err');
const loader= document.querySelector('.loader');

input[0].addEventListener("focus", (e) => {
  animLabel(label[0], e);
});

input[1].addEventListener("focus", (e) => {
  animLabel(label[1], e);
});

input[0].addEventListener("blur", (e) => {
  resetAnim(label[0], e);
});

input[1].addEventListener("blur", (e) => {
  resetAnim(label[1], e);
});

function err(x) {
  input[x].style.outline = "2px solid red";
  label[x].style.color = "red";
}

create_btn.addEventListener("click", (e) => {
  location.href = "./signup.html";
});

//--> functionality part
login_btn.addEventListener("click", () => {
  let u = input[0].value;
  let p = input[1].value;
  if (!u) err(0);
  if (!p) err(1);
  if (u && p) {
    let x = user.login(u, p);
    loader.style.display='block';
    setTimeout(function(){
      loader.style='';
      x.then((e) => showProfile(u, e)).catch(e=>{
        input[1].value=null;
        err(0);
        err(1); 
        error.textContent="💔 Username and Password did`nt matched"
      });
    },1500)
  }
});

async function showProfile(username, token) {
  let url = `https://masai-api-mocker.herokuapp.com/user/${username}`;

  let temp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `application/json`,
    },
  });
  let res = await temp.json();
  let x = res.name;

  localStorage.setItem("name", x);
  error.textContent=`💚 Hello ! ${x} Login Successful` 
  setTimeout(function () {
    location.href = `./index.html`;
  }, 1000);
}
