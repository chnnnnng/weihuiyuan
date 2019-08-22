<?php
namespace app\common\event;

class Merchant
{
    /*注册商铺，权限持有者：商铺管理员与运营人员*/
    public function registerMerchant($owner_id,$name,$location,$c_v,$type){
        $i = \app\common\model\User::where('id',$owner_id)->value('identity');
        if($i >= 2){//如果有权限
            $m = model("common/merchant");
            $m->owner_id = $owner_id;
            $m->name = $name;
            $m->location = $location;
            $m->contract_start_date = date('Y-m-d');
            $m->contract_validity = $c_v;//单位：天
            $m->contract_terminal_date = date('Y-m-d',time()+$c_v*86400);
            $m->type = $type;
            $id = $m->save();
            return $id;
        }else{
            return false;
        }
    }
    
    /*修改商铺信息，权限持有者：商铺管理员与运营人员*/
    public function updateMerchant($u_id,$m_id,$name,$location,$type){
        $i = \app\common\model\User::where('id',$u_id)->value('identity');
        if($i >= 2){//如果有权限
            $m = \app\common\model\Merchant::get($m_id);
            $m->name = $name;
            $m->location = $location;
            $m->type = $type;
            $id = $m->save();
            return $id;
        }else{
            return false;
        }
    }
    
    /*查看商铺信息，权限持有者：一切*/
    public function getMerchant($m_id){
        $m = \app\common\model\Merchant::get($m_id);
        return $m;
    }
    
    /*查看商铺成员，权限持有者：商铺员工，商铺管理员，运营人员*/
    public function getMerchantMember($m_id){
        $m = new \app\common\model\Merchant();
        $userids = $m->getMember($m_id);
        $members = [];
        foreach ($userids as $v){
            $u = \app\common\model\User::where('id',$v)->find();
            $members[] = ['id'=>$v,'name'=>$u['nickname'],'identity'=>$u['identity']];
        }
        return $members;
    }
    
    /*新增商铺员工，权限持有者：商铺管理员*/
    public function addMerchantMember($u_id,$m_id,$u_realname){
        $i = \app\common\model\User::where('id',$u_id)->value('realname');
        if($i == $u_realname){
            $m = new \app\common\model\Merchant();
            if($m->isUserOcupied($u_id)){
                return 3;
            }else{
                $m->addMember($m_id, $u_id);
                $u = model("common/user")->get($u_id);
                if($u->identity == 0){$u->identity = 1;$u->save();}
                return 1;
            }           
        }else {
            return 2;
        }
    }
    
    /*删除商铺员工，权限持有者：商铺管理员*/
    public function removeMerchantMember($u_id){
        $m = new \app\common\model\Merchant();
        $m->removeMember($u_id);
        $u = model("common/user")->get($u_id);
        if($u->identity == 1){$u->identity = 0;$u->save();}
    }
    
    /*充值积分，权限持有者：商铺员工，商铺管理员*/
    public function plusCredit($c_id,$v){
        $c = \app\common\model\Card::get($c_id);
        $before = $c->credit;
        $c->credit = $before+$v;
        $c->save();
        return $c->credit;
    }
    /*扣除积分，权限持有者：商铺员工，商铺管理员*/
    public function minusCredit($c_id,$v){
        $c = \app\common\model\Card::get($c_id);
        $before = $c->credit;
        $c->credit = $before-$v;
        $c->save();
        return $c->credit;
    }
    /*充值余额，权限持有者：商铺员工，商铺管理员*/
    public function plusBalance($c_id,$v){
        $c = \app\common\model\Card::get($c_id);
        $before = $c->balance;
        $c->balance = $before+$v;
        $c->save();
        return $c->balance;
    }
    /*充值扣除，权限持有者：商铺员工，商铺管理员*/
    public function minusBalance($c_id,$v){
        $c = \app\common\model\Card::get($c_id);
        $before = $c->balance;
        $c->balance = $before-$v;
        $c->save();
        return $c->balance;
    }
}