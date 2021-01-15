import React, {Component, createRef} from 'react'
import './main.css'
import Snake from "./snake";
import src from './apple.png'
import SnakePictures from './Main/Snake.png'
import app from "./app";
const apple = new Image()
const snakePictures = new Image()
apple.src = src
snakePictures.src = SnakePictures
const canvasRef = createRef()
let newHead = null
export default class App extends Component{
    constructor(props) {
        super(props);
        this.timerId = null
        this.lastPos = null
        this.gameOver = false
        this.newDirection = 'ArrowRight'
        this.direction = 'ArrowRight'
        this.score = 0
        this.oppositeKey = {
            'ArrowRight': 'ArrowLeft',
            'ArrowLeft': 'ArrowRight',
            'ArrowUp': 'ArrowDown',
            'ArrowDown': 'ArrowUp'
        }
    }
    state = {
        pos: [[0, 0], [30, 0], [60, 0], [90, 0]],
        foodPos: null,
    }
    componentDidUpdate() {
        const {pos, foodPos} = this.state
        this.drawItems(pos, snakePictures, foodPos)
        this.eatFood(pos, foodPos)
    }

    componentDidMount(){
        if (!this.gameOver) {
            this.timerId = setInterval(this.moveSnake, 80)
            window.addEventListener("keydown", this.main);
        }
    }
    componentWillMount() {
        this.spawnFood(this.state.pos)
    }
    main = (event) => {
        if (event.key.indexOf('Arrow') !== -1) {
            this.newDirection = event.key
        }
    }
    moveSnake = () => {
        const {pos} = this.state
        if (this.newDirection !== this.oppositeKey[this.direction]) {
            this.direction = this.newDirection
        }
        switch (this.direction) {
            case 'ArrowLeft' :
                newHead = [pos[pos.length-1][0]-30, pos[pos.length-1][1]]
                break
            case 'ArrowUp':
                newHead = [pos[pos.length-1][0], pos[pos.length-1][1]-30]
                break
            case 'ArrowRight':
                newHead = [pos[pos.length-1][0]+30, pos[pos.length-1][1]]
                break
            case 'ArrowDown':
                newHead = [pos[pos.length-1][0], pos[pos.length-1][1]+30]
                break
        }
        if (this.endGame(newHead, pos)){
            this.gameOver = true
            clearInterval(this.timerId)
            window.removeEventListener('keydown', this.main);
        } else {
            this.setState({pos: [...pos.slice(1), newHead]})
        }

    }
    eatFood = (pos, foodPos) => {
        if (pos[pos.length-1][0] === foodPos[0] && pos[pos.length-1][1] === foodPos[1]) {
            const newArr = [...this.lastPos, foodPos]
            this.score = ++this.score
            this.spawnFood(pos)
            this.setState({pos: newArr,})
        } else {
            this.lastPos = pos
        }
    }
    spawnFood = (pos) => {
        let newPos = [0, 0]
        do {
            newPos = this.foodRandom()
        } while (this.check(pos, newPos))
        this.setState({foodPos: newPos})
    }
    headCollision = (pos, newHead) => {
        for (let i=0; i < pos.length-1; i++) {
            if (pos[i][0] === newHead[0] && pos[i][1] === newHead[1]) {
                return true
            }
        }
    }
    check = (pos, foodPos) => {
        for (let item of pos) {
            if (item[0] === foodPos[0] && item[1] === foodPos[1]) {
                return true
            }
        }
        return false
    }
    endGame = (newHead, pos) => {
        if ((newHead[0] === 1200 || newHead[0] < 0
            || newHead[1] === 660 || newHead[1] < 0 || this.headCollision(pos, newHead))) {
            return true
        }
    }
    foodRandom = () => {
        return [Math.floor(Math.random() * 1200 / 30) * 30, Math.floor(Math.random() * 660 / 30) * 30]
    }
    drawItems = (snakePos, snakePictures, foodPos) =>  {
        let ctx = canvasRef.current.getContext('2d')
        ctx.clearRect(0,0, 1200, 660);
        ctx.drawImage(apple, foodPos[0], foodPos[1], 30, 30)
        snakePos.forEach((item, i) => {
                if (i === snakePos.length-1) {
                    switch (this.direction) {
                        case 'ArrowLeft' :
                            ctx.drawImage(snakePictures, 3*31, 31, 31, 31,  item[0], item[1], 30, 30);
                            break
                        case 'ArrowUp':
                            ctx.drawImage(snakePictures, 4*31, 0, 31, 31,  item[0], item[1], 30, 30);
                            break
                        case 'ArrowRight':
                            ctx.drawImage(snakePictures, 3*31, 0, 31, 31,  item[0], item[1], 30, 30);
                            break
                        case 'ArrowDown':
                            ctx.drawImage(snakePictures, 4*31, 31, 31, 31,  item[0], item[1], 30, 30);
                            break
                    }
                } else if (i === 0){
                    if (snakePos[i][0]-snakePos[i+1][0] < 0) {
                        ctx.drawImage(snakePictures, 4*31, 2*31, 31, 31,  item[0], item[1], 30, 30);
                    }
                    if (snakePos[i][0]-snakePos[i+1][0] > 0) {
                        ctx.drawImage(snakePictures, 4*31, 3*31, 31, 31,  item[0], item[1], 30, 30);
                    }
                    if (snakePos[i][1]-snakePos[i+1][1] < 0) {
                        ctx.drawImage(snakePictures, 3*31, 3*31, 31, 31,  item[0], item[1], 30, 30);
                    }
                    if (snakePos[i][1]-snakePos[i+1][1] > 0) {
                        ctx.drawImage(snakePictures, 3*31, 2*31, 31, 31,  item[0], item[1], 30, 30);
                    }
                } else {
                    if ((snakePos[i-1][0] - snakePos[i][0] < 0 && snakePos[i-1][1] - snakePos[i+1][1] < 0) ||
                        (snakePos[i-1][1] - snakePos[i][1] > 0 && snakePos[i][0] - snakePos[i+1][0] > 0)) {
                        ctx.drawImage(snakePictures, 2*31, 0, 31, 31,  item[0], item[1], 30, 30);
                    }
                    else if ((snakePos[i][0] - snakePos[i-1][0] < 0 && snakePos[i+1][1] - snakePos[i][1] < 0) ||
                        (snakePos[i-1][1] - snakePos[i][1] < 0 && snakePos[i][0] - snakePos[i+1][0] < 0)) {
                        ctx.drawImage(snakePictures, 0, 31, 31, 31,  item[0], item[1], 30, 30);
                    }
                    else if ((snakePos[i-1][1] - snakePos[i][1] < 0 && snakePos[i][0] - snakePos[i+1][0] > 0) ||
                        (snakePos[i-1][0] - snakePos[i][0] < 0 && snakePos[i][1] - snakePos[i+1][1] > 0)){
                        ctx.drawImage(snakePictures, 2*31, 2*31, 31, 31,  item[0], item[1], 30, 30);
                    }
                    else if ((snakePos[i][1] - snakePos[i-1][1] < 0 && snakePos[i][0] - snakePos[i+1][0] < 0) ||
                        (snakePos[i-1][0] - snakePos[i][0] > 0 && snakePos[i][1] - snakePos[i+1][1] < 0)) {
                        ctx.drawImage(snakePictures, 0, 0, 31, 31,  item[0], item[1], 30, 30);
                    }

                    else if ((snakePos[i-1][0] - snakePos[i][0] < 0 || snakePos[i-1][0] - snakePos[i][0] > 0) && snakePos[i-1][1] === snakePos[i+1][1]) {
                        ctx.drawImage(snakePictures, 31, 0, 31, 31,  item[0], item[1], 30, 30);
                    }
                    else if (((snakePos[i-1][1] - snakePos[i][1] < 0) || (snakePos[i-1][1] - snakePos[i][1] > 0)) && snakePos[i-1][0] === snakePos[i+1][0]) {
                        ctx.drawImage(snakePictures, 2*31, 31, 31, 31,  item[0], item[1], 30, 30);
                    }
                }

            }
        )
    }
    render() {
        return (
            <div>
                <div className='main'>
                    <h1 className={'text'}>Score: {this.score}</h1>
                    <div className='board'>
                        <canvas ref={canvasRef} width={1200} height={660}/>
                    </div>
                </div>
            </div>
        )
    }
}
