import dayjs from 'dayjs'

export const filterTimes = (date, format = 'YYYY-MM-DD') => {
    if (!isNull(date)) {
        date = parseInt(date) * 1000;
        return dayjs(date).format(format)
    } else {
        return '--'
    }
}

export const isNull = (date) => {
    if (!date) return true;
    if (JSON.stringify(date) === '{}') return true;
    if (JSON.stringify(date) === '[]') return true;
}

export const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(args);
        }, delay)
    }
}
// export const debounce = (fun:Function,delay:number)=>{
//     let timer: NodeJS.Timeout;
//     return function(){
//         let arg = arguments;
//         clearTimeout(timer);
//         timer = setTimeout(()=>{
//             fun(arg)
//         },delay)
//     }
// }