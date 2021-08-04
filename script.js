const imageContainer=document.querySelector("#image-container");
const loader= document.querySelector("#loader");
const mapContainer=document.querySelector("#map");

// global variables
let photoArray=[];
let ready=false;
let loadedImages=0;
let totalImages=0;
// check if all photos are loaded
const imageLoaded=()=>{
    loadedImages++;
    if(loadedImages===totalImages){
        ready=true;
        loader.hidden=true;
    }
}

// Attrebute Assinger
const setAttrebutes=(element,attrebutes)=>{
    for(const key in attrebutes){
        element.setAttribute(key,attrebutes[key]);
    }
}
// Create and add img element for dom
const displayInImg=()=>{
    loader.hidden=false;
    totalImages=photoArray.length;
    // create img tag for each obkect in photoArray
    photoArray.forEach((photo)=>{
        //create <a> element to link to google map
        const item=document.createElement('a');
        
        // Create <img> for photo
        setAttrebutes(item,{
            href:photo.links.html,
            target:'_blank',
        })
        if(photo.location.position.latitude){
            

            let locationUrl=`https://www.google.com/maps/search/?api=1&query=${photo.location.position.latitude}%2C${photo.location.position.longitude}`;
            setAttrebutes(item,{
                href:locationUrl,
                target:'_blank',
            });
        }
        const img=document.createElement('img');
        setAttrebutes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        })
        // Event listener to check if each photo is loaded
        img.addEventListener('load',imageLoaded);
              
        // put the img inside <a>, then put them both in imageContainer
        item.appendChild(img); 
        
        imageContainer.appendChild(item);
    });
}
//fetchinh the photos from Unsplash API
async function fetchPhotos(){
    const count=10;
    const query='travel';
    const apiKey='H0yZW4I-XBio3EYzA53iOJTrf0lvCDEsJMYYwT5Zkd0'
    let apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`;
    try{
       let respons=await fetch(apiUrl); 
       photoArray=await respons.json();
       displayInImg();
    }catch(error){
        console.log(error);
    }
    
    
}

//chck to see if scroll is near the bottom of the page to load more pictures
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready=false;
        fetchPhotos();
        loadedImages=0;
        console.log("LOADED")
    }
})
//on Load
fetchPhotos();