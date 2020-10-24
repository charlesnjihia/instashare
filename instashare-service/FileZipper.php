<?php
include 'Config.php';


class FileZipper{

  function __construct(){}
//function to obtain all unzipped files in the database
 function getUnzippedFiles(){

   $conn=$this->getDbConnection();
  // var_dump($conn);
   if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
     }
    //get all unzipped records
     $sql="SELECT fileID,serverFileName FROM sharedfiles WHERE zipUrl IS NULL AND fileStatus=".Config::ACTIVEFILESTATUS." LIMIT 1";
     //echo $sql;
     $result = $conn->query($sql);

     if ($result->num_rows > 0) {
      // output
     while($row = $result->fetch_assoc()) {

       //call the zip function with the filepath
       $serverFilename=$row["serverFileName"];
       $filePath=Config::FILEPATH.$serverFilename;
       //echo $filePath."<br>";
       $this->zipFile($filePath);

    //echo "id: " . $row["fileID"]. " - Name: " . $row["serverFileName"]. " " . $row["serverFileName"]. "<br>";
  }
} else {
  echo "0 results";
}



 }

 function zipFile($filePath){
   $zipPath=Config::ZIPPATH;
   $zip = new \ZipArchive();
   echo $filePath."<br>";
   if ($zip->open('test_new.zip', ZipArchive::CREATE) === TRUE)
 {
     // Add files to the zip file
     $zip->addFile("../instashare/public/sharedfiles/IROsZNwyzAvS.pdf","new.pdf");
    // $zip->addFile('test.pdf');

     // Add random.txt file to zip and rename it to newfile.txt
    // $zip->addFile('random.txt', 'newfile.txt');

     // Add a file new.txt file to zip using the text specified
     //$zip->addFromString('new.txt', 'text to be added to the new.txt file');

     // All files are added, so close the zip file.
     $zip->close();
 }


   /*$x = $zip->open($filePath);
   if ($x === true) {
    $zip->extractTo($zipPath);
    $zip->close();
     }
     */

 //echo Config::PATH;

 }




function getDbConnection(){

  $dbusername=Config::DBUSERNAME;
  $dbPass=Config::DBPASSWORD;
  $dbHost=Config::DBHOST;
  $dbName=Config::DATABASE;
  $conn = mysqli_connect($dbHost, $dbusername, $dbPass,$dbName);
  return $conn;


}




}

$fileZipper=new FileZipper();
$fileZipper->getUnzippedFiles();
