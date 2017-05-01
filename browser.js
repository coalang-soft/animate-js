function playTimeline(tl, action, timer, loop){
    function act(time){
        if(time > tl.getMaxTime()){
            //reset time if loop is true
            if(loop){
                while(time > tl.getMaxTime()){
                    time = time - tl.getMaxTime();
                }
            }else{
                return;
            }
        }
        action(tl.findKeyframeSet(time).numberAt(time));
        requestAnimationFrame(act.bind(this, timer(time)));
    }
    requestAnimationFrame(act.bind(this, timer()));
}
