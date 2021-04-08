import Konva from 'konva';
import {mstage} from '../index'
export default class SelRect{
    constructor(layer, x,y,str){
        this.layer = layer;
        this.x = x;
        this.y = y;
        this.text = str;
        this.is_active = false;
        this.is_mousedown = false;
        this.is_mousemove = false;
        this.selArray = [];
        this.currRect = false;
        this.x1 = 0 ;
        this.x2 = 0 ;
        this.y1 = 0 ;
        this.y2 = 0 ;
        
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

        this.btn = drawbtn;
    }

    create(obj){
        this.layer.add(obj);
    }
    onClickHandler(){
        if(this.is_active){
            this.is_active = false;
            this.btn.getTag().fill("black")
            mstage.off('mousedown');
            mstage.off('mousemove');
            mstage.off('mouseup');

        }
        else{
            console.log("active kiya")
            this.is_active = true;
            this.btn.getTag().fill("red");
            this.makeselect();
        }
        this.layer.draw();
    }
    makeselect(){
        // console.log("make select = ", mstage);
        mstage.on('mousedown',(e)=>{
            this.is_mousedown = true;
            if(e.target !== mstage) return;
            this.initRect();
        })
        
        mstage.on('mousemove',()=>{
            this.is_mousemove = true;
            this.makeRect();
        })
        mstage.on('mouseup',()=>{
            this.is_mouseup = true;
            this.is_mousedown = false;
            if(this.currRect)
                this.currRect.destroy();
            this.currRect = false;
            this.layer.draw();
        })
        
    }
    
    initRect(){
        if(!this.is_mousedown) return;
        // let x1,y1,x2,y2;
        let currPointer = mstage.getPointerPosition();
        this.x1 = currPointer.x;
        this.y1 = currPointer.y;
        this.x2 = currPointer.x;
        this.y2 = currPointer.y;
        
        let rect = new Konva.Rect({
            fill : "rgba(0,0,255,0.15)",
            visible : true,
            width : 0,
            height : 0,
        })
        
        this.currRect = rect;
        this.create(this.currRect);       
    }
    makeRect(){
        if(!this.is_mousedown) return;
        this.x2 = mstage.getPointerPosition().x;
        this.y2 = mstage.getPointerPosition().y;

        this.currRect.setAttrs({
            x : Math.min(this.x1,this.x2),
            y : Math.min(this.y1,this.y2),
            width : Math.abs(this.x1 - this.x2),
            height : Math.abs(this.y1 - this.y2),
            visible: true
        });
        this.layer.batchDraw();
    }
    
}