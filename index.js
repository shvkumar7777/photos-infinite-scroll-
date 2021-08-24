const imgcontainer = document.getElementById("image_container")
const accesskey = 'WIBgjTMtBuXKIU_fQOgEQAeED1FH1WNwccVnkPixjWY';
const count = 30;
const apiurl = `https://api.unsplash.com/photos/random/?client_id=${accesskey}&count=${count}`;
let ready = false;

let imagesloaded = 0;
totalnumber =0;
let photosArray = [];

//
function imageLoaded(){
    console.log("image added");
    imagesloaded++;
    if (imagesloaded === totalnumber) {
        ready = true;
        loader.hidden =  true;
        console.log("ready"+ready);

    }
}

//create a helper function to not to repeat the code
function setAttributes(element,attibutes){
    for(const key in attibutes){
        element.setAttribute(key,attibutes[key])
    }
}

//to create <a> tag keep img tag inside the img tag and bind it to the 
function displayPhotos(){
    imagesloaded = 0; 
    totalnumber = photosArray.length;
    console.log("total images",totalnumber);

    photosArray.forEach((photo)=>{
        //create <a> tag
        const item = document.createElement("a")
        // item.setAttribute("href",photo.links.html);
        // item.setAttribute("target","_blank")
        setAttributes(item,{
            href:photo.links.html,
            target: "_blank"
        })

        //create a img tag
        const img = document.createElement("img")
        // img.setAttribute("src",photo.urls.regular);
        // img.setAttribute("alt", photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttributes(img,{
            src:photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        //event listener
        img.addEventListener('load',imageLoaded);

        //put img in a elemnt then put both in a img container.
        item.appendChild(img);
        imgcontainer.appendChild(item);

    });

    
}


// this will return the photos from am API
async function getPhotos(){
    try{
        const response = await fetch(apiurl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        //to handle the catch if any exception.
    }
}

window.addEventListener("scroll",()=>{
    // console.log("scrolled...")
    if (window.innerHeight+window.scrollY >= document.body.offsetHeight-1000 && ready) {
        getPhotos();
        ready = false;
    }
});
//onload
getPhotos();