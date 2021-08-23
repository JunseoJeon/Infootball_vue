export const timeString = (time) =>{
    let date = new Date(time*1000)
    let timeStringOnly = date.toTimeString();

    return timeStringOnly.slice(0,5)
} 