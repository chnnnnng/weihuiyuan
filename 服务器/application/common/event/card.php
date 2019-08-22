<?php
namespace app\common\event;

class Card
{
    public function create($u_id,$c_id){
        $c = model('common/card');
        $r = $c->where(["cards_id"=>$c_id,"user_id"=>$u_id])->find();
        if($r == null){
            $c->cards_id = $c_id;
            $c->user_id = $u_id;
            $c->initial_date = date("Y年n月j日");
            $id = $c->save();
            return $id;
        }else{
            return false;
        }
        
    }
    
    public function getCardInfo($cid){
        $c = \app\common\model\Card::get(['id'=>$cid]);
        $cards_info = \app\common\model\Cards::get(['id'=>$c['cards_id']]);
        $c['card_name'] = $cards_info['card_name'];
        $c['type'] = $cards_info['type'];
        $c['merchant_id'] = $cards_info['merchant_id'];
        return $c;
    }
    
    public function hideCard($cid){
        $c = \app\common\model\Card::get(['id'=>$cid]);
        $c->status = 0;
        $r = $c->save();
        return $r;
    }
    
    public function recoverCard($cid){
        $c = \app\common\model\Card::get(['id'=>$cid]);
        $c->status = 1;
        $r = $c->save();
        return $r;
    }
    
    public function getCardBill($cid){
        $tm = model('transcation');
        return $tm->where(['card'=>$cid,'visible'=>1])->order('id','desc')->select();
    }
}