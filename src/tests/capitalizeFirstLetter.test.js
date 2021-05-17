import capitalizeFirstLetter from "../component/utils/capitalizeFirstLetter";

test("Capitalize First Letter", () => {
    const word = "hello"
    expect(capitalizeFirstLetter(word)).toBe("Hello")
});
