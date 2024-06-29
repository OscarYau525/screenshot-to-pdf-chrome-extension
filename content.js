console.log("In content script");

let img_memory = [];
let pageHeight = 297;
let pageWidth = 210;
let screenHeight = 1800;
let screenWidth = 2880;
let yinit = 10;
const wid = 130;
var x = (pageWidth - wid)/2;
var y = yinit;
const aspectRatio = screenHeight/screenWidth;

window.addEventListener('keypress',function(key){
    // console.log(key.key);
    let keyvalue = key.key;
    if(keyvalue == "p" || keyvalue == "P"){
        chrome.runtime.sendMessage(null,keyvalue,(response)=>{
            img_memory.push(response.imgSrc);
            // console.log("Recv count", response.imgSrc);
        })
    }

    if(keyvalue == "o" || keyvalue == "O"){
        doc = new jsPDF('p', 'mm', [pageHeight, pageWidth]);
    // console.log(img_memory);
        
        for (img of img_memory) {
            // console.log(img)
            if (y + aspectRatio * wid >= pageHeight)
            {
                doc.addPage();
                y = yinit; // Restart height position
            }
            doc.addImage(img, "JPEG", x, y, wid, aspectRatio * wid);
            y += aspectRatio * wid + 10;
        }
        doc.save("sample.pdf");
        console.log("saved successfully.")
    }
})

document.addEventListener("DOMContentLoaded", function() {
    // const compileButton = document.getElementById("compile");
  
    // compileButton.addEventListener("click", () => {
    //     console.log("Compling...");
    //     console.log(img_memory);
    // });
});