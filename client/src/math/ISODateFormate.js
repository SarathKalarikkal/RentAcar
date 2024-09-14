export const convertToISODate = (dateStr) => {
    console.log("Input date string:", dateStr);

    if (!dateStr || dateStr.length !== 10) {
        throw new Error("Invalid date string");
    }

    const [year, month, day] = dateStr.split('-'); // Assuming the format is YYYY-MM-DD

    if (!day || !month || !year) {
        throw new Error("Invalid date components");
    }

    const date = new Date(`${year}-${month}-${day}`);

    if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
    }

    return date.toISOString();
};
