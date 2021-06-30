import * as React from 'react'
import {MouseEvent, ReactNode} from 'react'
import {BehaviorSubject, Observable, Subscription} from 'rxjs'
import {delay, map, throttleTime} from 'rxjs/operators'
import {IVirtualListOptions, VirtualList} from 'vist'
import style from './styles.css'

interface IVlistProps<T> {
  data$: Observable<T[]>;
  value: any;
  onChange: (v: T) => void;
  keyProp: any;
  itemHeight?: number;
  index: number;
  emptyTpl?: ReactNode;
  // use to tell virtual list to refresh options
  refresh$: Observable<void>;
}

interface IVlistState {
  options: IVirtualListOptions;
  options$: BehaviorSubject<IVirtualListOptions>;
  isEmpty: boolean;
}

export class Vlist<T> extends React.Component<IVlistProps<T>, IVlistState> {
  state = {
    options: {height: this.props.itemHeight || 32, resize: false, spare: 10},
    options$: new BehaviorSubject<IVirtualListOptions>({height: this.props.itemHeight || 32}),
    isEmpty: false,
  }

  private readonly options$: Observable<IVirtualListOptions>
  private _sub: Subscription[] = []

  constructor(props: any) {
    super(props)

    this.onSelect = this.onSelect.bind(this)

    // to prevent many options at one time
    this.options$ = this.state.options$.pipe(throttleTime(10))
  }

  static getDerivedStateFromProps<T>(props: IVlistProps<T>, state: IVlistState) {
    const options = {...state.options}
    let changed = false

    if (props.itemHeight !== undefined && props.itemHeight !== options.height) {
      options.height = props.itemHeight
      changed = true
    }

    if (props.index !== options.startIndex) {
      options.startIndex = props.index
      changed = true
    }

    if (changed) {
      state.options$.next(options)
    }

    return changed ? {options} : null
  }

  private static preventDefault(e: MouseEvent) {
    e.preventDefault()
  }

  componentDidMount(): void {
    this._sub.push(
      this.props.data$.pipe(
        map(data => !Boolean(data.length)),
      ).subscribe(isEmpty => this.setState({isEmpty})),
    )

    this._sub.push(
      this.props.refresh$
        .pipe(delay(1))
        .subscribe(() => this.state.options$.next(this.state.options)),
    )
  }

  componentWillUnmount(): void {
    this._sub.forEach(s => s.unsubscribe())
  }

  render() {
    const itemHeight = this.props.itemHeight || 32

    return (
      <div className="ant-dropdown-menu" onMouseDown={Vlist.preventDefault}>
        {!this.state.isEmpty ? (
          <VirtualList
            data$={this.props.data$}
            options$={this.options$}
            style={{maxHeight: 250}}
          >
            {(item: T) => (
              <div
                style={{height: itemHeight}}
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
    )
  }

  private getItemClassName<T>(item: T) {
    const clsName =
      // @ts-ignore
      (this.props.keyProp ? item[this.props.keyProp] : item) === this.props.value ? style.VListItemActivated : ''

    return [clsName, style.VlistItem].join(' ')
  }

  private onSelect(e: T) {
    this.props.onChange(e)
  }
}
