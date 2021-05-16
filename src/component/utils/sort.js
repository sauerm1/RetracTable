export const compareValues = (key, order = "asc") => {
    return (a, b) => {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        const varA =
            typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB =
            typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
    };
};

const handleSort = (sortState, newField) => {
    let newOrder;
    if (sortState.field === newField) {
        switch (sortState.order) {
            case "asc":
                newOrder = "desc";
                break;
            case "desc":
                newOrder = "asc";
                break;
            default:
                newOrder = "asc";
        }
    } else if (sortState.field === null || sortState.field !== newField) {
        newOrder = "asc";
    }
    setSortState({
        field: newField,
        order: newOrder,
    });
    setDisplayedData(displayedData.sort(compareValues(newField, newOrder)));
};

export default handleSort;