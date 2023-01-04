
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="utf-8"/>
    <meta name="description" content=""/>
    <meta name="keywords" content=""/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <link rel="stylesheet" type="text/css" href="styler.css"/>
        <link rel="stylesheet" type="text/css" href="iconstyle.css"/>
    <link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.14.0.css">

<link rel="stylesheet" href="css/fontello.css" type="text/css" />


    <title>index.php</title>
</head>


<body>
	<header>
		<div class="headercontainer">
			
			<div class="logo">

<!-- 				<a href="../index.php"><img src="../img/logoxd.png" alt="LOGO"/></a>
 -->				<span>KT Games</span> 
					
				
				
			</div>
	
			
	<div class="accountments">


		<div class="logowanie">
			<a href="../php/login.php"><div class="login">
				  <i class="icon-user"></i>
				<?php
				if ((isset($_SESSION['zalogowany'])) && ($_SESSION['zalogowany']==true))
				{
					$x = $_SESSION['login'];
									echo "	<span>LOGOUT ($x) </span> 	 ";

				}
				else{
					echo "	<span>LOGOWANIE</span> 	 ";
				}

?>
				
			</div></a>

			<a href="../php/register.php"><div class="login">
				  <i class="icon-user"></i>
				<span>REJESTRACJA </span> 	 	
			</div></a>

<?php
				if ((isset($_SESSION['zalogowany'])) && ($_SESSION['zalogowany']==true))
				{
					echo "
			<a href='../php/userdata.php'><div class='login'>
				<i class='fa fa-shopping-bag' style='font-size:15px'></i>
				<span>TWOJE KONTO</span> 	 	
			</div></a>
";

				}
			

?>
		</div>

		<!-- div style="height:10px"></div> -->

		<div class="menu">

			<ul>

				<li><a href="../index.php">AKTUALNOŚCI</a></li>
 				<li><a href="../php/scamers.php">AUKCJE</a></li>
				<li><a href="../php/nabytki.php" style="text-decoration: underline;   text-decoration-color: #ffc000;">PLIKI</a></li>
				<li><a href="../php/chatbox.php">CHATBOX (BETA)</a></li>
				<li><a href="../php/statystki.php">KURSY WALUT</a></li>

			</ul>

		</div>
	</div>




</div>
</header>




<br><Br>
<article class="mainContent">
	<div class="logoArt">
 	</div>
<span> WIDOK ZDAWANIA PLIKÓW PRZEZ UCZNIA </span>
<HR/>

<div class="content">


<div class="allfiles">
	<div class="menutoedit" style='display: none;'>
	</div>
	<?php


	echo '
	<div id="drop_file_zone" ondrop="upload_file(event)" ondragover="return false">
    <div id="drag_upload_file">
        <p>Przenieś tutaj plik z zadaniem.</p>
        <input type="button" value="albo wybierz plik / pliki (MAX 125MB)" onclick="file_explorer" class="selectfilebtn" />
        <input type="file" id="selectfile" multiple />
        ';
    // } ?>
     
    </div>
   
</div>
<?php

echo "<h3>PLIKI W FOLDERZE /FILES : </h3>";
$arrFiles = array();
$objDir = dir("files");
 
while (false !== ($entry = $objDir->read())) {
		if($entry !== "." && $entry !== ".."){

		
   $arrFiles[] = $entry;
   echo "<a href='files/$entry'>".$entry."</a><br>";
}

}
 
$objDir->close();


 ?>

</div>









</article>


<footer>
<div class="jointoNewsLetter">

<FORM METHOD="POST" ACTION="jointoNewsLetter.php">
<Label for="email"> Zapisz się do Newslettera już dzisiaj i otrzymuj najnowsze informacje ze strony! </Label>
<input type="text" placeholder="Podaj email..." id="email" name="email"/>
<input type="submit" value="ZAPISZ SIĘ!"/>
</FORM>

</div>

<div class="footerall">
<div class="socialmedias">
<a href="#" class="fa fa-facebook"></a>
<a href="#" class="fa fa-twitter"></a>
<a href="#" class="fa fa-google"></a>
<a href="#" class="fa fa-instagram"></a>
<a href="#" class="fa fa-youtube"></a>


</div>

<div class="contact">
	<h2> KONTAKT </h2>
<dl>
     <dt>Address</dt>
        <dd>
  </dl><dl>
 <dt>Tel</dt>
        <dd>(619) 265-0107</dd> <dd>Fax: (619) 265-8655</dd>
  </dl>
</div>
</div>




<br/> <br/> <br/>
<div class="info">
@Wszelkie prawa zastrzeżone 2022 @KT PROGRAMMER
</div>
</footer>	


<script src="filesupload.js"> </script>



</body>


</html>