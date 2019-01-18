import BackgroundController from "./BackgroundController"
import ObjectController from "./ObjectController"
import { titleCase } from "../utils/string";
import JoyPad from "./JoyPad";

const Controller = ({state, funcs}) => {
    const {controller, dispatch} = state
    const options = ["background", "objects", "joypad"]

    const handleOnClick = () => {
        const {dispatch} = state
        const {x, y} = state.movement.screen
        const screenPosition = {
            x: ((state.mouse.x - state.mouse.x) + x),
            y: 0
        }

        console.log("handleOnClick[Controller]", screenPosition)
    }

    return (
        <div
            className="controller"
            style={{
                top: `${state.movement.screen.x}px`,
                left: `${state.movement.screen.y}px`
            }}
        >
            <nav className="main-nav"
                onMouseUp={() => dispatch({controllerClicked: false})}
                onMouseDown={() => dispatch({controllerClicked: true})}
                onMouseOut={() => dispatch({controllerClicked: false})}
            >
                {controller} - (PING: {state.movement.pingCount})
                <span className="nav-controller">
                    <div className="close" onClick={() => funcs.toggle({key: "showController"})}>x</div>
                    {/* <div className="mini">-</div> */}
                </span>    
            </nav>
            <nav className="sub-nav">
                <select defaultValue={controller} onChange={(e) => {dispatch({controller: e.target.value})}}>
                    {options.map(option => (
                        <option key={option} value={option}>{titleCase(option)}</option>
                    ))}
                </select>
            </nav>
            
            {controller === "background"
                    ? <BackgroundController state={state} funcs={funcs} />
                : controller === "objects"
                    ? <ObjectController state={state} funcs={funcs} />
                : controller === "joypad"
                    ? <JoyPad state={state} funcs={funcs} />
                : null 
            }
        </div>
    )
}

export default Controller