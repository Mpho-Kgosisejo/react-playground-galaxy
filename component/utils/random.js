export const number = ({min = 0, max = 255}) => Math.floor(Math.random() * (max - min) + min)

export const color = ({milky = false, opacity = 1}) => milky ? 
    `rgba(${number({min: 50, max: 200})}, ${number({min: 50, max: 200})}, ${number({min: 50, max: 200})}, ${opacity})` :
    `rgba(${number({})}, ${number({})}, ${number(number({}))}, ${opacity})`