import Konva from 'konva';
import {circ,rect1,message} from '../src/shapes/shapes'
import DrawBtn from './shapes/DrawBtn'
import SelRect from './SelRect/main'
export const mstage = new Konva.Stage({
    container : "mcontainer",
    width : 800,
    height: 600,
    
})

const layer = new Konva.Layer({
})

let pencilBtn = new DrawBtn(layer,500,50,'draw');
pencilBtn.create();
pencilBtn.kobj.on('click',function(){pencilBtn.onClickHandler();});

pencilBtn.makeClearBtn(550,50,'black','white','clear')
pencilBtn.clearObj.on('click',function(){
    pencilBtn.clearLines();
})

let selBtn = new SelRect(layer,400,50,'select');
selBtn.makeBtn();
selBtn.create(selBtn.btn);
selBtn.btn.on('click',function(e){
    selBtn.onClickHandler();
})
layer.add(circ,message);
// rect1.zIndex(0);

mstage.add(layer);

//general example functions 














circ.on('mouseover',function(){
    // console.log("mouseover");
    this.fill('black');
    layer.draw();
})
circ.on('mouseout',function(){
    // console.log("mouseover");
    this.fill('#a3d2ca');
    layer.draw();
})