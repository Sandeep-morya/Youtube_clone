import {data} from "../module.js";

let list=document.querySelector('.list');

/*----  funciton that is appendig list/grid to parent ----*/
const appendMovies=(array)=>{
    list.innerHTML=null;
    array.forEach(({snippet, id:{videoId}})=> {
        let card=document.createElement('div');
        card.className='list_items';
        let thumb=document.createElement('img');
        thumb.src=snippet.thumbnails.high.url;
        thumb.addEventListener('click',function(){
            let obj=new createObj(snippet,videoId,array);
            localStorage.setItem('selected',JSON.stringify(obj));
            location.href='./video.html'
        });

        let pinfo=document.createElement('div');
        pinfo.className='pinfo';

        let ptitle=document.createElement('div');
        ptitle.className='ptitle';
        ptitle.textContent=snippet.title;

        let pname=document.createElement('div');
        pname.className='pname';
        pname.textContent=snippet.channelTitle;
        
        card.append(thumb,pinfo);
        pinfo.append(ptitle,pname);
        list.append(card);
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

appendMovies(data.playlist)