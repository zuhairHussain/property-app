let removeDuplicatesFromArray = (array) => {
    if(!Array.isArray(array)) return []; 

    return [...new Set(array)]
}
   
export {
    removeDuplicatesFromArray
}