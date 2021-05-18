import compareFunction from "../component/utils/compareFunction";

const data = [
    {
        "userId": 3,
        "id": 6,
        "task title": "c f i",
        "completed": false,
        "date": "2023-01-23T18:25:43.511Z"
    },
    {
        "userId": 2,
        "id": 5,
        "task title": "b e h",
        "completed": true,
        "date": "2021-02-23T18:25:43.511Z"
    },
    {
        "userId": 1,
        "id": 4,
        "task title": "a d g",
        "completed": "",
        "date": "2021-01-23T18:26:43.511Z"
    }
]


const sortedData = [
    {
        "userId": 1,
        "id": 4,
        "task title": "a d g",
        "completed": "",
        "date": "2021-01-23T18:26:43.511Z"
    },
    {
        "userId": 2,
        "id": 5,
        "task title": "b e h",
        "completed": true,
        "date": "2021-02-23T18:25:43.511Z"
    },
    {
        "userId": 3,
        "id": 6,
        "task title": "c f i",
        "completed": false,
        "date": "2023-01-23T18:25:43.511Z"
    }
]

test("Sort string", () => {
    expect(data.sort(compareFunction("task title", "asc"))).toStrictEqual(sortedData);
});
test("Sort number", () => {
    expect(data.sort(compareFunction("id", "desc"))).toStrictEqual(data);
});
test("Sort date", () => {
    expect(data.sort(compareFunction("date", "asc"))).toStrictEqual(sortedData);
});
