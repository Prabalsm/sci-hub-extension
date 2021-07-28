
let ValeContainer = document.getElementById("content");

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    let url = tabs[0].url;
    ValeContainer.value = url;
});

document.querySelector('form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var formData = {
        url: ValeContainer.value
    };
    document.getElementById('requesting').innerHTML= "Requesting.....";
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
       document.getElementById("requesting").innerHTML ="Completed";
        setTimeout(() => {
            chrome.tabs.create({ url: json.url});  
        }, 1000);
    })
    .catch(function(error){
        document.getElementById("requesting").innerHTML =error.message;
    });
    
})
