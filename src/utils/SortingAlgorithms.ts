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
    const n = e.length;
    let elements = [...e];
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

  static heap(e: Bar[], order: string) {
    const n: number = e.length;
    let elements = [...e];
    let states: SortState[] = [];

    const heapify = (
      elements: Bar[],
      n: number,
      i: number,
      solution: SortState[],
      order: string,
    ) => {
      let current = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;

      if (
        left < n &&
        (order == 'ascending'
          ? elements[left].value > elements[current].value
          : elements[left].value < elements[current].value)
      ) {
        current = left;
      }

      if (
        right < n &&
        (order == 'ascending'
          ? elements[right].value > elements[current].value
          : elements[right].value < elements[current].value)
      ) {
        current = right;
      }

      let tempState: SortState = JSON.parse(
        JSON.stringify({ bars: [...elements] }),
      );
      tempState.bars[i].isColored = true;
      tempState.bars[current].isColored = true;
      states.push(tempState);

      if (current != i) {
        const temp = elements[i];
        elements[i] = elements[current];
        elements[current] = temp;

        tempState = JSON.parse(JSON.stringify({ bars: [...elements] }));
        tempState.bars[i].isColored = true;
        tempState.bars[current].isColored = true;
        states.push(tempState);

        heapify(elements, n, current, solution, order);
      }
    };

    for (let i = Math.trunc(n / 2) - 1; i >= 0; --i) {
      heapify(elements, n, i, states, order);
    }

    for (let i = n - 1; i >= 0; --i) {
      const temp = elements[0];
      elements[0] = elements[i];
      elements[i] = temp;

      const tempState: SortState = JSON.parse(
        JSON.stringify({ bars: [...elements] }),
      );
      tempState.bars[0].isColored = true;
      tempState.bars[i].isColored = true;
      states.push(tempState);

      heapify(elements, i, 0, states, order);
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

      let tempState: SortState = JSON.parse(
        JSON.stringify({ bars: [...elements] }),
      );
      tempState.bars[i].isColored = true;
      tempState.bars[current].isColored = true;
      states.push(tempState);

      let j = 0;
      for (j = i + 1; j < elements.length; ++j) {
        tempState = JSON.parse(JSON.stringify({ bars: [...elements] }));
        tempState.bars[i].isColored = true;
        tempState.bars[j].isColored = true;
        tempState.bars[current].isColored = true;
        states.push(tempState);

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

  static shell(e: Bar[], order: string) {
    const n: number = e.length;
    let elements = [...e];
    let states: SortState[] = [];

    for (
      let gap: number = Math.trunc(n / 2);
      gap > 0;
      gap = Math.trunc(gap / 2)
    ) {
      for (let i = gap; i < n; ++i) {
        const temp = elements[i];
        let j;
        let tempState: SortState;

        for (
          j = i;
          j >= gap &&
          (order == 'desc'
            ? elements[j - gap].value < temp.value
            : elements[j - gap].value > temp.value);
          j -= gap
        ) {
          tempState = JSON.parse(JSON.stringify({ bars: [...elements] }));
          tempState.bars[i].isColored = true;
          tempState.bars[j - gap].isColored = true;
          states.push(tempState);

          elements[j] = elements[j - gap];

          tempState = JSON.parse(JSON.stringify({ bars: [...elements] }));
          tempState.bars[j].isColored = true;
          tempState.bars[j - gap].isColored = true;
          states.push(tempState);
        }

        tempState = JSON.parse(JSON.stringify({ bars: [...elements] }));
        tempState.bars[i].isColored = true;
        tempState.bars[j].isColored = true;
        states.push(tempState);

        elements[j] = temp;
      }
    }

    states.push(createFinalState(states[states.length - 1]));
    return states;
  }
}

export default SortingAlgorithms;
