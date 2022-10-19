import {navbar,data} from "../module.js";
/*-------------- Navbar ---------------*/
let navbar_box=document.querySelector('.navbar');
navbar_box.innerHTML=navbar;

/* ------------ variable declation ----------- */
let video_details=document.querySelector('.vdetails');
let logo=document.querySelector('.logo');
let menu_btn=document.querySelector('.menu_btn');
let menu_icon=document.querySelector('.menu_icon');
let sidebar=document.querySelector('.sidebar');

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