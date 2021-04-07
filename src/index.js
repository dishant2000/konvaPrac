import Konva from 'konva';
import {circ,rect1,message} from '../src/shapes/shapes'
import DrawBtn from './shapes/DrawBtn'
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




layer.add(circ,message);

mstage.add(layer);


//general example functions


// mstage.on('mousedown',function(){
//     //console.log("mouseover hua hai");
//     let mpointer = mstage.getPointerPosition();
//     message.text(`${mpointer.x} and ${mpointer.y} -> mouseenter`);
//     layer.draw();
// })














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