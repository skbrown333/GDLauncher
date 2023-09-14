import fs from "fs";

class Mine {
  public values: number[];
  private validationSize: number;

  constructor(filename: string, validationSize: number = 100) {
    this.values = this.loadMine(filename);
    this.validationSize = validationSize;
  }

  /**
   * Returns insecure values from a mine.
   *
   * @returns number[]
   */
  public get insecureValues(): number[] {
    // We are assuming the first 100 numbers of the mine are always secure
    // so we should be able to assume the mines length is {size}+
    if (this.values == null || this.values.length < this.validationSize) {
      throw new Error(`Mine of length > ${this.validationSize} required`);
    }

    const invalidNumbers: number[] = [];

    for (let index = this.validationSize; index < this.values.length; index++) {
      if (!this.isValueSecure(index)) {
        invalidNumbers.push(this.values[index]);
      }
    }

    return invalidNumbers;
  }

  /**
   * Checks whether the value at the given index is secure.
   *
   * @param index index of the value to check
   * @returns boolean
   */
  private isValueSecure(index: number): boolean {
    const diffMap: { [valueNeeded: number]: boolean } = {};

    for (
      let previousIndex = index - this.validationSize;
      previousIndex < index;
      previousIndex++
    ) {
      const diff = this.values[index] - this.values[previousIndex];

      if (diffMap[diff] != null) {
        return true;
      }

      diffMap[this.values[previousIndex]] = true;
    }

    return false;
  }

  private loadMine(filename: string) {
    try {
      const input = fs.readFileSync(filename).toString("utf-8");
      return input.split("\n").map((n) => parseInt(n));
    } catch {
      throw new Error("Failed to load input file");
    }
  }
}

export default Mine;
