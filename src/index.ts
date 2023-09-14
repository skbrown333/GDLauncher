import Mine from "./Mine";

const smallMine = new Mine("small_input.txt", 5);
console.log("🚀 ~ file: index.ts:4 ~ smallMine:", smallMine.insecureValues);

const largeMine = new Mine("large_input.txt");
console.log("🚀 ~ file: index.ts:7 ~ largeMine:", largeMine.insecureValues);
