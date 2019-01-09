import { moveObjects } from "../ObjectX";

const JoyPad = ({state, funcs}) => {
    const move = move => {
        moveObjects({move, object: false, movement: state.movement, dispatchMovement: funcs.dispatchMovement, manual: true})
    }

    return (
        <div>
            <div className="joypad">
                <button className="pad-up" onClick={() => {}}>Up</button>
                <button className="pad-right" onClick={() => move("right")}>Right</button>
                <button className="pad-down" onClick={() => {}}>Down</button>
                <button className="pad-left" onClick={() => move("left")}>Left</button>
            </div>
        </div>
    )
}

export default JoyPad