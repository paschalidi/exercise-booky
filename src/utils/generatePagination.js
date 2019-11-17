const files = require("./generateExercises");

export const pages = files
  .map(({ destination }, index, fullArray) => {
    console.log(fullArray);
    console.log(fullArray);

    const exercise = require(`../exercises/${destination}`);

    Object.assign(exercise, {
      previous: fullArray[index - 1],
      next: fullArray[index + 1]
    });

    return {
      exercise,
      filename: destination
    };
  })
  .sort((a, b) => parseInt(a.filename, 10) - parseInt(b.filename, 10));
