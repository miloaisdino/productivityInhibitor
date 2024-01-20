
async function main2(){
    const newTabPageURL = 'https://nesslabs.com/benefits-of-laziness';

    // Check if the redirection has already happened
    const hasRedirected = await GM_getValue('hasRedirected', false);
    console.log(hasRedirected);
    if (!hasRedirected) {
        // Redirect to the specified URL when a new tab is opened
        // Set the flag to indicate that redirection has occurred
        //await GM_setValue('hasRedirected', true);
        chrome.storage.local.set({'hasRedirected': true}, function (){
            window.location.replace(newTabPageURL);
        });
    }
    setTimeout(()=>{GM_setValue('hasRedirected',false); main2();}
               , 10000);
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
2