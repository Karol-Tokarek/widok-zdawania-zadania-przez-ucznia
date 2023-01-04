

///Odnosnie testow

// Niestety nie można poprawnie/w pełni przetestować pliku wejściowego za pomocą Qunit. 
// Interfejsy API JavaScript nie pozwolą ci ustawić plików na dane wejściowe ze względu na ograniczenia bezpieczeństwa.
//  Jeśli JavaScript byłby w stanie uzyskać dostęp do dowolnego pliku na dysku użytkownika i zastosować go do takiego pola wejściowego, 
//  obszar do nadużyć jest ogromny.



function upload_file(e) {
    e.preventDefault();
    ajax_file_upload(e.dataTransfer.files);
}
  
function file_explorer() {
    document.getElementById('selectfile').click();
    document.getElementById('selectfile').onchange = function() {
        files = document.getElementById('selectfile').files;
               // alert(files.toString());

        ajax_file_upload(files);
    };
}



document.querySelector(".selectfilebtn").addEventListener("click", function(){

file_explorer();
});

function upload_checkFileName(filenames)
{
   
    // var filenames2 = filenames;
    
    var filenames2 = [];
    filenames2 = filenames.split(", ");
    let length = filenames2.length;
    let count = 0;
        // alert(filenames2);

    for(let i=0; i<filenames2.length; i++)
    {
        if(filenames2[i].endsWith(".zip"))
        {
            filenames2[i] = "";
            count++;
        }
 
    }

     if(filenames2.length-1 == count)  
     {

         return true;

     }

    return false;

}

/////FUNKCJA TYLKO ZROBIONA NA POTRZEBY TESTÓW, NIE ZAIMPLEMENTOWAŁEM JEJ W KODZIE GŁÓWNYM !
// function upload_checkFilesIfEmpty(files_size)
// {

//     var filesizes2 = [];
//     filesizes2 = files_size.split(", ");
//     let length = filesizes2.length;
//     let count = 0;
//     for(let i=0; i<filesizes2.length; i++)
//     {
//         if(filesizes2[i] == "22")
//         {
//             count++;
//         }
//           if(parseInt(filesizes2[i]) > 125000000)
//         {
//             count++;
//         }
 
 
//     }

//      if(count > 0)
//      {

//          return false;
//      }

//     return true;


// }


function ajax_file_upload(files_object) {
        var filenames = "";
    var percent = 0;
let btn = document.querySelector(".selectfilebtn");
    btn.disabled = true;
    if(files_object != undefined) {
        var form_data = new FormData();
        for(i=0; i<files_object.length; i++) {
            form_data.append('file[]', files_object[i]);
            //alert(files_obj[i].name);
            //alert(files_object[i].size);
           filenames += files_object[i].name + ", ";
        }
      //  alert(typeof(filenames));
       // if(btn.disabled === true)
       if(upload_checkFileName(filenames) == true){  /// || or upload_checkFilesIfEmpty(filesizes)
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "uploaddropfile.php", true);
        xhttp.onload = function(event) {
            if (xhttp.status == 200) {
                if(this.responseText == "SUCCESS")
                {
                    youcanreload = true;
                }
            } else {
                alert("Error " + xhttp.status + " occurred when trying to upload your file.");
            }
        }
    }
        else{
                alert("Error ZŁY PLIK / PLIKI. Uzyj .zip");

        }
    
    
        setTimeout(function() {
  //your code to be executed after 1 second
  window.location.reload(true);
  }, 600);
    

       



xhttp.upload.onprogress = function(evt)
{
    if (evt.lengthComputable)
    {
        let zone = document.querySelector("#drag_upload_file");
        var percentComplete = parseInt((evt.loaded / evt.total) * 100);
        zone.querySelector("input").value = parseFloat(evt.loaded/1024/1024).toFixed(2) + "MB / "+ parseFloat(evt.total/1024/1024).toFixed(2) +"MB";
        zone.querySelector("input").style.background = "linear-gradient(90deg, lightgreen "+percentComplete+"%, white 0%)";
        zone.querySelector("input").style.width="340px";
        // console.log("Upload: " + percentComplete + "% complete")

}
};

        // if(upload_checkFileName(filenames) == true){

  xhttp.send(form_data);
// }
// else{
//     alert("POPRAW PLIKI !");
// }

//      
    }



xhttp.upload.onload = function(evt)
{
     var zonedrag = document.querySelector("#drag_upload_file");
            var el = document.createElement("p");
            el.setAttribute("class", "alertupload");
            el.setAttribute("style", "text-align:center;");
            el.textContent = "WGRAŁEŚ PLIK NA SERWER.";
            zonedrag.appendChild(el);
            setTimeout(function() {
  //your code to be executed after 1 second
  window.location.reload(true);
  }, 600);

        };


    }

