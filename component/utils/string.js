export const titleCase = str => {
    str = str.trim()
    let s = str.toLowerCase()
    let ret = ""

    for (var i = 0; i < s.length; i++)
        ret += i === 0 ? s[i].toUpperCase() : s[i]
    return(ret)
}