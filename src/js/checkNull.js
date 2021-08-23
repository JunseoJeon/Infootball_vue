export const checkNull = (checkArg) =>{
    if(checkArg === "" || checkArg === null || checkArg === undefined ||
    (checkArg !== null && typeof checkArg === "object" && !Object.keys(checkArg).length)){
        return true;
    } else{
        return false;
    }
}