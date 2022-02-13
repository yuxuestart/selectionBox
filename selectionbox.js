class SelectionBox{
    constructor(canvas){
        this.canvas = canvas
        this.ctx=this.canvas.getContext("2d"),
        this.boxtransform = {
            x1:null,
            y1:null,
            x2:null,
            y2:null
        }
        this.ismousedown = false,
        this.mousedown = function(e){
            this.ismousedown = true;
            this.boxtransform.x1 = e.pageX-this.canvas.offsetLeft;
            this.boxtransform.y1 = e.pageY-this.canvas.offsetTop;
        }
        this.mouseup=function(){
            if(!this.settings.showBoxAfterSelect){
                this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            }
            this.ismousedown = false;
            if(this.onselect){
                this.onselect();
            }
        }
        this.mousemove=function(e){
            if(this.ismousedown){
                this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
                this.boxtransform.x2 = e.pageX-this.canvas.offsetLeft;
                this.boxtransform.y2 = e.pageY-this.canvas.offsetTop;
                this.ctx.fillStyle = `rgba(${parseInt(this.settings.color.slice(1,3),16)},${parseInt(this.settings.color.slice(3,5),16)},${parseInt(this.settings.color.slice(5,7),16)},0.3)`
                this.ctx.strokeStyle = this.settings.color;
                this.ctx.fillRect(this.boxtransform.x1,this.boxtransform.y1,this.boxtransform.x2-this.boxtransform.x1,this.boxtransform.y2-this.boxtransform.y1)
                this.ctx.strokeRect(this.boxtransform.x1,this.boxtransform.y1,this.boxtransform.x2-this.boxtransform.x1,this.boxtransform.y2-this.boxtransform.y1)
            }
        }
        this.mouseout=function(){
            this.ismousedown = false;
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        }
        this.settings={
            color:"#FF0000",
            showBoxAfterSelect:false
        }
        this.checkCollision=function(hitboxes){
            var failed = false;
            var collidedhitboxes = [];
            var collidedindices = [];
            var i=0;
            for(hitbox in hitboxes){
                if(!hitbox instanceof Hitbox){
                    failed = true;
                    break;
                }
                if(this.boxtransform.x1<hitbox.x2&&this.boxtransform.x2>hitbox.x1&&
                    this.boxtransform.y1<hitbox.y2&&this.boxtransform.y2>hitbox.y1){
                    collidedhitboxes.push(hitbox);
                    collidedindices.push(i);
                }
                i++;
            }
            if(failed){
                throw new TypeError("Hitbox is not an instance of 'Hitbox'");
            } else {
                return {
                    collidedhitboxes:collidedhitboxes,
                    collidedindices:collidedindices
                }
            }
        }
        this.onselect=null;
        this.canvas.addEventListener("mousedown",this.mousedown.bind(this));
        this.canvas.addEventListener("mouseup",this.mouseup.bind(this));
        this.canvas.addEventListener("mousemove",this.mousemove.bind(this));
        this.canvas.addEventListener("mouseout",this.mouseout.bind(this));
        
    }
}
class Hitbox{
    constructor(x1,y1,x2,y2){
        if(x2&&y2){
            this.x1=x1;
            this.y1=y1;
            this.x2=x2;
            this.y2=y2;
        } else {
            this.x1=x1;
            this.y1=y1;
            this.x2=x1;
            this.y2=y1;
        }
    }
}