<?php
namespace app\api\controller;
use app\api\Common;
class Transcation
{
    
    public function makePretranscation(){
        try {
            $p = request()->param();
            $tm = model("transcation");
            $r = $tm->make($p['user'],$p['card'],(int)$p['type'],$p['time'])->getId();
            return Common::response(100, "成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "预交易发生位置错误", null);
        }
    }
    public function checkStatus(){
        try {
            $p = request()->param();
            $r =  \app\common\model\Transcation::where('id',$p['transcation_id'])->value('status');
            return Common::response(100, "", $r);
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
//     public function setDone(){
//         try {
//             $p = request()->param();
//             $tm =  \app\common\model\Transcation::get($p['transcation_id']);
//             $tm->setDone($p['time']);
//             return Common::response(100, "", $tm->getId());
//         } catch (Exception $e) {
//             return Common::response(0, "失败", null);
//         }
//     }
    public function setConfirmed(){
        try {
            $p = request()->param();
            $tm =  \app\common\model\Transcation::get($p['transcation_id']);
            $tm->setConfirmed($p['mark'],$p['time']);
            return Common::response(100, "", $tm->getId());
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    public function setCancelled(){
        try {
            $p = request()->param();
            $tm =  \app\common\model\Transcation::get($p['transcation_id']);
            $tm->setCancelled(time());
            return Common::response(100, "", $tm->getId());
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    public function setScaned(){
        try {
            $p = request()->param();
            $tm =  \app\common\model\Transcation::get($p['transcation_id']);
            $tm->setScaned($p['time']);
            return Common::response(100, "", $tm->getId());
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    public function getTranscationInfo(){
        try {
            $p = request()->param();
            $tm =  \app\common\model\Transcation::get($p['transcation_id']);
            return Common::response(100, "成功", $tm);
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    
}