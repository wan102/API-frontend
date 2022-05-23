export function dateToString(date) {
    try {
        return new Date(date).toISOString().split('T')[0];
    } catch(err) {
        console.log("dateToString()  " + err );
    }
    return "N/A";
}
export function slashReplaceHyphen(breedName) {
    return breedName.replaceAll('-', '/')
}