<?php
include 'Config.php';


class FileZipper{

  function __construct(){}




/*
 getUnzippedFiles function process all unzipped files
 @param none


 @return null

*/
 function getUnzippedFiles(){



   $conn=$this->getDbConnection();


   if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
     }
    //get all unzipped records
     $sql="SELECT fileID,serverFileName,fileType FROM sharedfiles WHERE zipUrl IS NULL AND fileStatus=".Config::ACTIVEFILESTATUS;

     $result = $conn->query($sql);

     if ($result->num_rows > 0) {

     while($row = $result->fetch_assoc()) {

       //call the zip function with the filepath
        $serverFilename=$row["serverFileName"];
        //explode $serverfilename to get filename without extension
      //  $serverFilename=explode(".",$serverFilename);
      //  $serverFilename=$serverFilename[0];


        $fileType=$row["fileType"];
        $fileId=$row["fileID"];
        $filePath=Config::FILEPATH.$serverFilename;
       //echo $filePath."<br>";
       $zipRes= $this->zipFile($filePath,$serverFilename,$fileType);
      // var_dump($zipRes);


      if($zipRes){
        //update the zip column with the zip path

        $zipUrl=Config::ZIPRURL.$serverFilename.".zip";
        $updateRes=$this->updateZipUrl($fileId,$zipUrl,$conn);
         }

       }
} else {
  //execution ends as there is no file to process

}

$conn->close();
 }


 /*
  updatefile function add a zip file to the server
  @param filePath string
  @param serverfileName  string
  @param fileType string

  @return boolean

 */

 function zipFile($filePath,$serverFilename,$fileType){
   $zipPath=Config::ZIPPATH;




   $zipPath.=$serverFilename.".zip";
    
   $zip = new \ZipArchive();
   $res=false;
   if ($zip->open($zipPath, ZipArchive::CREATE) === TRUE)
    {
     // Add file to the zip file
     $res=$zip->addFile($filePath,$serverFilename);


     $zip->close();
     }

   return $res;

 }


 /*
  updateZipUrl function to update zip server path on db
  @param fileId int
  @param zipUrl string
  @param conn db connection

  @return boolean

 */
 function updateZipUrl($fileId,$zipUrl,$conn){
	 
	 $dateModified=date('Y-m-d h:i:s', time());

   $sql="UPDATE sharedfiles SET zipUrl='$zipUrl', modifiedAt='$dateModified' WHERE fileID=$fileId";

     try{
       if ($conn->query($sql) === TRUE) {
          return true;
            } else {
          return false;
            }


     }catch(Exception $e){
       return false;
     }

 }



 /*
  getDbConnection function to obtain db connection resource


  @return conn dbConnection

 */
function getDbConnection(){

  $dbusername=Config::DBUSERNAME;
  $dbPass=Config::DBPASSWORD;
  $dbHost=Config::DBHOST;
  $dbName=Config::DATABASE;
  try{
  $conn = mysqli_connect($dbHost, $dbusername, $dbPass,$dbName);
  return $conn;
}catch(Exception $e){
  return false;
}


}




}

$fileZipper=new FileZipper();
$fileZipper->getUnzippedFiles();
