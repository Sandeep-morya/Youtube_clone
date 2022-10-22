import { animLabel, resetAnim, user } from "../module.js";
const input = document.querySelectorAll("input");
const label = document.querySelectorAll("label");
const go_signin = document.querySelector(".go_signin");
const register = document.querySelector(".register");
let error=document.querySelector('.err');
const loader= document.querySelector('.loader');

const anim = () => {
  input[0].addEventListener("focus", (e) => {
    animLabel(label[0],e);
  });

  input[1].addEventListener("focus", (e) => {
    animLabel(label[1],e);
  });

  input[2].addEventListener("focus", (e) => {
    animLabel(label[2],e);
  });

  input[3].addEventListener("focus", (e) => {
    animLabel(label[3],e);
  });

  input[4].addEventListener("focus", (e) => {
    animLabel(label[4],e);
  });

  input[5].addEventListener("focus", (e) => {
    animLabel(label[5],e);
  });
  //------------------ Remove ------------------
  input[0].addEventListener("blur", (e) => {
    resetAnim(label[0], e);
  });

  input[1].addEventListener("blur", (e) => {
    resetAnim(label[1], e);
  });

  input[2].addEventListener("blur", (e) => {
    resetAnim(label[2], e);
  });

  input[3].addEventListener("blur", (e) => {
    resetAnim(label[3], e);
  });

  input[4].addEventListener("blur", (e) => {
    resetAnim(label[4], e);
  });

  input[5].addEventListener("blur", (e) => {
    resetAnim(label[5], e);
  });
};
anim();
go_signin.addEventListener("click", () => {
  location.href = "./login.html";
});

/*----------> functionallity <------------*/

register.addEventListener("click", () => {
  let n = input[0].value;
  let e = input[1].value;
  let u = input[2].value;
  let p = input[3].value;
  let m = input[4].value;
  let d = input[5].value;
  if(!n)err(0);
  if(!e)err(1);
  if(!u)err(2);
  if(!p)err(3);
  if(!m)err(4);
  if(!d)err(5);
  if(n && e && u && p && m && d){
    let x=user.signup(n, e, u, p, m, d);
    loader.style.display='block';
    setTimeout(function(){
      loader.style='';
      x.then(e=>{
        if(!e){
          err(2);
          err(3);
          error.textContent=`💔 Need More Secure Usernmae & Password`;
          input[2].value='';
          input[3].value='';
        }else{
          if(e[1]){
            error.textContent=`💔 ${e[0]}`;
          }else{
            error.textContent=`💚 New Account Created Successfully`;
          }
          input.forEach(el=>el.value='');
          setTimeout(function(){
            location.href='./login.html';
          },1000);
        }
      })
    },1500)
  }
});

function err(x){
  input[x].style.outline='2px solid red';
  label[x].style.color='red';
}