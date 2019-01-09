import * as random from "./utils/random"

export const generateObject = ({screenWidth, screenHeight, colored, pingCount, id = null, space}) => {
    const max = 100
    const min = 2
    const width = random.number({min, max})
    const dotPercentage = width / max
    const percentage = dotPercentage * 100

    return ({
        id: id ? id : pingCount,
        dotPercentage,
        percentage,
        x: random.number({min: (width * -1), max: screenHeight}),
        y: id ? random.number({min: (space * -1), max: (screenWidth + space)}) : (width * -1),
        w: width,
        h: width,
        selected: false,
        speed: (percentage / 8),//random.number({min: 1, max: 15}),
        color: colored ? `linear-gradient(to left, ${random.color({opacity: dotPercentage, milky: true})} 0%, transparent 100%)` : `linear-gradient(to left, rgba(66, 69, 77, ${dotPercentage}) 0%, transparent 100%)`
    })
}

export const moveObjects = ({movement, object = false, dispatchMovement, move = "right", manual= false}) => {
    const {objects, screen, colored, spawnProbability, pingCount} = movement
    const newObject = []

    for (var i in objects){
        const obj = objects[i]

        if (object && object.id === obj.id){
            obj = {...obj, ...object}
        }
        if (manual || obj.y < screen.w){
            newObject.push({
                ...obj,
                y: (obj.selected || object) ? obj.y : (move === "right") ? (obj.speed + obj.y) : ((obj.speed * -1) + obj.y),
                // x: (random.number({min: -2, max: 3}) + obj.x)
            })
        }
    }
    if (!manual && random.number({max: (spawnProbability + 1)}) === 0)
        newObject.push(generateObject({screenWidth: screen.w, screenHeight: screen.h, colored, pingCount, space: movement.space}))
    
    dispatchMovement({
        pingCount: !manual ? (pingCount + 1) : pingCount,
        objectsCount: newObject.length,
        objects: newObject
    })
}

export const MapObjects = ({movement, state, dispatchMovement}) => <div
    className="movement-objects"
    style={{
        width: `${movement.screen.w}px`,
        height: `${movement.screen.h}px`,
        border: movement.screen.borderedScreen ? `rgb(47, 47, 47) solid 1px` : `0px`
    }}
>
    {movement.objects.map(obj => (
        <ObjectX 
            key={movement.objects.indexOf(obj)}
            transition={(obj.y < (movement.screen.w - 10))}
            obj={obj}
            state={state}
            dispatchMovement={dispatchMovement}
        />
    ))}
</div>

export const spawnRandomObjects = ({screenWidth, screenHeight, colored, pingCount, number, space}) => {
    let objects = []

    for (var i = 0; i < number; i++)
        objects.push(generateObject({screenWidth, screenHeight, colored, pingCount, id: (pingCount + i), space}))
    return (objects)
}

const ObjectX = ({obj, state, dispatchMovement}) => {
    const {x = 0, y = 0, w = 50, h = 50, color = `rgb(77, 77, 77)`, speed, transition = true, selected, percentage, id} = obj
    
    return (
        <div
            onClick={() => moveObjects({
                movement: state.movement,
                dispatchMovement: dispatchMovement,
                object: {
                    ...obj,
                    selected: (obj.selected ? false : true)
                },
                move: "right",
                manual: true
            })}
            className={`object ${selected && "selected"} ${transition && "transition"}`}
            style={{
                width: `${w}px`,
                height: `${h}px`,
                top: `${x}px`,
                left: `${y}px`,
                background: color,
                fontSize: `${((percentage / 2.5) < 6 ? 6 : (percentage / 2.5))}px`,
                // transition: "ease .05s"
            }}
        >
            {`${id} - ${selected}`}
        </div>
    )
}

export default ObjectX