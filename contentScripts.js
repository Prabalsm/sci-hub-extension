console.log("fucker");

function injector(){
    let element = document.createElement("div");
    element.id = "inject-container";
    element.innerHTML ="<div id='inner'></div>";
    document.body.appendChild(element);
}
chrome.runtime.onConnect.addListener(function(port){
    console.log("connected", port);
    injector();
    port.onMessage.addListener(function(msg){
        document.getElementById("inner").innerHTML=msg.mes;
        if(msg.mes =="Failed to fetch"){
            setTimeout(() => {
            document.getElementById("inject-container").remove();
            port.disconnect();
            }, 1500);}
        if(msg.mes =="Completed"){
            setTimeout(() => {
            document.getElementById("inject-container").remove();
            port.disconnect();
            }, 1500);}
    });
});

