window.addEventListener("load",(e)=>{ 
  gclient();
})
//gclient
async function gclient(){
 gapi.client.setApiKey("AIzaSyBokeOEj4fSIXyVMdpKwraCl1AEMzHKIb0");
 gapi.client.load("https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest")
    .then(function() { console.log("GAPI client loaded for API"); },
          function(err) { console.error("Error loading GAPI client for API ", err); });
}
gapi.load("client");

const plants=document.getElementById('select-profession')
console.log(plants);

const predictBtn=document.getElementById('section10')
console.log(predictBtn);

const results=document.getElementById("results")

const remedy=document.getElementById("remedyy")
console.log(remedy)

function execute(queryString) {
  let html=""
  console.log("Button called");
  return gapi.client.search.cse.list({
    "cx": "448b59730d7714a7a",
    "q": queryString
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response)
              response.result.items=response.result.items.slice(0,5)
              response.result.items.forEach(element => {
                 html+=`
                 <div class="  remedycard ">
                   <div class="content">
                       <div class="front">
                           <h3 class="title">${element.title}</h3>
                          
                       </div>
            
                       <div class="back" >
                         

                           <p class="description" id="more" >
                           ${element.snippet}
                           
                           </p>
                           <a class="subtitle" href="${element.link}" target="_blank"><button class="cta">
                           <span class="hover-underline-animation"> Go to Article </span>
                           <svg viewBox="0 0 46 16" height="5" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                               <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                           </svg>
                       </button></a>
                       </div>
                   </div>
               </div>`
              })
              
remedy.innerHTML=html;
console.log(remedy)
            },
            function(err) { console.error("Execute error", err); });
}

predictBtn.addEventListener('click',async()=>{
    const formData = new FormData();
    const plantImg = document.querySelector('input[type="file"]');
    formData.append('plantName', plants.value);
    formData.append('file', plantImg.files[0]);
    console.log(plants.value);
    console.log(formData);
    const res= await fetch('/predict', {
        method: 'POST',
        body: formData
      })
        const data=await res.json();
        console.log(data);
        queryString=data.prediction+" Remedy"
        results.innerHTML=`<div class="resultcard">
<div class="resultcard-info"> 
<div class="resultcard-avatar"><img class="plant-img" src="../static/img/plant-7760.svg" alt=""></div>
        <div class="resultcard-title">${data.prediction}</div>
        <div class="resultcard-subtitle">${data.confidence}% sure</div>
        </div>
        <ul class="resultcard-social">
        <li class="resultcard-social__item">
        <svg style="margin-left: -25px;"  onClick=execute(queryString) xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">See More <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/> </svg>
      
    </li>
  </ul>
</div>`
})