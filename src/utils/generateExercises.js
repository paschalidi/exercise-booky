const fs = require("fs");
const path = require("path");
const ex = require("../react-training-full");

const handleError = err => (err ? console.log(err) : false);

const addBoilerplateCode = (code, test) => {
  const fullName = code.split(" ")[1] || "";
  const componentName =
    fullName && fullName.includes("(") ? fullName.split("(")[0] : fullName;

  const completeCode = `import React from "react";\n\n${code}\n\nexport default ${componentName}`;
  const completeTest = `import React from "react";\nimport { expect } from "chai";\nimport Enzyme, { shallow } from "enzyme";\nimport Adapter from "enzyme-adapter-react-16";\nimport ${componentName} from './index'\n\nEnzyme.configure({ adapter: new Adapter() });\n\n${test}`;
  return [completeCode, completeTest];
};

const writeExerciseToFile = async (
  exercise,
  componentDestination,
  testsDestination
) => {
  const [component, test] = addBoilerplateCode(
    exercise.codeDefault,
    exercise.target[0].code
  );

  await fs.writeFile(componentDestination, "", handleError);
  await fs.writeFile(
    componentDestination,
    component,
    { flag: "a" },
    handleError
  );

  await fs.writeFile(testsDestination, "", handleError);
  await fs.writeFile(testsDestination, test, { flag: "a" }, handleError);
};

const levels = {
  junior: 0,
  medium: 0,
  senior: 0
};

const files = [];

ex.forEach(item => {
  levels[item.level] += 1;
  item.tests.forEach(async (exercise, index) => {
    const currentIndex = (index + 1).toString();
    const currentPart = levels[item.level].toString();
    const filePath = path.join(
      __dirname,
      "..",
      "exercises",
      item.level,
      `part-${currentPart}`,
      currentIndex
    );

    if (!fs.existsSync(filePath)) {
      await fs.mkdir(filePath, { recursive: true }, handleError);
    }
    const componentDestination = `${filePath}/index.js`;
    const testsDestination = `${filePath}/index.spec.js`;
    await writeExerciseToFile(exercise, componentDestination, testsDestination);

    files.push({
      destination: `${item.level}/part-${currentPart}/${currentIndex}`
    });
  });
});

module.exports.files = files;
