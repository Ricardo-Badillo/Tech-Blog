module.exports = {
    format_time: (date) => {
        return date.toLocalTimeString();
    },
    format_date: (date) => {
        return `${new Date(date).getMonth()}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    }
};