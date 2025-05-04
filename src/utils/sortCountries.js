export const sortCountries = (data, field, order = "asc") => {
    return [...data].sort((a, b) => {
        const valA = a[field];
        const valB = b[field];

        if (typeof valA === "string") {
            return order === "asc"
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
        } else {
            return order === "asc" ? valA - valB : valB - valA;
        }
    });
};
