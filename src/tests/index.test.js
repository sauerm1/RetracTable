import  DataTable from "../component/index";
// const getNewSortOrder = DataTable.__get__('getNewSortOrder');

test("Component Exists", () => {
    expect(DataTable.exists);
});



// test("New Sort Order", () => {
//     const sortState = {
//         field: null,
//         order: "desc",
//     }
//     const sortField = "col1"

//     const sortState2 = {
//         field: col1,
//         order: "asc",
//     }
//     expect(getNewSortOrder(sortState, sortField)).toBe("asc")
//     expect(getNewSortOrder(sortState2, sortField)).toBe("desc")
// });
