<?php
namespace app\common\model;
use think\Model;
class Transcation extends Model 
{
    public function make($user,$card,$type = 0,$time){
        $this->save(['user'=>$user,'card'=>$card,'type'=>$type,'time'=>$time,'status'=>0]);
        return $this;
    }
    
    public function makeActiveTranscation($card,$type,$time,$status,$amount){
        $this->save(['card'=>$card,'type'=>$type,'time'=>$time,'status'=>$status,'amount'=>$amount,'mark'=>'','visible'=>1]);
        return $this;
    }
    
    public function getId(){
        return $this->getAttr('id');
    }
    
    public function getStatus(){
        return $this->getAttr('status');
    }
    
    public function setDone($time,$amount){
        $this->save(['time'=>(int)$time,'amount'=>$amount,'status'=>1,'visible'=>1]);
        return $this;
    }
    
    public function setConfirmed($mark = '',$time){
        $this->save(['time'=>(int)$time,'mark'=>$mark,'status'=>2,'visible'=>1]);
        return $this;
    }
    
    public function setCancelled($time){
        $this->time = $time;
        $this->status = 3;
        $this->save();
        return $this;
    }
    
    public function setScaned($time){
        $this->time = $time;
        $this->status = 5;
        $this->save();
        return $this;
    }
    
    public function setError($time){
        $this->time = $time;
        $this->status = 4;
        $this->visible = 1;
        $this->save();
        return $this;
    }
}