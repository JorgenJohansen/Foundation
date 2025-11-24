export const getWeek = () => {
    let date = new Date();
    let jan1 = new Date(date.getFullYear(), 0 , 1);
    let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let dayOfYear = ((today - jan1 + 86400000)/86400000);
    return Math.ceil(dayOfYear / 7);
}