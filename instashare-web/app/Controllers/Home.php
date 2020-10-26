<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
use App\Models\FileModel;

Header('Access-Control-Allow-Origin: *'); //for allow any domain, insecure
Header('Access-Control-Allow-Headers: *'); //for allow any headers, insecure
Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE'); //method allowed
//Access-Control-Max-Age: 86400
class Home extends ResourceController
{
	use ResponseTrait;
	
	



//fiunction to allow CORS
public function options()
    {
        return $this->response->setHeader('Access-Control-Allow-Origin', '*') //for allow any domain, insecure
            ->setHeader('Access-Control-Allow-Headers', '*') //for allow any headers, insecure
            ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE') //method allowed
            ->setStatusCode(200); //status code
    }




	/*
   getAllFiles function to get all files for the community website


   @return array

  */
  public function getAllFiles(){
  $fileModel=new FileModel();
	$files=$fileModel->where('fileStatus',1)->orderBy('fileID', 'DESC')->findAll();
  $response=null;
	//if counter greater than zero return success message else not content found
   if(count($files)>0){
		 $response=array(
      "status"=>200,
			"message"=>"Files fetched successfully",
			"data"=>$files

		);
	 }else{
		 $response=array(
 		 "status"=>204,
 		 "message"=>"Files not found",
 		 );

	 }


	return $this->respond($response);


  }



	/* create user function to create a new user
	  @params  username,
		@param password
		@return userArray

	*/
 public function createUser(){

    $userModel=new UserModel();
		$userData = json_decode(trim(file_get_contents('php://input')), true);
	  //find if username exists
		 $response=null;
		 $user = $userModel->where('username', $userData["username"])->first();
    //if username does not exist then add user
		 if($user==null){
				//encrypty user Password
				 $userData["password"]=md5($userData["password"]);
				//replace Password
				 $userId =$userModel->insert($userData);
		     if($userId>0){
					 $response=array(
		        "status"=>200,
		 			  "message"=>"User created successfully",
						"userid"=>$userId
					 		);
		      }else{
						$response=array(
		          "status"=>501,
		  			  "message"=>"An error occured please try again"

		 			 		);
		        }

			 }else{
		  //return conflict response
        $response=array(
       "status"=>409,
			 "message"=>"A user with the same username already exists"

			);



			 }




	    return $this->respond($response);

 }



/*
 login function to login user
  @param username
	@param password

 */
 public function login(){
	 $userModel=new UserModel();
	 $userData = json_decode(trim(file_get_contents('php://input')), true);
	 $userData["password"]=md5($userData["password"]);
	 //find if username exists
	 $response=null;
	 $user = $userModel->where(['username'=>$userData["username"],"password"=>$userData["password"]])->first();
	 if($user!=null){
		 $savedUser=array(
      "username"=>$user["username"],
			"userid"=>$user["userID"]

		 );
		$response=array(
			"status"=>200,
			"message"=>"User obtained",
			"userDetails"=>$savedUser
    	);

	 }else{
		 $response=array(
 			"status"=>204,
 			"message"=>"User not found",
 			);


	 }
	 return $this->respond($response);


 }




