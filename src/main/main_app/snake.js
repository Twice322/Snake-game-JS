// import React, {Component, createRef} from 'react'
// import src from './apple.png'
// import SnakePictures from './Main/Snake.png'
// import app from "./app";
// const apple = new Image()
// const snakePictures = new Image()
// apple.src = src
// snakePictures.src = SnakePictures
// export default class Snake extends  Component {
//
//     constructor(props) {
//         super(props);
//         this.canvasRef = createRef()
//
//     }
//     componentDidMount() {
//         this.updateCanvas();
//
//     }
//     componentDidUpdate() {
//         this.updateCanvas();
//     }
//     updateCanvas() {
//         const ctx = this.canvasRef.current.getContext('2d');
//         const {snakePos, foodPos, turnHead, turnTail, direction} = this.props
//         ctx.clearRect(0,0, 1200, 660);
//         this.drawItems(ctx, snakePos, snakePictures, foodPos, turnHead)
//     }
//     drawItems = (ctx, snakePos, snakePictures, foodPos, turnHead) =>  {
//         ctx.drawImage(apple, foodPos[0], foodPos[1], 30, 30)
//         snakePos.forEach((item, i) => {
//             if (i === snakePos.length-1) {
//                 ctx.drawImage(snakePictures, turnHead[0], turnHead[1], 31, 31,  item[0], item[1], 30, 30);
//             } else if (i === 0){
//                 if (snakePos[i][0]-snakePos[i+1][0] < 0) {
//                     ctx.drawImage(snakePictures, 4*31, 2*31, 31, 31,  item[0], item[1], 30, 30);
//                     // Right
//                 }
//                 if (snakePos[i][0]-snakePos[i+1][0] > 0) {
//                     ctx.drawImage(snakePictures, 4*31, 3*31, 31, 31,  item[0], item[1], 30, 30);
//                     // Left
//                 }
//                 if (snakePos[i][1]-snakePos[i+1][1] < 0) {
//                     ctx.drawImage(snakePictures, 3*31, 3*31, 31, 31,  item[0], item[1], 30, 30);
//                     //Down
//                 }
//                 if (snakePos[i][1]-snakePos[i+1][1] > 0) {
//                     ctx.drawImage(snakePictures, 3*31, 2*31, 31, 31,  item[0], item[1], 30, 30);
//                     //Up
//                 }
//             } else {
//                 if ((snakePos[i-1][0] - snakePos[i][0] < 0 && snakePos[i-1][1] - snakePos[i+1][1] < 0) ||
//                     (snakePos[i-1][1] - snakePos[i][1] > 0 && snakePos[i][0] - snakePos[i+1][0] > 0)) {
//                     ctx.drawImage(snakePictures, 2*31, 0, 31, 31,  item[0], item[1], 30, 30);
//                     //Down-right
//                 }
//                 else if ((snakePos[i][0] - snakePos[i-1][0] < 0 && snakePos[i+1][1] - snakePos[i][1] < 0) ||
//                     (snakePos[i-1][1] - snakePos[i][1] < 0 && snakePos[i][0] - snakePos[i+1][0] < 0)) {
//                     ctx.drawImage(snakePictures, 0, 31, 31, 31,  item[0], item[1], 30, 30);
//                     // Left-Up
//                 }
//                 else if ((snakePos[i-1][1] - snakePos[i][1] < 0 && snakePos[i][0] - snakePos[i+1][0] > 0) ||
//                 (snakePos[i-1][0] - snakePos[i][0] < 0 && snakePos[i][1] - snakePos[i+1][1] > 0)){
//                     ctx.drawImage(snakePictures, 2*31, 2*31, 31, 31,  item[0], item[1], 30, 30);
//                     // Down-Left
//                 }
//                 else if ((snakePos[i][1] - snakePos[i-1][1] < 0 && snakePos[i][0] - snakePos[i+1][0] < 0) ||
//                 (snakePos[i-1][0] - snakePos[i][0] > 0 && snakePos[i][1] - snakePos[i+1][1] < 0)) {
//                     ctx.drawImage(snakePictures, 0, 0, 31, 31,  item[0], item[1], 30, 30);
//                 }
//
//                 else if ((snakePos[i-1][0] - snakePos[i][0] < 0 || snakePos[i-1][0] - snakePos[i][0] > 0) && snakePos[i-1][1] === snakePos[i+1][1]) {
//                     ctx.drawImage(snakePictures, 31, 0, 31, 31,  item[0], item[1], 30, 30);
//                 }
//                 else if (((snakePos[i-1][1] - snakePos[i][1] < 0) || (snakePos[i-1][1] - snakePos[i][1] > 0)) && snakePos[i-1][0] === snakePos[i+1][0]) {
//                     ctx.drawImage(snakePictures, 2*31, 31, 31, 31,  item[0], item[1], 30, 30);
//                 }
//                 //Done +
//
//             }
//
//         }
//         )
//     }
//     render() {
//         return (
//             <canvas ref={this.canvasRef} width={1200} height={660}/>
//         );
//     }
//
// }
//

