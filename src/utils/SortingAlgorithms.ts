import { Bar } from '../models/MenuModel';

export type SortState = {
  bars: Bar[];
};

const createFinalState = (state: SortState) => {
  for (let i = 0; i < state.bars.length; ++i) {
    state.bars[i].isColored = false;
  }
  return state;
};

class SortingAlgorithms {
  static bubble(e: Bar[], order: string) {
    let elements = [...e];
    let swapped = false;
    let states: SortState[] = [];

    for (let i = 0; i < elements.length; ++i) {
      swapped = false;
      for (let j = 0; j < elements.length - 1; ++j) {
        let tempState: SortState = JSON.parse(
          JSON.stringify({ bars: [...elements] }),
        );
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

          tempState = JSON.parse(JSON.stringify({ bars: [...elements] }));
          tempState.bars[j].isColored = true;
          tempState.bars[j + 1].isColored = true;
          states.push(tempState);
        }
      }

      if (!swapped) {
        break;
      }
    }

    states.push(createFinalState(states[states.length - 1]));
    return states;
  }

  static comb(e: Bar[], order: string) {
    let elements = [...e];
    const n = elements.length;
    let gap = n;
    let swapped = true;
    let states: SortState[] = [];

    const getNextGap = (gap: number) => {
      const local_gap = Math.floor((gap * 10) / 13);
      return local_gap < 1 ? 1 : local_gap;
    };

    while (1 !== gap || true === swapped) {
      gap = getNextGap(gap);
      swapped = false;

      for (let i = 0; i < n - gap; ++i) {
        let tempState: SortState = JSON.parse(
          JSON.stringify({ bars: [...elements] }),
        );
        tempState.bars[i].isColored = true;
        tempState.bars[i + gap].isColored = true;
        states.push(tempState);

        if (
          order === 'descending'
            ? elements[i].value < elements[gap + i].value
            : elements[i].value > elements[gap + i].value
        ) {
          swapped = true;

          const temp = elements[i];
          elements[i] = elements[gap + i];
          elements[i + gap] = temp;

          tempState = JSON.parse(JSON.stringify({ bars: [...elements] }));
          tempState.bars[i].isColored = true;
          tempState.bars[i + gap].isColored = true;
          states.push(tempState);
        }
      }
    }

    states.push(createFinalState(states[states.length - 1]));
    return states;
  }

  static insertion(e: Bar[], order: string) {
    let elements = [...e];
    let states: SortState[] = [];

    for (let i = 1; i < elements.length; ++i) {
      let key = elements[i];
      let j = i - 1;

      let tempState: SortState = JSON.parse(
        JSON.stringify({ bars: [...elements] }),
      );
      tempState.bars[j].isColored = true;
      tempState.bars[j + 1].isColored = true;
      states.push(tempState);

      while (
        j >= 0 &&
        (order === 'descending'
          ? elements[j].value < key.value
          : elements[j].value > key.value)
      ) {
        tempState = JSON.parse(JSON.stringify({ bars: [...elements] }));
        tempState.bars[j].isColored = true;
        tempState.bars[j + 1].isColored = true;
        states.push(tempState);

        elements[j + 1] = elements[j];

        tempState = JSON.parse(JSON.stringify({ bars: [...elements] }));
        tempState.bars[j].isColored = true;
        tempState.bars[j + 1].isColored = true;
        states.push(tempState);

        j = j - 1;
      }
      elements[j + 1] = key;
    }

    states.push(createFinalState(states[states.length - 1]));
    return states;
  }

  static selection(e: Bar[], order: string) {
    let elements = [...e];
    let states: SortState[] = [];

    for (let i = 0; i < elements.length - 1; ++i) {
      let current = i;

      const tempState: SortState = JSON.parse(
        JSON.stringify({ bars: [...elements] }),
      );
      tempState.bars[i].isColored = true;
      tempState.bars[current].isColored = true;
      states.push(tempState);

      let j = 0;
      for (j = i + 1; j < elements.length; ++j) {
        const tempComparedState: SortState = JSON.parse(
          JSON.stringify({ bars: [...elements] }),
        );

        tempComparedState.bars[i].isColored = true;
        tempComparedState.bars[j].isColored = true;
        tempComparedState.bars[current].isColored = true;
        states.push(tempComparedState);

        if (
          order === 'descending'
            ? elements[j].value > elements[current].value
            : elements[j].value < elements[current].value
        ) {
          current = j;
        }
      }

      const temp = elements[current];
      elements[current] = elements[i];
      elements[i] = temp;
    }

    states.push(createFinalState(states[states.length - 1]));
    return states;
  }
}

export default SortingAlgorithms;
