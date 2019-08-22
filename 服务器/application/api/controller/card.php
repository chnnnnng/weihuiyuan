<?php
namespace app\api\controller;
use app\api\Common;
class Card
{
    public function establish(){
        try {
            $p = request()->param();
            $c = controller('common/cards','event');
            $r= $c->establishCard($p['merchant_id'],$p['card_name'],$p['type']);
            return Common::response(100, "成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    public function create(){
        try {
            $p = request()->param();
            $c = controller('common/card','event');
            $r= $c->create($p['user_id'],$p['card_id']);
            if($r == false){
                return Common::response(105, "不可重新开卡", $r);
            }else{
                return Common::response(100, "成功", $r);
            }
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    public function hideCard(){
        try {
            $p = request()->param();
            $c = controller('common/card','event');
            $r= $c->hideCard($p['card_id']);
            return Common::response(100, "成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    
    public function recoverCard(){
        try {
            $p = request()->param();
            $c = controller('common/card','event');
            $r= $c->recoverCard($p['card_id']);
            return Common::response(100, "成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    
    public function getCardInfo(){
        try {
            $p = request()->param();
            $c = controller('common/card','event');
            $r= $c->getCardInfo($p['card_id']);
            return Common::response(100, "成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    public function getCardBill(){
        try {
            $p = request()->param();
            $c = controller('common/card','event');
            $r= $c->getCardBill($p['card_id']);
            if($r == null){
                return Common::response(106, "", null);
            }else{
                return Common::response(100, "成功", $r);
            }
            
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
}