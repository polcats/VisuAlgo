import { Bar } from './models/MenuModel';

export type SortState = {
  bars: Bar[];
};

class SortingAlgorithms {
  static bubble(e: Bar[], order: string) {
    let elements = [...e];
    let swapped = false;
    let states: SortState[] = [];

    for (let i = 0; i < elements.length; ++i) {
      swapped = false;
      for (let j = 0; j < elements.length - 1; ++j) {
        const tempState: SortState = { bars: [...elements] };
        tempState.bars[j].isColored = true;
        tempState.bars[j + 1].isColored = true;
        states.push(tempState);

        if (
          order === 'descending'
            ? elements[j].value < elements[j + 1].value
            : elements[j].value > elements[j + 1].value
        ) {
          swapped = true;
          const tempElem = elements[j];
          elements[j] = elements[j + 1];
          elements[j + 1] = tempElem;

          const tempComparedState: SortState = { bars: [...elements] };
          tempComparedState.bars[j].isColored = true;
          tempComparedState.bars[j + 1].isColored = true;
          states.push(tempComparedState);
        }
      }

      if (!swapped) {
        break;
      }
    }

    return states;
  }
}

export default SortingAlgorithms;
