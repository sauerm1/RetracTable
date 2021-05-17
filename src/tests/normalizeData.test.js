import normalizeData from "../component/utils/normalizeData";

const abnormalData = [
    {
        userId: 1,
        id: 1,
        completed: false,
    },
    {
        userId: 1,
        id: 2,
        title: "Change lightbulb",
    },
];

const normalizedData = [
    {
        userId: 1,
        id: 1,
        title: "",
        completed: false,
    },
    {
        userId: 1,
        id: 2,
        title: "Change lightbulb",
        completed: "",
    },
];


test("Normalizes Data", () => {
    expect(normalizeData(abnormalData)).toStrictEqual(normalizedData);
});
