import compareFunction from "../component/utils/compareFunction";

test("Compare Function", () => {
    const idSorted = [
        {
            userId: 12,
            id: 1,
            title: "ghi",
            completed: true,
        },
        {
            userId: 11,
            id: 2,
            title: "def",
            completed: false,
        },
        {
            userId: 10,
            id: 3,
            title: "abc",
            completed: true,
        },
    ];

    const titleSorted = [
        {
            userId: 10,
            id: 3,
            title: "abc",
            completed: true,
        },
        {
            userId: 11,
            id: 2,
            title: "def",
            completed: false,
        },
        {
            userId: 12,
            id: 1,
            title: "ghi",
            completed: true,
        },
    ];
    expect(idSorted.sort(compareFunction("title", "asc"))).toStrictEqual(titleSorted);
    expect(titleSorted.sort(compareFunction("id", "desc"))).toStrictEqual(titleSorted);
});
