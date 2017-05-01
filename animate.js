(function(global){
    function linearInterpolate(a,b,t){
        return a*(1-t)+b*t;
    }
    function Keyframe(number, time){
        this.number = number;
        this.time = time;
    }
    function Timeline(keyframes){
        var maxTime = 0;
        for(var i = 0; i < keyframes.length; i++){
            var t = keyframes[i].time;
            if(t > maxTime){
                maxTime = t;
            }
        }
        this.getMaxTime = function(){
            return maxTime;
        }
        this.findKeyframeSet = function(time){
            var gtr, lss;
            for(var i = 0; i < keyframes.length; i++){
                var num = keyframes[i];
                if(num.time < time){
                    //try to fill lss
                    if(!lss){
                        lss = num;
                    }else if(lss.time < num.time){
                        lss = num;
                    }
                }else if(num.time > time){
                    //try to fill gtr
                    if(!gtr){
                        gtr = num;
                    }else if(gtr.time > num.time){
                        gtr = num;
                    }
                }else if(num.time == time){
                    //match found
                    return new KeyframeSet([num]);
                }
            }
            return new KeyframeSet([lss,gtr]);
        };
    }
    function KeyframeSet(raw){
        this.numberAt = function(time){
            if(raw.length == 1){
                if(raw[0].time == time){
                    return raw[0].number
                }else{
                    throw new Error("Keyframe and parameter time have to be the same!");
                }
            }else if(raw.length == 2){
                var t = (time - raw[0].time) / (raw[1].time - raw[0].time);
                return linearInterpolate(raw[0].number, raw[1].number, t);
            }else{
                throw new Error("Unsupported set length: " + raw.length);
            }
        };
    }
    
    global.Animate = {
        Timeline:Timeline,
        Keyframe:Keyframe
    };
    
})(this);
