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
        this.is_mouseup = false;
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
            name : "toolbar"
            
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
    onClickHandler(e){
        // console.log("etarget print kiya ", e.target);
        if(this.is_active){
            console.log("deactivate kiya")
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
            if(e.target !== mstage) return;
            console.log("mousedown")
            this.is_mousedown = true;
            this.initRect();
        })
        
        mstage.on('mousemove',(e)=>{
            if(!this.is_mousedown) return;
            this.is_mousemove = true;
            this.makeRect();
        })
        mstage.on('mouseup',(e)=>{
            if(!this.is_active) return;
            console.log("mouseup")
            this.is_mouseup = true;
            this.is_mousedown = false;
            this.detectInterSection();
            console.log("destroy karu kya")
            // if(this.currRect)
            //     this.currRect.destroy();
            // this.currRect = false;
            this.layer.batchDraw();
        })
        mstage.on('click',(e) => {
            if(this.currRect.visible()) return;
            if(e.target === mstage){
                this.transformObj.nodes([]);
                this.layer.draw();
                return;
            }
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
            visible : false,
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
    detectInterSection(){
        if(!this.is_active) return;
        if(!this.currRect.visible()){
            return;
        }
        setTimeout(() => {
            console.log("yae Chala tha");
            this.currRect.visible(false);
            this.layer.batchDraw();
          });
        let shapes = this.layer.find(node => {return (node.getName() === 'toolbar' || node.getParent().getName() === 'toolbar' || node === this.currRect)?null : node});
        let currBox = this.currRect.getClientRect();
        let selected = shapes.filter(shape => {
            console.log(shape.getClientRect());
            return Konva.Util.haveIntersection(currBox,shape.getClientRect());
        })
        console.log(selected, " ", shapes);
        this.transformObj = new Konva.Transformer();
        this.layer.add(this.transformObj)
        this.transformObj.nodes(selected);
        this.layer.batchDraw();
    }
    
}