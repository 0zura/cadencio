<?php

namespace Planner\Services;

use Config\Permissions as PermConfig;
use Planner\Models\RoleModel;

class Permissions {

    public function getAvailablesResources() {
        return PermConfig::getResources();
    }

    public function userHasPermission($userId, $resource, $action) {
        $roleModel = new RoleModel();
        $permissions = $roleModel->getPermissionsFromUser($userId);

        return (in_array('*.*',$permissions) || in_array($resource.'.*',$permissions) || in_array($resource.'.'.$action, $permissions));

    }

}