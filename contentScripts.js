
chrome.runtime.onMessage.addListener(
    function gotMessage(message, sender, sendResponse){
        let element = document.createElement("div");
        element.id = "inject-container";
        element.innerHTML ="<div id='inner'>"+message+"</div>"
        document.body.appendChild(element);
        setTimeout(() => {
            document.getElementById("inject-container").remove()
        }, 1000);
        
        
})