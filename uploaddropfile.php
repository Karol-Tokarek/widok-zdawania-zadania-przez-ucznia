<?php
// require_once "connect.php";

// 	$conn = @new mysqli($host, $db_user, $db_password, $db_name);

// ini_set("upload_max_filesize","300M");
// ini_set("post_max_size","300M");
// ini_set("max_input_time","0");

// if(isset($_POST['rodzaj']))
// {


// $rodzaj = $_POST['rodzaj'];
// $filename2 = $_POST['filename2'];
// $idd2 = $_SESSION['id'];


if(isset($_FILES['file'])){
foreach ($_FILES['file']['name'] as $key=>$val) {
    $filename = $_FILES['file']['name'][$key];
 if(file_exists('files/'.$filename)){
 	try {
    move_uploaded_file($_FILES['file']['tmp_name'][$key], 'files/'.''.$idd.'-'.$filename);
}

	catch(Exception $e)
	{
		die ('File did not upload: ' . $e->getMessage());
		echo 'File did not upload: ' . $e->getMessage();
	}
	$filesize = filesize('../files/'.''.$idd.'-'.$filename); // bytes
	$filesize = round($filesize / 1024 / 1024, 1);
}
else{
	try {
    move_uploaded_file($_FILES['file']['tmp_name'][$key], 'files/'.''.$idd.'-'.$filename);
}

	catch(Exception $e)
	{
		die ('File did not upload: ' . $e->getMessage());
		echo 'File did not upload: ' . $e->getMessage();
	}
	$filesize = filesize('../files/'.''.$idd.'-'.$filename); // bytes
	$filesize = round($filesize / 1024 / 1024, 1);
}
}
}
else{
	echo "SUCCESS";
}


?>