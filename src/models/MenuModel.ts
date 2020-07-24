import { observable, computed } from 'mobx';
import { model, Model, modelAction, prop } from 'mobx-keystone';
import SortingAlgorithms, { SortState } from '../utils/SortingAlgorithms';

export enum MenuStates {
  idle,
  playing,
  paused,
  done,
}

export enum Algorithms {
  bubble = 'bubble',
  comb = 'comb',
  heap = 'heap',
  insertion = 'insertion',
  selection = 'selection',
  shell = 'shell',
}

export enum SortOrder {
  ascending = '1',
  descending = '2',
}

export type Bar = {
  value: number;
  isColored: boolean;
};

@model('visualGo/MenuModel')
class MenuModel extends Model({
  speed: prop(Number, { setterAction: true }),
  elements: prop(Number, { setterAction: true }),
}) {
  constructor(props: any) {
    super(props);
    this.generateBars();
  }

  defaultElements = 15;
  defaultSpeed = 50;
  solStep = 0;
  solution: SortState[] = [];

  @observable
  bars: Bar[] = [];

  @observable
  state = MenuStates.idle;

  @observable
  algorithm: Algorithms = Algorithms.bubble;

  @observable
  order = SortOrder.ascending;

  @computed
  get animSpeed() {
    return (101 - this.speed) * 5;
  }

  @modelAction
  generateBars = () => {
    const bars = new Set<Bar>();
    const elems = new Set<Number>();

    while (elems.size < this.elements) {
      elems.add(Math.round(Math.random() * 98) + 1);
    }

    Array.from(elems).map((item) =>
      bars.add({ value: item as number, isColored: false }),
    );

    this.bars = Array.from(bars);
  };

  @modelAction
  generateSortSequence = () => {
    let sol;
    switch (this.algorithm) {
      case Algorithms.bubble: {
        sol = SortingAlgorithms.bubble(this.bars, this.order);
        break;
      }
      case Algorithms.comb: {
        sol = SortingAlgorithms.comb(this.bars, this.order);
        break;
      }
      case Algorithms.heap: {
        sol = SortingAlgorithms.heap(this.bars, this.order);
        break;
      }
      case Algorithms.insertion: {
        sol = SortingAlgorithms.insertion(this.bars, this.order);
        break;
      }
      case Algorithms.selection: {
        sol = SortingAlgorithms.selection(this.bars, this.order);
        break;
      }
      case Algorithms.shell: {
        sol = SortingAlgorithms.shell(this.bars, this.order);
        break;
      }
    }

    if (!sol) {
      return;
    }

    this.solution = sol;
    this.bars = this.solution[this.solStep].bars;
    this.state = MenuStates.playing;
  };

  @modelAction
  play = () => {
    if (this.state === MenuStates.idle) {
      this.generateSortSequence();
      return;
    } else if (this.state === MenuStates.done) {
      return;
    } else if (this.state === MenuStates.paused) {
      this.bars = this.solution[this.solStep].bars;
      this.state = MenuStates.playing;
    }
  };

  @modelAction
  pause = () => {
    if (this.state !== 1) {
      return;
    }

    this.state = 2;
  };

  @modelAction
  reset = () => {
    if (this.state !== MenuStates.playing) {
      this.state = 0;
      this.solution = [];
      this.solStep = 0;
      this.generateBars();
    }
  };

  @modelAction
  nextState = () => {
    this.solStep++;
    if (!this.solution[this.solStep]?.bars) {
      this.state = 3;
      return;
    }
    this.bars = this.solution[this.solStep].bars;
  };
}

export default MenuModel;
