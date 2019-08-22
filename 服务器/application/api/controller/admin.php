<?php
namespace app\api\controller;
use app\api\Common;
class Admin
{
    public function setIdentity(){
        try {
            $p = request()->param();
            $u = controller('common/user','event');
            $r= $u->setUserIdentity($p['user_id'],$p['identity']);
            return Common::response(100, "成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
}