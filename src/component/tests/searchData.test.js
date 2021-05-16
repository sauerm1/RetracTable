import searchData from "../utils/searchData";

test("Search Data", () => {
    const normalizedData = [
        {
            userId: 1,
            id: 1,
            title: "Grocery shopping",
            completed: false,
        },
        {
            userId: 1,
            id: 2,
            title: "Change lightbulb",
            completed: false,
        },
        {
            userId: 1,
            id: 3,
            title: "Pick up kids",
            completed: true,
        },
        {
            userId: 1,
            id: 3,
            title: "Pick up kids",
            completed: true,
        },
        {
            userId: 1,
            id: 4,
            title: "Cut grass",
            completed: true,
        },
    ];

    const stringSearched = "pi";
    let fieldSelected = "";

    const expectedResult = [
        {
            userId: 1,
            id: 1,
            title: "Grocery shopping",
            completed: false,
        },
        {
            userId: 1,
            id: 3,
            title: "Pick up kids",
            completed: true,
        },
        {
            userId: 1,
            id: 3,
            title: "Pick up kids",
            completed: true,
        },
    ];

    expect(searchData(normalizedData, stringSearched, fieldSelected)).toStrictEqual(
        expectedResult
    );

    fieldSelected = "title"

    expect(searchData(normalizedData, stringSearched, fieldSelected)).toStrictEqual(
        expectedResult
    );
});
