<?php
namespace app\common\event;

class Cards
{
    
    /*创设会员卡，权限持有者：商铺管理员*/
    public function establishCard($m_id,$name,$type){
        $c = model('common/cards');
        $c->merchant_id = $m_id;
        $c->card_name = $name;
        $c->type = $type;
        $c->save();
        $id = $c->id;
        return $id;
        
    }
    
    /*查看会员卡，权限持有者：商铺管理员*/
    public function getCards($m_id){
        $c = \app\common\model\Cards::where(['merchant_id'=>$m_id])->select();
        return $c;
    }
    
    /*分析会员卡数据，权限持有者：商铺管理员*/
    public function analyseCards($m_id){
        
    }
    
    /*查询会员卡发出数*/
    public function countCards($cards_id){
        
    }
}