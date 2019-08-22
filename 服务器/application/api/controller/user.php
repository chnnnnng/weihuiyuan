<?php
namespace app\api\controller;
use app\api\Common;
class User
{
    
/**
 * 用户信息相关
 * **/
    
    public function add(){
        try {
            $p = request()->param();
            $u = controller('common/user','event');
            $r= $u->addUser($p['wechat'],$p['sessionkey'], $p['nickname'], $p['password']);
            return Common::response(100, "成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    public function check(){
        try {
            $p = request()->param();
            $u = controller('common/user','event');
            $r= $u->isUserExist($p['wechat']);
            return Common::response(100, "成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    public function login(){
        try {
            $p = request()->param();
            $code = $p['code'];
            $res = Common::http("https://api.weixin.qq.com/sns/jscode2session?appid=wxb61024bc25db827d&secret=632a8fdced52eca70346605a47e42c7c&js_code=".$code."&grant_type=authorization_code");
            if($res == false){
                return Common::response(0, "失败", null);
            }else{
                $res = json_decode($res);
                //dump($res);
                if(isset($res->errcode)){
                    return Common::response(0, "失败", null);
                }else{
                    $wechat = $res->openid;
                    $sessionkey = $res->session_key;
                    $u = controller('common/user','event');
                    $r= $u->isUserExist($wechat);
                    if($r == true){//已有记录
                        $userinfo= $u->getUserInfoByWechat($wechat);
                        if($userinfo['status'] == 0){
                            return Common::response(102, "请完善信息", $wechat);
                        }else if($userinfo['status'] == 1){
                            return Common::response(101, "成功", $userinfo);
                        }
                    }else{//第一次使用
                        $u->addUser($wechat,$sessionkey,'','','',0,0);
                        return Common::response(102, "初次使用请完善信息", $wechat);
                    }   
                }
            }
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    public function setUserDetail($wechat,$nickname,$realname,$phone) {
        try {
            $p = request()->param();
            $wechat = $p['wechat'];
            $nickname = $p['nickname'];
            $phone = $p['phone'];
            $realname = $p['realname'];
            $u = controller('common/user','event');
            $r= $u->setUserDetail($wechat,$nickname,$realname,$phone);
            return Common::response(100, "成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    public function getInfoByWechat(){
        try {
            $p = request()->param();
            $u = controller('common/user','event');
            $r= $u->getUserInfoByWechat($p['wechat']);
            return Common::response(100, "成功", $r);
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
/**
 * 用户卡片相关
 * **/
    public function getCards(){
        try {
            $p = request()->param();
            $u = controller('common/user','event');
            $r= $u->getUserCards($p['id']);
            if($r == null){
                return Common::response(103, "成功", "还没有任何会员卡");
            }else {
                $ce = controller('common/card','event');
                foreach ($r as $k=>$cid){
                    $r[$k] = $ce->getCardInfo($cid);
                }
                return Common::response(104, "成功", $r);
            }
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        } 
    }
    
    
    public function getHideCards(){
        try {
            $p = request()->param();
            $u = controller('common/user','event');
            $r= $u->getUserHideCards($p['id']);
            if($r == null){
                return Common::response(103, "成功", "还没有任何隐藏的会员卡");
            }else {
                $ce = controller('common/card','event');
                foreach ($r as $k=>$cid){
                    $r[$k] = $ce->getCardInfo($cid);
                }
                return Common::response(104, "成功", $r);
            }
        } catch (Exception $e) {
            return Common::response(0, "失败", null);
        }
    }
    
    
    
}