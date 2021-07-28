
var context_menu ={
    "id":"Menu",
    "title": "sci-Download",
    "contexts":["all"]
};

chrome.contextMenus.create(context_menu);

chrome.contextMenus.onClicked.addListener((clickdata)=>{
    var formData = {
        url: clickdata.pageUrl
    };
    sendar("Requesting.....");
    console.log("Requesting.....");
    fetch('http://localhost:5000/extension', {
        method: 'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(function (res) {
        console.log(res);
        if (res.status == 500){
            throw new Error("Server Error");
        }else if (res.status== 400){
            throw new Error("Format Error");}  
        return res.json();  
    })
    .then(function (json) {
        console.log(json);
        console.log("Completed");
        sendar("Completed");
        setTimeout(() => {
            chrome.tabs.create({ url: json.url});  
        }, 1000);
    })
    .catch(function(error){
        console.log(error.message);
        sendar(error.message)
    });
});

function sendar(value){
    chrome.tabs.query({active:true, currentWindow:true},(tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id, value);
    }
    );
}