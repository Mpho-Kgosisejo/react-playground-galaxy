import Layout from "../component/Layout";
import * as random from "../component/utils/random"
import ObjectX, {generateObject, moveObjects, MapObjects, spawnRandomObjects} from "../component/ObjectX"
import Controller from "../component/controls/controller";
import { getScreen } from "../component/utils/storage";

const Header = ({color, style}) => <div className="header">
    <div className="color-preview" style={style}/>
    <h3>{color}</h3>
</div>

//x and y defaults: -142

export default class Index extends React.Component {
    state = {
        mouse: {
            x: 0,
            y: 0
        },
        controller: "objects",
        controllerClicked: false,
        rgba: {
            r: 0,
            g: 0,
            b: 0,
            a: 1
        },
        color: "rgba(255, 255, 255, 1)",
        auto: false,
        loading: true,
        showController: false,
        showState: false,
        movement: {
            space: 500,
            spawnProbability: 5,
            colored: false,
            screen: {
                borderedScreen: true,
                w: 0,
                h: 0,
                x: 0,
                y: 400
            },
            pingCount: 0,
            speed: 100,
            objects: []
        },
        dispatch: (payload) => this.setState({...this.state, ...payload})
    }

    getRgbaObj = ({key, value, isDouble = false}) => (
        {
            ...this.state.rgba,
            [key]: !isDouble ? parseInt(value) : parseFloat(value)
        }
    )

    changeColor = ({r, g, b, a = 1, state = this.state}) => this.setState({
        ...state,
        rgba: {r, g, b, a},
        color: `rgba(${r}, ${g}, ${b}, ${a})`
    })

    handleRange = (e) => {
        const {value, name} = e.target

        this.changeColor({...this.getRgbaObj({key: name, value})})
    }

    handleRangeDouble = (e) => {
        const {value, name} = e.target

        this.changeColor({...this.getRgbaObj({key: name, value, isDouble: true})})
    }

    handleRandomColor = ({milky = false}) => {
        if (milky)
            this.changeColor({r: random.number({min: 50, max: 200}), g: random.number({min: 50, max: 200}), b: random.number({min: 50, max: 200}), a: this.state.rgba.a})
        else
            this.changeColor({r: random.number({}), g: random.number({}), b: random.number({}), a: this.state.rgba.a})
    }

    toggle = ({key}) => this.state[key] ? this.setState({[key]: false}) : this.setState({[key]: true})

    dispatchMovement = (payload) => {
        this.setState({
            ...this.state,
            movement: {
                ...this.state.movement,
                ...payload
            }
        })
    }

    componentDidMount(){
        // this.handleRandomColor({milky:  true})
        this.changeColor({
            ...this.state.rgba,
            state: {
                ...this.state,
                loading: false,
                movement: {
                    ...this.state.movement,
                    screen: getScreen(this.state.movement.screen)
                }
            }
        })

        setInterval(() => {
            if (this.state.auto)
                this.handleRandomColor({milky: true})
        }, 7500)

        setInterval(() => {
            if (this.state.controller === "joypad"){
                const {colored, screen, pingCount, space} = this.state.movement

                if (this.state.movement.objects[0].id !== pingCount){
                    this.setState({
                        movement: {
                            ...this.state.movement,
                            objects: spawnRandomObjects({number: 100, screenHeight: screen.h, screenWidth: screen.w, colored, pingCount, space})
                        }
                    })
                }
            }else{
                moveObjects({movement: this.state.movement, dispatchMovement: this.dispatchMovement})
            }
        }, this.state.movement.speed) // might not work...?

        document.addEventListener("keydown", this.handleKeyEvent)
        document.addEventListener("mousemove", this.handleMouseEvent)
    }

    handleMouseEvent = e => {
        
        this.state.dispatch({mouse: {x: e.x, y: e.y}})
    }

    handleKeyEvent = e => {
        switch (e.keyCode) {
            case 38:
                console.log("Key => UP")    
            break;
            case 39:
                console.log("Key => RIGHT")    
            break;
            case 40:
                console.log("Key => DOWN")    
            break;
            case 37:
                console.log("Key => LEFT")    
            break;
            default:
                console.log("key =>", e.code, e.keyCode)
            break
        }
    }

    render(){
        const {color, loading, showController, movement, showState} = this.state
        const colorStyle = {background: color}

        return (
            <Layout>
                <div className="app-container" style={colorStyle}>
                    {loading && <h3>loading...</h3>}
                    {showState && <h5><pre>{JSON.stringify(this.state, "", 2)}</pre></h5>}
                    {!loading && (
                        <>
                            <MapObjects
                                movement={movement}
                                state={this.state}
                                dispatchMovement={this.dispatchMovement}
                            />
                            {showController && <Controller
                                    state={this.state}
                                    funcs={{
                                        handleRange: this.handleRange,
                                        handleRangeDouble: this.handleRangeDouble,
                                        toggle: this.toggle,
                                        handleRandomColor: this.handleRandomColor,
                                        dispatchMovement: this.dispatchMovement,
                                        getRgbaObj: this.getRgbaObj
                                    }}
                                />
                            }
                        </>
                    )}
                    {!showController && <button className="float" onClick={() => this.toggle({key: "showController"})}>Show Controller</button>}
                </div>
            </Layout>
        )
    }
}