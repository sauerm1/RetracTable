import capitalizeString from "./capitalizeString";

const normalizeData = (data, capitalize) => {
    let keys = [];
    for (const i in data) {
        Object.keys(data[i]).forEach((i) => {
            if (!keys.includes(i)) {
                keys.push(i);
            }
        });
    }
    const normalizedData = data.map((r) => {
        let row = {};
        keys.forEach((k) => {
            let cell;
            if (r[k] !== undefined && r[k] !== null) {
                cell = r[k];
            } else {
                cell = "";
            }
            row[capitalize ? capitalizeString(k) : k] = cell;
        });
        return row;
    });
    return normalizedData;
};

export default normalizeData;
