import { observable } from 'mobx';
import { model, Model, modelAction, prop } from 'mobx-keystone';
import SortingAlgorithms, { SortState } from '../SortingAlgorithms';

export enum MenuStates {
  idle,
  playing,
  paused,
  done,
}

export enum Algorithms {
  bubble = '1',
  comb = '2',
  heap = '3',
  insertion = '4',
  selection = '5',
  shell = '6',
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
  algorithm = Algorithms.bubble;

  @observable
  order = SortOrder.ascending;

  @modelAction
  generateBars = () => {
    const set = new Set<Bar>();

    while (set.size < this.elements) {
      set.add({ value: Math.round(Math.random() * 99) + 1, isColored: false });
    }

    this.bars = Array.from(set);
  };

  @modelAction
  generateSortSequence = () => {
    this.solution = SortingAlgorithms.bubble(this.bars, this.order);
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
    this.state = 0;
    this.solution = [];
    this.solStep = 0;
    this.generateBars();
  };
}

export default MenuModel;
