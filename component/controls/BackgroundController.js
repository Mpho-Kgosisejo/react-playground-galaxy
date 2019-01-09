import React from "react"

const Form = ({r, g, b, a, handleRange, handleRangeDouble}) => <form>
    <div>
        <label>{`[R: ${r}]`}</label>
        <input value={r} onChange={(e) => handleRange(e)} min="0" max="255" name="r" type="range" />
    </div>
    <div>
        <label>{`[G: ${g}]`}</label>
        <input value={g} onChange={(e) => handleRange(e)} min="0" max="255" name="g" type="range" />
    </div>
    <div>
        <label>{`[B: ${b}]`}</label>
        <input value={b} onChange={(e) => handleRange(e)} min="0" max="255" name="b" type="range" />
    </div>
    <div>
        <label>{`[A: ${a}]`}</label>
        <input step={0.1} value={a} onChange={(e) => handleRangeDouble(e)} min="0" max="1" name="a" type="range" />
    </div>
</form>

const BackgroundController = ({state, funcs}) => <div className="background">
    <Form {...state.rgba} {...funcs} />
    <hr />
    <label htmlFor="showState">Show state</label>
    <input id="showState" name="showState" type="checkbox" onChange={(e) => funcs.toggle({key: e.target.name})} />
    <hr />
    <button onClick={() => funcs.handleRandomColor({milky: true})}>Random Color</button>
    <hr/>
    <button onClick={() => funcs.toggle({key: "auto"})}>Color Auto Change: {state.auto ? `On` : `Off`}</button>
</div>

export default BackgroundController