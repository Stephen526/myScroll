/*
   var myScroll=new myScroll();
    myScroll.scroll({
    end:0,//终点位置 必须大于0
    time:200,//总共耗时
    distance: 0//偏移距离 
  },function(ret){
    console.log(ret.top)
  })
*/

  (function( window, undefined ) {
    "use strict";
    var myScroll = function() {
    };
    var isStop = true;
    var t;
    myScroll.prototype = {
        scroll: function(params,callback){
            this.end = params.end||0;
            this.time = params.time||1000;
            this.distance=params.distance||100;
            var self = this;
            self.start(params,callback)
        },
        start:function(params,callback){
          var self=this;
          var isBottom=false;
          var start=document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
          var disPer30Ms=(self.end-start)/self.time*10;
          var dis=0;
          if(start==self.end||self.end<0){
            return false;
          }
          t=setInterval(function(){ 
            var clientHeight = document.documentElement.scrollTop === 0 ? document.body.clientHeight : document.documentElement.clientHeight;
      var scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
      var scrollHeight = document.documentElement.scrollTop === 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;

      if (scrollHeight-scrollTop-self.distance <= window.innerHeight) {
          isBottom=true;
      }
          if(disPer30Ms>0){
                if(self.end-scrollTop<=0||isBottom){
                self.stop();
                callback({
                  top:scrollTop
                }) ;
                 return false;
           }
         }else{
           if(self.end-scrollTop>=0){
                self.stop();
                callback({
                  top:scrollTop
                });
                 return false;   
           }
         }
            dis=dis+disPer30Ms;
           document.body.scrollTop=start+dis;
           document.documentElement.scrollTop=start+dis;
          },10)

        },
        stop:function(){
          if(t){
                 clearInterval(t);
          }
        }
       
    };
  window.myScroll = myScroll;
})(window);
