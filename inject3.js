let timer;
async function main3(){

    // Check if the redirection has already happened
    const hasRedirected = await GM_getValue('meme', false);
    console.log(hasRedirected);
    if (!hasRedirected) {
        //do stuff
        meme();
    }
    timer = setTimeout(()=>{GM_setValue('meme',false); main3();}
               , 1000);
}

async function GM_getValue(key, val) {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, function (result) {
        console.log(result);
        if (result[key] === null || result[key] === undefined) {
          //GM_setValue(key,false);
          resolve(null);
          //alert('1');
        } else {
          resolve(result[key]);
          //alert('2');
        }
      });
    });
  };

async function GM_setValue(key, val) {
    return new Promise((resolve) => {
      chrome.storage.local.set({[key]: val}, function (){
        //alert(key);
        resolve();
      });
    });
  };
/*
async function GM_getValue(key, _){
    return await readLocalStorage(key);
}

async function GM_setValue(key, val){
    return await setLocalStorage(key, val);
}*/

//main();

function meme() {
    'use strict';
    //alert('meme');
    $(document).ready(function(){
        createAnnoyingPopup();
    });
    async function createAnnoyingPopup() {
        // Generate random HTML content
        const randomMeme = await (await fetch("https://meme-api.com/gimme")).json();
        const randomContent = [

            "<img src='"+randomMeme.url+"'>",

        ];

        // Create the popup overlay
        const popup = document.createElement("div");
        const top = Math.floor(Math.random() * $(window).height());
        const left = Math.floor(Math.random() * $(window).width());
        popup.style.cssText = `
    position: fixed;
    top: ${top}px;
    left: ${left}px;
    width: 300px;
    height: 20px;
    /*background-color: rgba(0, 0, 0, 0.7);*/
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    color: ${getRandomColor()};
  `;
        console.log(popup.style.cssText);

        // Add the content to the popup
        popup.innerHTML = randomContent[Math.floor(Math.random() * randomContent.length)];

        // Add a close button (optional)

        popup.addEventListener("click", () => popup.remove());


        // Append the popup to the body
        document.body.appendChild(popup);
    }

    function getRandomColor() {
        const colors = ["red", "green", "blue", "yellow", "purple", "orange"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

}
chrome.runtime.connect().onDisconnect.addListener(function() {
    // clean up when content script gets disconnected
    console.log('dc');
    clearInterval(timer);
    //main3();
});


