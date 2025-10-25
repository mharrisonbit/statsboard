//one day in ms
const twelveHoursDiff = 12 * 60 * 60 * 1000;


const isWhiteSpaceOrNull = (data:string):boolean => {
    let result = data === '' || data === undefined || data === null || data === ' ';
    return result;
}

export { isWhiteSpaceOrNull, twelveHoursDiff };

