export const debounce = (func:Function, wait:number) => {
    let timeout:any
    return function(...args:any) {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(null, args), wait)
    }
}
