const fs = require("fs").promises; 

async function distributeGoodies(inputFilePath, outputFilePath, numEmployees) {
 
  const data = await fs.readFile(inputFilePath, "utf8");
  const goodies = parseInputData(data);

  
  goodies.sort((a, b) => a.price - b.price);

  let minDiff = Number.MAX_SAFE_INTEGER;
  let selectedGoodies = [];

  for (let i = 0; i <= goodies.length - numEmployees; i++) {
    const currentGoodies = goodies.slice(i, i + numEmployees);
    const diff = currentGoodies[currentGoodies.length - 1].price - currentGoodies[0].price;

    if (diff < minDiff) {
      minDiff = diff;
      selectedGoodies = currentGoodies;
    }
  }

  const output = generateOutput(selectedGoodies, minDiff, numEmployees);

  await fs.writeFile(outputFilePath, output);

  return { message: "Goodies distributed successfully", outputFilePath };
}

function parseInputData(data) {
  const lines = data.trim().split("\n");
  const goodies = [];

  for (const line of lines) {
    const [name, price] = line.split(":");
    goodies.push({
      name: name.trim(),
      price: parseInt(price.trim()),
    });
  }

  return goodies;
}

function generateOutput(selectedGoodies, minDiff, numEmployees) {
  let output = `Number of employees: ${numEmployees}\n\nHere the goodies that are selected for distribution are:\n`;
  
  selectedGoodies.forEach(goodie => {
    output += `${goodie.name}: ${goodie.price}\n`;
  });
  
  output += `\nAnd the difference between the chosen goodie with highest price and the lowest price is ${minDiff}\n`;

  return output;
}

module.exports = { distributeGoodies };
