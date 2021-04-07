import Konva from 'konva';
import {mstage} from '../index';
export default class DrawBtn{
    constructor(layer,x,y,str){
        this.layer = layer
        this.x = x;
        this.y = y;
        this.text = str
        this.kobj = this.makeBtn();
        this.is_active = false;
        this.is_pointerDown = false;
        this.is_pointerUp = false;
        this.is_pointerMove = false;
        this.lineObj  = [];
    }

    makeBtn(){
        let drawbtn = new Konva.Label({
            x : this.x,
            y : this.y,
        });
        
        drawbtn.add(
            new Konva.Tag({
                fill : "black"
            })
        );
        
        drawbtn.add(
            new Konva.Text({
                fill: 'white',
                text : this.text,
                padding : 10
            })
        );
        return drawbtn;
    }

    create(){
        this.layer.add(this.kobj);
    }

    onClickHandler(){
        // console.log("clicked");

        if(this.is_active === false){
            this.is_active = true;
            this.kobj.getTag().fill("red");
            // console.log("active = ", this.is_active)
            this.handleDrawing();
        }
        else{
            this.is_active = false;
            this.kobj.getTag().fill("black");
            mstage.off('mousedown');
            mstage.off('mousemove');
            mstage.off('mouseup');
        }
        

        this.layer.draw();   
    }

    

    handleDrawing(){
        if(!this.is_active) return;

        mstage.on('mousedown',() => {
            // console.log("mouseDownthing")
            this.is_pointerDown = true;
            this.drawInitLine();
        })
        mstage.on('mouseup',() => {
            this.is_pointerDown = false;
            this.is_pointerMove = false;
            
            
        })
        mstage.on('mousemove',() => {
            this.is_pointerMove = true;
            this.drawLine();
        })

        // console.log("handleDrawing = ", this.is_pointerDown, " ", this.is_pointerMove);
    }
    drawInitLine(){
        if(!this.is_pointerDown) return;
        let pointer = mstage.getPointerPosition();
        let newPoint  = new Konva.Line({
            points : [pointer.x,pointer.y],
            stroke : "red",
            strokeWidth : 2,
            tension : 0.3
        })
        this.lineObj.push(newPoint);
        this.layer.add(newPoint);
        this.kobj.zIndex(this.lineObj.length + 10);
        this.clearObj.zIndex(this.lineObj.length + 10);
    }

    drawLine(){
        if(!this.is_pointerDown)  return ;
        // console.log("drawing")
        let pointer = mstage.getPointerPosition();
        let prevLine = this.lineObj[this.lineObj.length - 1];
        // console.log(prevLine.points());
        let newpoints = prevLine.points().concat([pointer.x,pointer.y]);
        prevLine.points(newpoints);
        this.layer.batchDraw();
    }

    makeClearBtn(x,y,bgcolor,tcolor,text){
        let drawbtn = new Konva.Label({
            x : x,
            y : y,
        });
        
        drawbtn.add(
            new Konva.Tag({
                fill : bgcolor
            })
        );
        
        drawbtn.add(
            new Konva.Text({
                fill: tcolor,
                text : text,
                padding : 10
            })
        );
        this.layer.add(drawbtn);
        this.clearObj = drawbtn;
    }

    clearLines(){
        // console.log("yae cahla tha")
        this.lineObj.forEach(obj => {
            obj.destroy();
        })
        this.lineObj = [];
        this.layer.draw();
        // console.log("clear madi = ", this.lineObj )
    }
    

}