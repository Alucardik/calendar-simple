export default {
    getCurDate(date) {
        const today = new Date();
        date.day = today.getDate();
        date.month = today.getMonth() + 1;
        date.year = today.getFullYear();
        return date;
    },

    getDayOfTheWeek: (baseDate, dayOffset) => {
        const someDay = new Date(baseDate.year, baseDate.month - 1, baseDate.day + dayOffset);
        // console.log("Начальная дата");
        // console.log(someDay.getDay());
        return someDay.getDay()

    },
}
