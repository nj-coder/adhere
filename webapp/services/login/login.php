<?php
header('Content-type: application/json');
//$obj = json_decode($_POST["x"], false);

// initializing variables
$firstname = "";
$lastname = "";
$email    = "";
$usertype = "";
$mentorid = "";
$errors = array(); 


$db = new mysqli("localhost", "root", "", "adhere") or die($this->db->error);

$email = mysqli_real_escape_string($db, $_GET['email']);
$password = mysqli_real_escape_string($db, $_GET['password']);

  if (count($errors) == 0) {
  	//$password = md5($password);
  	
    $query = "SELECT * FROM users WHERE email='$email' AND password='$password'";
  	$results = mysqli_query($db, $query);
  	
      if (mysqli_num_rows($results) == 1) {
          
          $outp = array();
          $outp = $results->fetch_all(MYSQLI_ASSOC);
          
          echo json_encode($outp);

  	}else {
  		array_push($errors, "Wrong username/password combination");
           echo json_encode($errors);
  	}
  }

?>