import {navbar,data,loginId} from "../module.js";
/*-------------- Navbar ---------------*/
let navbar_box=document.querySelector('.navbar');
navbar_box.innerHTML=navbar;

/* ------------ variable declation ----------- */
let video_details=document.querySelector('.vdetails');
let logo=document.querySelector('.logo');
let menu_btn=document.querySelector('.menu_btn');
let menu_icon=document.querySelector('.menu_icon');
let sidebar=document.querySelector('.sidebar');
let search_bar=document.querySelector('.search_bar');
let search_btn=document.querySelector('.search_btn');
let user_dp=document.querySelector('.user_dp');
let glogin=document.querySelector('.glogin');
let dots=document.querySelector('.dots');
let create=document.querySelector('.create');
let bell=document.querySelector('.bell');

/*-------- appending details of clicked movies--------*/
function appendata(obj){
    let video=document.createElement('iframe');
    video.className='iframe';
    video.src=`https://www.youtube.com/embed/${obj.videoId}`

    let info=document.createElement('div');
    info.className='info';

    let video_title=document.createElement('div');
    video_title.className='vtitle';
    video_title.textContent=obj.title;

    let channel_name=document.createElement('div');
    channel_name.className='cname';
    channel_name.textContent=obj.name;

    info.append(video_title,channel_name);
    video_details.append(video,info);
}
appendata(data);

/*------ function redirect Home------*/
logo.addEventListener('click',e=>{
    location.href='./index.html';
});
menu_icon.addEventListener('click',e=>{
    sidebar.style.marginLeft='0%'
});
menu_btn.addEventListener('click',e=>{
    sidebar.style.marginLeft='-30%'
});

/*------------- search result -------------*/
search_btn.addEventListener('click',e=>{
    let x=search_bar.value;
    if(x!=""&&x!=" "){
        localStorage.setItem('search',x);
        location.href='./index.html';
    }
});
search_bar.addEventListener('keypress',e=>{
    let x=e.target.value;
    if(x!=''&&x!=" "&&e.code=='Enter'){
        localStorage.setItem('search',x);
        location.href='./index.html';
    }
});

/*------------- auth -------------*/
if(loginId){
    user_dp.style.display="flex";
    create.style.display="block";
    bell.style.display="block";
    glogin.style.display='none';
    dots.style.display='none';
    user_dp.textContent=loginId[0];
}
glogin.addEventListener('click',()=>{
    location.href='./login.html';
});
user_dp.addEventListener('click',()=>{
    localStorage.removeItem('name');
    user_dp.style.display="none";
    create.style.display="none";
    bell.style.display="none";
    glogin.style.display='flex';
    dots.style.display='flex';
});