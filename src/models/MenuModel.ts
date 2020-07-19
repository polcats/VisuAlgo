import { observable } from 'mobx';
import { model, Model, modelAction, prop } from 'mobx-keystone';

enum MenuStates {
  idle,
  playing,
  paused,
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

type Bar = {
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
}

export default MenuModel;
