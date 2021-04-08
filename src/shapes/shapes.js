import Konva from "konva";
import {mstage} from '../index'
let  circ = new Konva.Circle({
    x : 100,
    y : 100,
    radius : 50,
    fill : "#a3d2ca",
    stroke : "#5eaaa8",
    strokeWidth : 8,
    shadowOffsetX : 10,
    shadowOffsetY : 8,
    shadowBlur : 20,
    shadowOpacity: 0.4,
    draggable : true
});


let rect1 = new Konva.Rect({
    x : 200,
    y : 200,
    width : 800,
    height : 600,
    fill : "#eeeeee",
    stroke : "black",
    //strokeWidth : 8,
    //cornerRadius : [0 , 20, 0, 20],
    draggable : true,
})

let message = new Konva.Text({
    x : 50,
    y : 50,
    fill : "black",
    text : '',
    fontSize : 24
})



// let mLine = new Konva.Line({
//     points : [5, 70, 140, 23, 250, 60, 300, 20],
//     stroke : "red",
//     strokeWidth : 5,
//     tension : 1,
//     draggable : true
// })

// mLine.points(mLine.points().concat([400,40]));


export {circ,rect1,message};