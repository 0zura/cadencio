<?php

namespace Planner\Models;

class RoleModel extends AbstractModel {

    protected $modelName = 'roles';


    public function getFromUser($idUser) {
        $role =  $this->getAdapter()->fetchRow('SELECT '.$this->modelName.'.* FROM '.$this->modelName.' JOIN users ON '.$this->modelName.'.id = users.id_role WHERE users.id = ? ', [$idUser]);
        $role['permissions'] = $this->getPermissionsFromRole($role['id']);
        return $role;
    }

    public function getPermissionsFromRole($idRole) {
        $permissions = $this->getAdapter()->fetchAll('SELECT * FROM roles_resources WHERE id_role = ?', [$idRole]);
        $output = [];
        foreach($permissions as $permission) {
            $output[] = $permission['resource_name']. '.'. $permission['resource_right'];
        }
        return $output;
    }

    public function getPermissionsFromUser($idUser) {
       $role = $this->getFromUser($idUser);
       return $this->getPermissionsFromRole($role['id']);
    }

    public function getOne($id, $field = 'id') {

        $role = parent::getOne($id,$field);

        $role['permissions'] = $this->getPermissionsFromRole($role['id']);

        return $role;
    }

    public function addPermission($idRole, $resource,$right) {
        $this->getAdapter()->query('INSERT INTO roles_resources(id_role,resource_name,resource_right) VALUES(?,?,?)', [$idRole,$resource,$right]);
    }

    public function removePermission($idRole, $resource,$right) {
        $this->getAdapter()->query('DELETE FROM roles_resources WHERE id_role = ? AND resource_name = ? AND resource_right = ?', [$idRole,$resource,$right]);
    }





}