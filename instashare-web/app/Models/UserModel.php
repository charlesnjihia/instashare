<?php namespace App\Models;

use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'userID';
    protected $allowedFields = ['username','password','createdAt','modifiedAt' ];



    public function getUserLogin($username,$password){

      $db      = \Config\Database::connect();
      $builder = $db->table('users');

      $builder->select('userID,username');

      $query = $builder->getWhere(['username' => $username,'password' => $password]);

      return $query->getRow();

    }

    public function updateUser($userId,$data){

        $db= \Config\Database::connect();
        $builder = $db->table('users');

        $builder->where('userID', $userId);
        $res=$builder->update($data);
        return $res;

    }

}
