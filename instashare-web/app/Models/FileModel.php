<?php namespace App\Models;

use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Model;

class FileModel extends Model
{
    protected $table = 'sharedfiles';

    protected $allowedFields = ['fileID','userID','fileName','fileDescription','fileType','fileSize','serverFileName','fileUrl','zipUrl','fileStatus','createdAt','modifiedAt'];


//function to update file details
  public function updateFile($fileId,$data)
  {

         $db= \Config\Database::connect();
         $builder = $db->table('sharedfiles');

          $builder->where('fileID', $fileId);
          return  $builder->update($data);



    }

}
