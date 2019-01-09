import BackgroundController from "./BackgroundController"
import ObjectController from "./ObjectController"
import { titleCase } from "../utils/string";
import JoyPad from "./JoyPad";

const Controller = ({state, funcs}) => {
    const {controller, dispatch} = state
    const options = ["background", "objects", "joypad"]

    return (
        <div className="controller">
            <nav className="main-nav">
                {controller} - {state.movement.screen.w}
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