 /*
  storeFile function to save an uploaded file
	@param fileName
	@param file
	@param fileDescription
	@param userID
	@return fileId

 */
 public function storeFile(){
	 $data = [
		                 'userID' => $this->request->getVar('userid'),
						'fileName' => $this->request->getVar('filename'),
						'fileDescription'  => $this->request->getVar('filedescription'),
				];


    $response=null;
		 $uploadedFile = $this->request->getFile('doc');
		 //process file
		 $sizeIn="bytes";
		 $data["fileType"]=$uploadedFile->getExtension();
		 $data["fileSize"]=$uploadedFile->getSize();
		 if($data["fileSize"]/1024 > 1){
			 $sizeInKbs=round($data["fileSize"]/1024,2);
			 $sizeIn="KB";
			 if($sizeInKbs/1024 >1){
				 $data["fileSize"]=round($sizeInKbs/1024,2);
				 $sizeIn="MB";

			 }else{
				 $data["fileSize"]=$sizeInKbs;

			 }
		 }
		  $data["fileSize"].=" ".$sizeIn;
			//getuniquename for the file for storage
			$fileName=$this-> randomString().".".$data["fileType"];
			$data['serverFileName']=$fileName;
	 	  $data['fileUrl']=base_url('sharedfiles/'.$fileName);
			//move file to sharedfiles folder
			$uploadRes=$uploadedFile->move('../public/sharedfiles/', $fileName);

       //if file uploaded successfully update the db file record
			if($uploadRes){
      //add the file details into the db
			$fileModel=new FileModel();
			$fileId =$fileModel->insert($data);
			if($fileId>0){
      $data["fileId"]=$fileId;
			$response=array(
 			 "status"=>200,
 			 "message"=>"File uploaded successfully",
			 "filedetails"=>$data
 		 );




			}else{
       //error occured during database insert return error message
			 $response=array(
				 "status"=>500,
				 "message"=>"An error occured please try again"
			 );

			}


		}else{
			//error occured during upload return error message
     $response=array(
			 "status"=>500,
			 "message"=>"An error occured please try again"
		 );


		}

   return $this->respond($response);
 }


/*
  getFile function fetch one file
  @param fileId
 
  @return array

 */
public function getUpdatedFile($fileId){
$fileModel=new FileModel();
$file=$fileModel->where('fileID', $fileId)->first();		
return $file;		
	
	
}
 /*
  updateFile function to update stored file
  @param fileName
  @param doc
  @param fileDescription
  @param userID
  @return fileId

 */
 public function updateFile(){

	 $fileId=$this->request->getVar('fileid');
	 $data = [
						'fileName' => $this->request->getVar('filename'),
						'fileDescription'  => $this->request->getVar('filedescription'),
						'fileStatus' => $this->request->getVar('filestatus'),
						'modifiedAt' => date('Y-m-d h:i:s', time())
				];


    $response=null;

		 $uploadedFile = $this->request->getFile('doc');
		 if($uploadedFile){
		 //process file(upload file) then add file details
		 $sizeIn="bytes";
		 $data["fileType"]=$uploadedFile->getExtension();
		 $data["fileSize"]=$uploadedFile->getSize();
		 if($data["fileSize"]/1024 > 1){
			 $sizeInKbs=round($data["fileSize"]/1024,2);
			 $sizeIn="KB";
			 if($sizeInKbs/1024 >1){
				 $data["fileSize"]=round($sizeInKbs/1024,2);
				 $sizeIn="MB";

			 }else{
				 $data["fileSize"]=$sizeInKbs;

			 }
		 }
		  $data["fileSize"].=" ".$sizeIn;
			//getuniquename for the file for storage
			$fileName=$this-> randomString().".".$data["fileType"];
	 	  $data['fileUrl']=base_url('sharedfiles/'.$fileName);
			$data['serverfilename']=$fileName;
			//update zip file record to null
			$data['zipUrl']=null;
			//move file to sharedfiles folder
			$uploadRes=$uploadedFile->move('../public/sharedfiles/', $fileName);




     //if file uploaded successfully update the db file record
			if($uploadRes){

			$fileModel=new FileModel();
			$updateRes =$fileModel->updateFile($fileId,$data);
			if($updateRes){

			$response=array(
 			 "status"=>200,
 			 "message"=>"File updated successfully",
			 "filedetails"=>$data
 		 );

			}else{
       //error occured during database insert return error message
			 $response=array(
				 "status"=>500,
				 "message"=>"An error occured please try again"
			 );

			}


		}else{
			//error occured during upload return error message
     $response=array(
			 "status"=>500,
			 "message"=>"An error occured please try again"
		 );


		}
	}else{
    //update only the submit file details without changing the uploaded file
		$fileModel=new FileModel();
		$updateRes =$fileModel->updateFile($fileId,$data);
		if($updateRes){
			
		$newFile=$this->getUpdatedFile($fileId);
		
		$newFile['fileID']=($fileId);

		$response=array(
		 "status"=>200,
		 "message"=>"File updated successfully",
		 "filedetails"=>$newFile
	 );

		}else{
		 //error occured during database insert return error message
		 $response=array(
			 "status"=>500,
			 "message"=>"An error occured please try again"
		 );

		}



	}
	
  
   return $this->respond($response);




 }


 /*
getUserFiles function to get all files for a given user
  @param userId

  @return array

 */
 public function getUserFiles(){
   //get userid from json input
	 $userData = json_decode(trim(file_get_contents('php://input')), true);
	 $fileModel=new FileModel();
	 $files=$fileModel->where('userID',$userData["userid"])->orderBy('fileID', 'DESC')->findAll();
	 $response=null;
	 //if counter greater than zero return success message else not content found
		if(count($files)>0){
			$response=array(
			 "status"=>200,
			 "message"=>"Files fetched successfully",
			 "data"=>$files

		 );
		}else{
			$response=array(
			"status"=>204,
			"message"=>"Files not found",
			);

		}


	 return $this->respond($response);


 }

 function randomString($length=12) {
	$key='';
	$keys = array_merge(range('a', 'z'), range('A', 'Z'));
	for($i=0; $i < $length; $i++) {
			$key .= $keys[array_rand($keys)];
	}
	return $key;
}




}
