<?php

namespace Planner\Models;

class UserModel extends AbstractModel
{

    protected $modelName = 'users';
    protected $resourceName = 'users';

    public function getPublicFields()
    {
        return ['id','email','id_role','name','firstname','nickname'];
    }

    public function getSearchField() {
        return ['id','email'];
    }

    public function login($email,$password) {
        $userId = $this->getAdapter()->fetchOne('SELECT id FROM '.$this->modelName. ' WHERE email = ? AND password = ?', [$email, hash('sha256',$password)]);
        return $userId;
    }

    public function getOne($id, $field = 'id') {
        $roleModel = new RoleModel();
        $optionsModel = new UserOptionModel();

        $user = parent::getOne($id,$field);

        $user['role'] = $roleModel->getOne($user['id_role']);
        $user['options'] = $optionsModel->getByUser(($user['id']));

        unset($user['id_role']);

        return $user;
    }

}