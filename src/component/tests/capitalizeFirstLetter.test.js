import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

test("Capitalize First Letter", () => {
    const word = "hello"
    expect(capitalizeFirstLetter(word)).toBe("Hello")
});
