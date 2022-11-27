class Validator {
  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  getHorizontalNumberLines(sudoku) {
    sudoku = sudoku.replace(/\|/g, '')
    const extractHorizontalLines = sudoku.split('\n');
    const horizontalCharArray = extractHorizontalLines.map(line => line.split(' '));
    const horizontalNumCharArray = horizontalCharArray.map(charLine => charLine.filter(char => (/\d+/g).test(char))
    ).filter(array => array.length);
    const horizontalNumArrays = horizontalNumCharArray.map(line => line.map(no => +no));
    return horizontalNumArrays;
  }

  getVerticalNumberLines(horizontalNumArrays) {
    const verticalNumArrays = [];
    for (let index = 0; index < horizontalNumArrays.length; index++) {
      const verticalNumArray = horizontalNumArrays.map(line => line[index]);
      verticalNumArrays.push(verticalNumArray);
    }
    return verticalNumArrays;
  }

  getSudokuSubBoxes(horizontalNumArrays) {
    const threeByThreeArrays = [];
    let out = 0;
    for (let index1 = 0; index1 < 3; index1++) {
      let oneRowBox = []; let secondBox = []; let thirdBox = [];
      for (let index = 0; index < 3; index++, out++) {
        oneRowBox = [...oneRowBox, ...horizontalNumArrays[out].slice(0, 3)];
        secondBox = [...secondBox, ...horizontalNumArrays[out].slice(3, 6)];
        thirdBox = [...thirdBox, ...horizontalNumArrays[out].slice(6, 9)];
      }
      threeByThreeArrays.push(oneRowBox);
      threeByThreeArrays.push(secondBox);
      threeByThreeArrays.push(thirdBox);
    }
    return threeByThreeArrays;
  }

  validateLines(linesArray) {
    for (let index = 0; index < linesArray.length; index++) {
      const line = linesArray[index];
      if (line.sort((a, b) => a - b).toString() !== '1,2,3,4,5,6,7,8,9') { return false; }
    }
    return true;
  }

  validateNotCompleteLines(linesArray) {
    for (let index = 0; index < linesArray.length; index++) {
      const line = linesArray[index];
      const sortedLine = line.sort((a, b) => a - b);
      const duplicateRemovedLine = new Set(sortedLine);
      const checkBelowTen = sortedLine.every(no => no < 10);
      const checkNoDuplicate = sortedLine.reduce((t, v) => t + v) === [...duplicateRemovedLine].reduce((t, v) => t + v);
      if (!checkBelowTen | !checkNoDuplicate) {
        return false;
      }
    }
    return true;
  }

  validate(sudoku) {
    // Your code here
    const horizontalNumArrays = this.getHorizontalNumberLines(sudoku);
    const verticalNumArrays = this.getVerticalNumberLines(horizontalNumArrays);
    const sudokuSubBoxes = this.getSudokuSubBoxes(horizontalNumArrays);

    if (sudoku.includes('0')) {
      const horizontal = this.validateNotCompleteLines(horizontalNumArrays);
      const vertical = this.validateNotCompleteLines(verticalNumArrays);
      const box = this.validateNotCompleteLines(sudokuSubBoxes);
      if (horizontal && vertical && box) {
        return 'Sudoku is valid but incomplete.';
      } else {
        return 'Sudoku is invalid.';
      }

    }

    const hLineValidate = this.validateLines(horizontalNumArrays);
    const vLineValidate = this.validateLines(verticalNumArrays);
    const sudokuSubBoxesValidate = this.validateLines(sudokuSubBoxes);

    if (hLineValidate && vLineValidate && sudokuSubBoxesValidate) {
      return 'Sudoku is valid.';
    }
    else {
      return 'Sudoku is invalid.'
    }
  }
}

module.exports = Validator
