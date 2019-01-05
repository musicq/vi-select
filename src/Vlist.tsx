import * as React from 'react';
import { MouseEvent, ReactNode } from 'react';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';
import { IVirtualListOptions, VirtualList } from 'vist';
import style from './styles.css';

interface IVlistProps<T> {
  data$: Observable<T[]>;
  value: any;
  onChange: (v: T) => void;
  keyProp: any;
  itemHeight?: number;
  index: number;
  emptyTpl?: ReactNode
}

interface IVlistState {
  options: IVirtualListOptions;
  options$: BehaviorSubject<IVirtualListOptions>;
  isEmpty: boolean;
}

export class Vlist<T> extends React.Component<IVlistProps<T>, IVlistState> {
  state = {
    options: { height: this.props.itemHeight || 32, resize: false },
    options$: new BehaviorSubject<IVirtualListOptions>({ height: this.props.itemHeight || 32 }),
    isEmpty: false
  };

  private readonly options$: Observable<IVirtualListOptions>;

  constructor(props: any) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
    this.preventDefault = this.preventDefault.bind(this);

    this.options$ = this.state.options$.pipe(
      throttleTime(10)
    );
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

  componentDidMount(): void {
    this.props.data$.pipe(
      map(data => !Boolean(data.length))
    ).subscribe(isEmpty => this.setState({ isEmpty }));
  }

  render() {
    const itemHeight = this.props.itemHeight || 32;

    return (
      <div className="ant-dropdown-menu" onMouseDown={this.preventDefault}>
        {!this.state.isEmpty ? (
          <VirtualList
            data$={this.props.data$}
            options$={this.options$}
            style={{ maxHeight: 250 }}
          >
            {(item: T) => (
              <div
                style={{ height: itemHeight }}
                className={this.getItemClassName(item)}
                onClick={() => this.onSelect(item)}
              >
                {(this.props.children as any)(item)}
              </div>
            )}
          </VirtualList>
        ) : (
          <div className={style.VListItemDisabled}>
            {this.props.emptyTpl ? this.props.emptyTpl : '无匹配项目'}
          </div>
        )}
      </div>
    );
  }

  private getItemClassName<T>(item: T) {
    return (this.props.keyProp ? item[this.props.keyProp] : item) === this.props.value
      ? Vlist.getActivatedClassName()
      : style.VlistItem;
  }

  private onSelect(e: T) {
    this.props.onChange(e);
  }

  private preventDefault(e: MouseEvent) {
    e.preventDefault();
  }
}
