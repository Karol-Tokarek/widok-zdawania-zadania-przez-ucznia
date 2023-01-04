
///// <<<<<INFORMACJE>>>>>>>>>> //////////////////////////
///SPRAWDZANIE DZIAŁANIA SKRYPTU - PLIKI: index.php + filesupload.js
///SPRAWDZANIE DZIAŁANIA TESTÓW  - PLIKI: TestsResults.html + tests.js
////
////info o pliku tests.js:////////
////testy na gorze/////
////ponizej funkcje odpowiedzialne za upload + dodatkowe zmienione pod testy (brak mozliwosci zasymulowania wgrania pliku w testach) ---->
///----->// Interfejsy API JavaScript nie pozwolą nam ustawić plików na dane wejściowe ze względu na ograniczenia bezpieczeństwa.//  Jeśli JavaScript byłby w stanie uzyskać dostęp do dowolnego pliku na dysku użytkownika i zastosować go do takiego pola wejściowego, //  istnieje obszar do naduzyć.


    QUnit.module('UploadingFilesCheck', function() {       
    QUnit.test('ExtensionFileCorrect', function(assert) {
    
        
      assert.equal(upload_checkFileName("pl124435ic.zip, wtf.zip, cej.zip, pen.zip, CJ.zip"), true, "Poprawna nazwa pliku.");  
      //////poprawne nazwy plikow  w stringu  wszystko przykladowe

    });


    QUnit.test('ExtensionFileCorrectFAILURE', function(assert) {

           assert.equal(upload_checkFileName("CJ.zipek"), false, "Niepoprawna nazwa pliku / rozszerrzenie");   ///WYWALA BŁĄD ! - złe rozszerrzenie pliku 
           /////niepoprawna nazwa (rozszerzenie) pliku/ów w stringu

    });
  


    QUnit.test('SizeFileCorrect', function(assert) { 

           assert.equal(upload_checkFilesIfEmpty("5325325, 125000, 345534"), true, "Niepusty zip i nie za duzy");   ////poprawne size'y zipów
           ////poprawne size'y zipow plikow w stringu (przykladowe)

    });



    QUnit.test('SizeFileCorrectFAILURE', function(assert) { 
                                                                            /////FAILURE - JEDEN Z SIZE'OW zipow jest rowny pustemu zipowi - pusty zip nie powinien zostac wyslany (hipotetycznie)
           assert.equal(upload_checkFilesIfEmpty("5325325, 35234534, 345534, 22"), false, "Pusty zip w ktoryms pliku lub za duza wielkosc !");  //////pusty zip ma size - 22 ---> nie implementowałem tego w głównym kodzie, tylko na potrzeby testow napisalem taka funkcje
           ////niepoprawne size'y zipow plikow w stringu (przykladowe) 22 - pusty, maksymalny - 125000000 
    });


QUnit.test('ASYNC_CHECK_SUCCESS', assert => { 

  assert.timeout(1000);
 const done_action = assert.async();
var files = null;
// Niestety nie można poprawnie/w pełni przetestować pliku wejściowego za pomocą Qunit. 
// Interfejsy API JavaScript nie pozwolą nam ustawić plików na dane wejściowe ze względu na ograniczenia bezpieczeństwa.

 ajax_file_upload_function_for_tests(files, "uploaddropfile.php" , res => {
    assert.equal(res, true,  "POŁĄCZENIE Z PLIKIEM UPLOUDUJĄCYM OK");
    done_action();
    ////polaczenie jest nawiazane z plikiem ------ sprawdzane, wiecej w funkcji: ajax_file_upload_function_for_tests 


  });

  
 
});


 
QUnit.test('ASYNC_CHECK_FAILURE', assert => { 

  assert.timeout(1000);
 const done_action2 = assert.async();
var files = null;
// Niestety nie można poprawnie/w pełni przetestować pliku wejściowego za pomocą Qunit. 
// Interfejsy API JavaScript nie pozwolą nam ustawić plików na dane wejściowe ze względu na ograniczenia bezpieczeństwa.

 ajax_file_upload_function_for_tests(files, "pliczek.php", res => {
    assert.equal(res, false, "BRAK POŁĄCZENIA Z PLIKIEM UPLOUDUJĄCYM! - NIEPOPRAWNY WSKAZANY PLIK PHP.");
    done_action2();
    ////polaczenie NIE jest nawiazane z plikiem (nie istnieje   ) ------ sprawdzane, wiecej w funkcji: ajax_file_upload_function_for_tests 

  });

  
 
});


  });








































function upload_file(e) {
    e.preventDefault();
    ajax_file_upload(e.dataTransfer.files);
}
  
function file_explorer() {
    document.getElementById('selectfile').click();
    document.getElementById('selectfile').onchange = function() {
        files = document.getElementById('selectfile').files;
        alert(files.toString());
        ajax_file_upload(files);
    };
}



// document.querySelector(".selectfilebtn").addEventListener("click", function(){

// file_explorer();
// });


function upload_checkFileName(filenames)
{

    var filenames2 = [];
    filenames2 = filenames.split(", ");
    let length = filenames2.length;
    let count = 0;
    for(let i=0; i<filenames2.length; i++)
    {
        if(filenames2[i].endsWith(".zip"))
        {
            filenames2[i] = "";
            count++;
        }
 
    }

     if(filenames2.length == count)
     {

         return true;
     }

    return false;
}

