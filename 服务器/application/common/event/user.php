<?php
namespace app\common\event;

class User
{
    public function addUser($wechat,$sessionkey,$nickname,$realname,$phone,$identity = 0,$status = 0) {
        $user = model('common/user');
        $user->wechat = $wechat;
        $user->sessionkey = $sessionkey;
        $user->nickname = $nickname;
        $user->realname = $realname;
        $user->phone    = $phone;
        $user->identity = $identity;
        $user->status   =$status;
        $user->save();
        $id = $user->id;
        return $id;
    }    
    
    public function setUserDetail($wechat,$nickname,$realname,$phone) {
        $user = \app\common\model\User::get(['wechat'=>$wechat]);
        $user->nickname = $nickname;
        $user->realname = $realname;
        $user->phone    = $phone;
        $user->status   = 1;
        $user->save();
        $id = $user->id;
        return $id;
    }
    
    public function isUserExist($wechat){
        $u = \app\common\model\User::get(['wechat'=>$wechat]);
        if($u == null){
            return false;
        }else {
            return true;
        }
    }
    
    public function setUserIdentity($u_id,$identity){
        $u = \app\common\model\User::get($u_id);
        $u->identity = $identity;
        return $u->save();
    }
    
    public function getUserInfoByWechat($wechat){
        $u = \app\common\model\User::get(['wechat'=>$wechat]);
        $info['identity'] = $u['identity'];
        $info['id'] = $u['id'];
        $info['status'] = $u['status'];
        $info['nickname'] = $u['nickname'];
        $info['realname'] = $u['realname'];
        $info['wechat'] = $u['wechat'];
        $info['phone'] = $u['phone'];
        if($u['identity'] == 1 || $u['identity'] == 2){
            $info['merchant_id'] = (new \app\common\model\Merchant())->getMerchant($u['id']);
        }
        return $info;
    }
    
    public function getUserCards($id){
        $cards = \app\common\model\Card::where(['user_id'=>$id,'status'=>1])->order("id","desc")->column('id');
        return $cards;
    }
    
    public function getUserHideCards($id){
        $cards = \app\common\model\Card::where(['user_id'=>$id,'status'=>0])->order("id","desc")->column('id');
        return $cards;
    }
}