import React from "react"
import { saveScreen } from "../utils/storage";

const ObjectController = ({state, funcs}) => {
    const {spawnProbability, colored, screen, speed} = state.movement
    const handleOnChange = (e) => state.dispatch({movement: {...state.movement, [e.target.name]: e.target.value}})
    const handleOnChangeScreen = (e) => {
        saveScreen(e, screen)
        state.dispatch({movement: {...state.movement, screen: {...state.movement.screen, [e.target.name]: e.target.value}}})
    }

    return (
        <div>
            <div className="input">
                <label htmlFor="colored">Colored Objects</label>
                <input type="checkbox" name="colored" id="colored" checked={colored} onChange={() => state.dispatch({movement: {...state.movement, colored: colored ? false : true}})} />    
            </div>
            <div className="input">
                <label htmlFor="spawnProbability">Spawn Probability</label>
                <input type="number" min={0} max="1000" defaultValue={spawnProbability} name="spawnProbability" id="spawnProbability" onChange={handleOnChange} />    
            </div>
            <div className="input">
                <label htmlFor="speed">Speed</label>
                <input disabled type="number" min="1" name="speed" value={speed} id="colored" onChange={handleOnChange} />    
            </div>
            <div className="input screen">
                <div className="input">
                    <label htmlFor="borderedScreen">Bordered Screen</label>
                    <input
                        type="checkbox"
                        name="borderedScreen"
                        id="borderedScreen"
                        checked={screen.borderedScreen}
                        onChange={() => handleOnChangeScreen({
                            target: {
                                name: "borderedScreen",
                                value: screen.borderedScreen ? false : true
                            }
                        })}
                    />    
                </div>
                <label htmlFor="width">Screen Width</label>
                <input id="width" type="number" min="0" name="w" value={screen.w} onChange={handleOnChangeScreen} />
                <label htmlFor="height">Screen Height</label>
                <input id="height" type="number" min="0" name="h" value={screen.h} onChange={handleOnChangeScreen} />    
            </div>
        </div>
    )
}

export default ObjectController