const isWhiteSpaceOrNull = (data:string):boolean => {
    let result = data === '' || data === undefined || data === null || data === ' ';
    return result;
}

export { isWhiteSpaceOrNull };
