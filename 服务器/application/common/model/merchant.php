<?php
namespace app\common\model;
use think\Model;
use think\Db;
class Merchant extends Model 
{
    public function getMember($m_id){
        $users = Db::table('user_merchant_relation')->where('merchant_id',$m_id)->column('user_id');
        return $users;
    }
    
    public function addMember($m_id,$u_id){
        Db::table('user_merchant_relation')->insert(['merchant_id'=>$m_id,'user_id'=>$u_id]);
    }
    
    public function removeMember($u_id){
        Db::table('user_merchant_relation')->where('user_id',$u_id)->delete();
    }
    
    public function getMerchant($u_id){
        return Db::table('user_merchant_relation')->where('user_id',$u_id)->value('merchant_id');
    }
    
    public function getMerchantType(){
        return Db::table('merchant_type')->column('name');
    }
    
    public function isUserOcupied($u_id){
        $r = Db::table('user_merchant_relation')->where('user_id',$u_id)->find();
        if($r == null){
            return false;
        }else{
            return true;
        }
    }
    
}