<?php
namespace app\api\controller;
use app\api\Common;
class Merchant
{
    /**
     *在运营人员赋权后，商铺管理人员注册一个商铺
     *参数
     *user_id   商铺管理人员user_id
     *name      商铺名
     *location  地理位置（中文描述即可）
     *validity  合同有效期，单位为xx天
     *type      商铺类型，具体见字典
     *
     *返回merchant_id
     ***/
    public function register(){
        try {
            $p = request()->param();
            $m = controller('common/merchant','event');
            $r= $m-> registerMerchant($p['user_id'],$p['name'],$p['location'],$p['validity'],$p['type']);
            if($r == false){
                return Common::response(1, "失败", "无权限");
            }else{
                return Common::response(100, "成功", $r);
            }
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    
    /**
     *商铺管理人员修改商铺信息 
     *参数
     *user_id   商铺管理人员user_id
     *merchant_id   商铺id
     *name      商铺名
     *location  地理位置（中文描述即可）
     *type      商铺类型，具体见字典
     ***/
    public function update(){
        try {
            $p = request()->param();
            $m = controller('common/merchant','event');
            $r= $m-> updateMerchant($p['user_id'],$p['merchant_id'],$p['name'],$p['location'],$p['type']);
            if($r == false){
                return Common::response(1, "失败", "无权限");
            }else{
                return Common::response(100, "成功", $r);
            }
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    /**
     * 获取商铺一般信息
     * 参数:merchant_id
     * **/
    public function getMerchantInfo(){
        try {
            $p = request()->param();
            $m = controller('common/merchant','event');
            $r= $m->getMerchant($p['merchant_id']);
            return Common::response(100, "成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    /**
     *  获取商铺员工
     *  参数merchant_id
     * **/
    public function getMember(){
        try {
            $p = request()->param();
            $m = controller('common/merchant','event');
            $r= $m->getMerchantMember($p['merchant_id']);
            return Common::response(100, "成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    /**
     * 增添一个员工
     * 参数:user_id，merchant_id,user_realname
     * **/
    public function addMember(){
        try {
            $p = request()->param();
            $m = controller('common/merchant','event');
            $r= $m->addMerchantMember($p['user_id'],$p['merchant_id'],$p['user_realname']);
            if($r == 1){
                return Common::response(100, "成功", null);
            }else if ($r == 2){
                return Common::response(0, "验证失败", null);
            }else{
                return Common::response(0, "该用户已占用", null);
            }
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    /**
     * 删除一个员工
     * 参数:user_id
     * **/
    public function removeMember(){
        try {
            $p = request()->param();
            $m = controller('common/merchant','event');
            $r= $m->removeMerchantMember($p['user_id']);
            return Common::response(100, "成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    /**
     * 充值积分
     * 参数：card_id,credit
     * **/
    public function plusCredit(){
        try {
            $p = request()->param();
            $m = controller('common/merchant','event');
            $r= $m->plusCredit($p['card_id'],$p['credit']);
            if($p['transcation_id'] == ''){
                $tm = new \app\common\model\Transcation();
                $tm->makeActiveTranscation($p['card_id'], 2, time(), 1 , $p['credit']);
            }else {
                $tm =  \app\common\model\Transcation::get($p['transcation_id']);
                $tm->setDone(time(),$p['credit']);
            }
            return Common::response(100, "积分成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "积分失败，发生未知错误", null);
        }
    }
    
    /**
     * 扣除积分
     * 参数：card_id,credit
     * **/
    public function minusCredit(){
        try {
            $p = request()->param();
            $m = controller('common/merchant','event');
            $r= $m->minusCredit($p['card_id'],$p['credit']);
            $tm =  \app\common\model\Transcation::get($p['transcation_id']);
            $tm->setDone(time(),$p['credit']);
            return Common::response(100, "积分消费成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "积分消费失败，发生未知错误", null);
        }
    }
    
    
    /**
     * 充值余额
     * 参数：card_id,credit
     * **/
    public function plusBalance(){
        try {
            $p = request()->param();
            $m = controller('common/merchant','event');
            $r= $m->plusBalance($p['card_id'],$p['balance']);
            if($p['transcation_id'] == ''){
                $tm = new \app\common\model\Transcation();
                $tm->makeActiveTranscation($p['card_id'], 0, time(), 1 , $p['balance']);
            }else {
                $tm =  \app\common\model\Transcation::get($p['transcation_id']);
                $tm->setDone(time(),$p['balance']);
            }
            return Common::response(100, "充值成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "充值失败，发生未知错误", null);
        }
    }
    
    /**
     * 扣除余额
     * 参数：card_id,credit
     * **/
    public function minusBalance(){
        try {
            $p = request()->param();
            $m = controller('common/merchant','event');
            $r= $m->minusBalance($p['card_id'],$p['balance']);
            $tm =  \app\common\model\Transcation::get($p['transcation_id']);
            $tm->setDone(time(),$p['balance']);
            return Common::response(100, "收款成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "扣款失败，发生未知错误", null);
        }
    } 
    
    /**
     * 查看当前店铺有哪些卡
     * 参数：card_id,
     * **/
    public function getCardsIds(){
        try {
            $p = request()->param();
            $m = controller('common/cards','event');
            $r= $m->getCards($p['merchant_id']);
            if($r == null){
                return Common::response(103, "成功", "没有任何会员卡");
            }else {
                return Common::response(104, "成功", $r);
            }
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    
    /**
     * 获取商铺分类表
     * 参数：
     * **/
    public function getMerchantTypes(){
        try {
            $m = new \app\common\model\Merchant();
            $r = $m->getMerchantType();
            return Common::response(100, "", $r);
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
}