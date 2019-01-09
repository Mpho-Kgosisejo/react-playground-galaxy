const itemNames = {
    screen: "Screen"
}
const getItem = item => itemNames[item] ? `NextJSPlayground_${itemNames[item]}` : null

export const saveScreen = (e, screen) => {
    const newScreen = {
        ...screen,
        [e.target.name]: e.target.value
    }
    
    localStorage.setItem(getItem("screen"), JSON.stringify(newScreen))
}

export const getScreen = () => {
    const screen = JSON.parse(localStorage.getItem(getItem("screen")))

    return ({
        borderedScreen: screen.borderedScreen,
        w: parseInt(screen.w),
        h: parseInt(screen.h)
    })
}