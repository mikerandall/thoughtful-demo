/**
Sort the packages using the following criteria:

- A package is **bulky** if its volume (Width x Height x Length) is greater than or equal to 1,000,000 cm³ or when one of its dimensions is greater or equal to 150 cm.
- A package is **heavy** when its mass is greater or equal to 20 kg.
*/

function isBulky(width, height, length) {
  const dimGreaterThan150 = [width, height, length].some((d) => d > 150);
  const volumeGreaterThan1M = width * height * length > 1000000;
  return dimGreaterThan150 || volumeGreaterThan1M;
}

function isHeavy(mass) {
  return mass >= 20;
}

function generatePackage() {
  const randomMultiplier = Math.ceil(Math.random() * 10);
  // console.log("randomMultiplier: " + randomMultiplier);
  const width = Math.floor(Math.random() * 100 * randomMultiplier);
  const height = Math.ceil(Math.random() * 100 * randomMultiplier);
  const length = Math.floor(Math.random() * 100 * randomMultiplier);
  const mass = Math.ceil(Math.random() * 10 * randomMultiplier);
  return { width, height, length, mass };
}

function createPackage() {
  const package = generatePackage();
  const { width, height, length, mass } = package;
  // console.log(package);
  const sortedPackage = sort(width, height, length, mass);
  const sortedDiv = document.getElementById("sortedPackage");
  sortedDiv.innerHTML = `Package: ${JSON.stringify(
    package
  )}<br>Status: <b>${sortedPackage}</b>`;
}
/**
You must dispatch the packages in the following stacks:

- **STANDARD**: standard packages (those that are not bulky or heavy) can be handled normally.
- **SPECIAL**: packages that are either heavy or bulky can't be handled automatically.
- **REJECTED**: packages that are **both** heavy and bulky are rejected.
*/

function sort(width, height, length, mass) {
  const bulky = isBulky(width, height, length);
  // console.log(`bulky: ${bulky}`);
  const heavy = isHeavy(mass);
  // console.log(`heavy: ${heavy}`);
  if (bulky && heavy) {
    return "REJECTED";
  } else if (heavy || bulky) {
    return "SPECIAL";
  } else {
    return "STANDARD";
  }
}
