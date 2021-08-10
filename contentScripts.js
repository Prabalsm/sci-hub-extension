console.log("fucker");

function injector(){
    let element = document.createElement("div");
    element.id = "inject-container";
    element.innerHTML ="<div id='inner'></div>";
    document.body.appendChild(element);
}

function timer(){
    setTimeout(() => {
        document.getElementById("inject-container").remove();
        port.disconnect();
        }, 1500);
}

chrome.runtime.onConnect.addListener(function(port){
    console.log("connected", port);
    if (document.getElementById("inject-container") != null){
    document.getElementById("inject-container").remove();
    }
    injector();
    const tester = ["Completed", "Failed to fetch", "Invalid file format.","Expected object. Received string.",
    "Expected object with 'url' key.","Unsupported Website"];
    port.onMessage.addListener(function(msg){
        document.getElementById("inner").innerHTML=msg.mes;
        if (tester.includes(msg.mes)){
            timer();
        }

        });
    });

