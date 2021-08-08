var context_menu ={
    "id":"Menu",
    "title": "sci-Download",
    "contexts":["all"]
};

chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create(context_menu);
    });
var isloading =false;
chrome.contextMenus.onClicked.addListener((clickdata)=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        tabid = tabs[0].id;  
        console.log(tabid);
        var formData = {
            url: clickdata.pageUrl
        };
        if (!isloading){
        var port = chrome.tabs.connect(tabid, {name:"tester"}); 
        console.log("Requesting.....");
        port.postMessage({mes:"Requesting....."});
        isloading =true;
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
                return res.json();
            }
            return res.json();  
        })
        .then(function (json) {
            console.log(json);
            if ("message" in json){
                throw json; 
            }
            console.log("Completed");
            port.postMessage({mes:"Completed"});
            isloading =false;
            setTimeout(() => {
                chrome.tabs.create({ url: json.url});  
            }, 1000);
        })
        .catch(function(error){
            console.log(error.message);
            port.postMessage({mes:error.message});
            isloading =false;
            port.onDisconnect.addListener(console.log("disconnected"));
            
        });
    }
        
    });
});


