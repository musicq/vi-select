import * as React from 'react';
import { BehaviorSubject, Observable } from 'rxjs';
import { VirtualList } from 'vist';
import { IVirtualListOptions } from 'vist/dist';
import style from './styles.css';

interface IVlistProps<T> {
  data$: Observable<T[]>;
  value: any;
  onChange: (v: T) => void;
  keyProp: any;
  itemHeight?: number;
  index: number;
}

interface IVlistState {
  options: IVirtualListOptions;
  options$: BehaviorSubject<IVirtualListOptions>;
}

export class Vlist<T> extends React.Component<IVlistProps<T>, IVlistState> {
  state = {
    options: { height: this.props.itemHeight || 32, resize: false },
    options$: new BehaviorSubject<IVirtualListOptions>({ height: this.props.itemHeight || 32 })
  };

  constructor(props: any) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  static getDerivedStateFromProps<T>(props: IVlistProps<T>, state: IVlistState) {
    const options = state.options;

    if (props.itemHeight !== undefined && props.itemHeight !== options.height) {
      options.height = props.itemHeight;
    }

    if (props.index !== options.startIndex) {
      options.startIndex = props.index;
    }

    state.options$.next(options);

    return options;
  }

  static getActivatedClassName() {
    return style.VListItemActivated + ' ' + style.VlistItem;
  }

  onSelect(e: T) {
    this.props.onChange(e);
  }

  render() {
    const itemHeight = this.props.itemHeight || 32;

    return (
      <div className="ant-dropdown-menu" onMouseDown={(e: any) => e.preventDefault()}>
        <VirtualList
          data$={this.props.data$}
          options$={this.state.options$}
          style={{ height: 400 }}
        >
          {(item: T) => (
            <div
              style={{ height: itemHeight }}
              className={
                (this.props.keyProp ? item[this.props.keyProp] : item) === this.props.value
                  ? Vlist.getActivatedClassName()
                  : style.VlistItem
              }
              onClick={() => this.onSelect(item)}
            >
              {(this.props.children as any)(item)}
            </div>
          )}
        </VirtualList>
      </div>
    );
  }
}
