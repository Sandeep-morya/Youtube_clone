import {navbar} from "../module.js";
/*-------------- Navbar ---------------*/
let navbar_box=document.querySelector('.navbar');
navbar_box.innerHTML=navbar;

/* ------------ variable declation ----------- */
let snippet=JSON.parse(localStorage.getItem('selected'));
let video_details=document.querySelector('.vdetails');
let logo=document.querySelector('.logo');

/*-------- appending details of clicked movies--------*/
function appendata(snippet){
    let card=document.createElement('div');
        card.className='cards';
        let thumbnail=document.createElement('img');
        thumbnail.src=snippet.thumbnail;

        let details=document.createElement('div');
        details.className='info';

        let video_title=document.createElement('div');
        video_title.className='vtitle';
        video_title.textContent=snippet.title;

        let channel_name=document.createElement('div');
        channel_name.className='cname';
        channel_name.textContent=snippet.name;

        details.append(video_title,channel_name);
        card.append(thumbnail,details);
        video_details.append(card); 
}
appendata(snippet);

/*------ function redirect Home------*/
logo.addEventListener('click',e=>{
    location.href='./index.html';
});