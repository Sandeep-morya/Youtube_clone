import {navbar,search,loginId} from "../module.js";
/*-------------- Navbar ---------------*/
let navbar_box=document.querySelector('.navbar');
navbar_box.innerHTML=navbar;

/* ------------ variable declation ----------- */
let active=true;
let search_bar=document.querySelector('.search_bar');
let search_btn=document.querySelector('.search_btn');
let search_result=document.querySelector('.search_result');
let logo=document.querySelector('.logo');
let menu=document.querySelector('.menu_icon')
let sidebar=document.querySelector('.sidebar');
let sidebar_child=document.querySelectorAll('.sidebar>div');
let label=document.querySelectorAll('.label');
let slabel=document.querySelectorAll('.slabel');
let results=document.querySelector('.results');
let home_icon=document.querySelector('.home');
let user_dp=document.querySelector('.user_dp');
let glogin=document.querySelector('.glogin');
let dots=document.querySelector('.dots');
let create=document.querySelector('.create');
let bell=document.querySelector('.bell');

/*------------- search result -------------*/
search_btn.addEventListener('click',e=>{
    let x=search_bar.value;
    if(x!=""&&x!=" "){
        search_list(x,50)
    }
});
search_bar.addEventListener('keypress',e=>{
    let x=e.target.value;
    if(x!=''&&x!=" "&&e.code=='Enter'){
        search_list(x,50)
    }
});

/*------------- asyc function --------------*/
const search_list= async(query,items)=>{
    try {
        let temp= await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${items}&order=relevance&q=${query}&key=AIzaSyCfD99wvQraI_lL-RuPwmbydwoBJGn6a8U`);
        let res= await temp.json();
        appendMovies(res.items);
    } catch (e) {
        console.log(e);
    }
}
/*----  funciton that is appendig list/grid to parent ----*/
const appendMovies=(array)=>{
    search_result.innerHTML=null;
    array.forEach(({snippet, id:{videoId}})=> {
        let card=document.createElement('div');
        card.className='card';
        let thumbnail=document.createElement('img');
        thumbnail.src=snippet.thumbnails.high.url;
        thumbnail.addEventListener('click',function(){
            let obj=new createObj(snippet,videoId,array);
            localStorage.setItem('selected',JSON.stringify(obj));
            location.href='./video.html'
        });

        let details=document.createElement('div');
        details.className='details';

        let channel_logo=document.createElement('div');
        channel_logo.className='channel_logo';
        let logo=document.createElement('img');
        logo.src=snippet.thumbnails.high.url;

        let video_title=document.createElement('div');
        video_title.className='video_title';
        video_title.textContent=snippet.title;

        let channel_name=document.createElement('div');
        channel_name.className='channel_name';
        channel_name.textContent=snippet.channelTitle;

        channel_logo.append(logo);
        details.append(channel_logo,video_title,channel_name);
        card.append(thumbnail,details);
        search_result.append(card);   
    });
}
/*------ class to create Object -----*/
class createObj{
    constructor(x,y,z){
        this.title=x.title;
        this.name=x.channelTitle;
        this.videoId=y;
        this.playlist=z;
    }
}
/*------ function redirect Home------*/
logo.addEventListener('click',e=>{
    location.href='./index.html';
});
/*------ fucntion to manage sidebar ------*/
menu.addEventListener('click',e=>{
  if(active){
    active=false;
    close_sidebar()
  }else{
    open_sidebar();
    active=true;
  }
});

function close_sidebar(){
    results.style.width='94.5%';
    sidebar.style.width='5.5%'
    sidebar_child.forEach(e=>{
        e.style.margin='15px 0';
        e.style.gridTemplateColumns='1fr';
    });
    label.forEach(e=>e.style.display='none');
    slabel.forEach(e=>e.style.display='block');
    home_icon.style.background='transparent';
}
function open_sidebar(){
    results.style="";
    sidebar.style=""
    sidebar_child.forEach(e=>{
        e.style="";
        e.style="";
    });
    label.forEach(e=>e.style="");
    slabel.forEach(e=>e.style="");
    home_icon.style="";
}

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


/*----------- video list on page load -----------*/
search_list(search,50);