function upload_checkFilesIfEmpty(files_size)
{

    var filesizes2 = [];
    filesizes2 = files_size.split(", ");
    let length = filesizes2.length;
    let count = 0;
    for(let i=0; i<filesizes2.length; i++)
    {
        if(filesizes2[i] == "22")
        {
            count++;
        }
          if(parseInt(filesizes2[i]) > 125000000)
        {
            count++;
        }
 
 
    }

     if(count > 0)
     {

         return false;
     }

    return true;


}



function ajax_file_upload(files_obj, callback) {
 var filenames = [];
 /// var filesizes = [];

    var percent = 0;
let btn = document.querySelector(".selectfilebtn");
    btn.disabled = true;
    if(files_obj != undefined) {
        var form_data = new FormData();
        for(i=0; i<files_obj.length; i++) {
            form_data.append('file[]', files_obj[i]);
            //alert(files_obj[i].name);
         //   alert(files_obj.length);
          // filenames.push(files_obj[i].name);
              filenames += files_object[i].name + ", ";
              ///filesizes += files_object[i].size + ",";  /////gdybym zaimplementowal sprawdzanie czy pusty zip

        }
      //  alert(typeof(filenames));
       // if(btn.disabled === true)
       if(upload_checkFileName(filenames) == true){   /// || or upload_checkFilesIfEmpty(filesizes)
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "uploaddropfile.php", true);
        xhttp.onload = function(event) {
            if (xhttp.status == 200) {
                if(this.responseText == "SUCCESS")
                {
                    youcanreload = true;
                    // callback(true);
                }
            } else {
                alert("Error " + xhttp.status + " occurred when trying to upload your file.");
            }
        }
    }
        else{
                alert("Error ZŁY PLIK / PLIKI.");

        }
    
    
        setTimeout(function() {
  //your code to be executed after 1 second
  window.location.reload(true);
  }, 600);
    


       


////////////////funkcje odpowiedzialne za informacje - progress wczytywania pliku oraz komunikt - wgrales plik na serwer
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
        if(percentComplete == 100 ){
   
    }
}
};
  xhttp.send(form_data);

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
  //           setTimeout(function() {
  // //your code to be executed after 1 second
  // window.location.reload(true);
  // }, 10600);

        };


    }



function ajax_file_upload_function_for_tests(files, file_php_to_post=null, callback) {
 /// var filesizes = [];
        var form_data = new FormData();
var filenames = [];
 /// var filesizes = [];

//     var percent = 0;
// let btn = document.querySelector(".selectfilebtn");
//     btn.disabled = true;
//     if(files_obj != undefined) {
//         for(i=0; i<files_obj.length; i++) {
//             form_data.append('file[]', files_obj[i]);
//             //alert(files_obj[i].name);
//          //   alert(files_obj.length);
//           // filenames.push(files_obj[i].name);
//               filenames += files_object[i].name + ", ";
//               ///filesizes += files_object[i].size + ",";  /////gdybym zaimplementowal sprawdzanie czy pusty zip

//         }
      //  alert(typeof(filenames));
       // if(btn.disabled === true)
       if(file_php_to_post !== null)
       {
        
        var xhttp = new XMLHttpRequest();

        xhttp.open("POST", file_php_to_post, true);
        xhttp.onload = function(event) {
            if (xhttp.status == 200) {
                if(this.responseText == "SUCCESS")
                {                
                    //alert(this.responseText + " - połączenie z plikiem php działa");
                    callback(true);
                }
             else {
                alert(this.responseText);
                callback(false);
            }
        }
        else{
            callback(false);

        }
   
       
   }
     xhttp.send(form_data);
 }else{
                    callback(false);
                    return;

 }

}     
    


///Odnosnie testow
// Niestety nie można poprawnie/w pełni przetestować pliku wejściowego za pomocą Qunit. 
// Interfejsy API JavaScript nie pozwolą nam ustawić plików na dane wejściowe ze względu na ograniczenia bezpieczeństwa.
//  Jeśli JavaScript byłby w stanie uzyskać dostęp do dowolnego pliku na dysku użytkownika i zastosować go do takiego pola wejściowego, 
//  istnieje obszar do naduzyć.

/////


  //     QUnit.module('IsFileEmpty', function() {
  //   QUnit.test('IsFileEmpty', function(assert) {
  //          assert.equal(upload_checkFileName(["pl124435ic.zipek"]), true, "Poprawne nazwy plików.");  
  //   });
  // });

  //       QUnit.module('IsFileEmptyFAILURE', function() {
  //   QUnit.test('IsFileEmptyFAILURE', function(assert) {
  //          assert.equal(upload_checkFileName(["pl124435ic.zipek"]), true, "Poprawne nazwy plików.");   

  //   });
  // });

  //          QUnit.module('async fun', function() {
  //   QUnit.test('IsFileEmpty', function(assert) {
  //          assert.equal(upload_checkFileName(["pl124435ic.zipek"]), true, "Poprawne nazwy plików.");   

  //   });
  // });

  //       QUnit.module('IsFileEmptyFAILURE', function() {
  //   QUnit.test('IsFileEmptyFAILURE', function(assert) {
  //          assert.equal(upload_checkFileName(["pl124435ic.zipek"]), true, "Poprawne nazwy plików.");  
  //   });
  // });
//   var title = document.getElementById('pageTitle').innerText;
//     assert.equal(title, 'John, Faiza and Stan');
