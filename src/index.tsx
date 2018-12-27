import { Dropdown, Input } from 'antd';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Vlist } from './Vlist';

interface IVSelectProps<T> {
  placeholder?: string;
  value?: string;
  onChange?: Function;
  dataSource: T[];
  searchField: string;
}

interface IVSelectState<T> {
  visible: boolean;
  placeholder: string | undefined;
  value: any | undefined;
  originValue: any | undefined;
  originPlaceholder: any | undefined;
  lastValue: any | undefined;
  dataSourceSnapshot: T[];
  dataSource$: BehaviorSubject<T[]>;
  value$: BehaviorSubject<string | undefined>;
}

export class VSelect<T> extends React.Component<IVSelectProps<T>, IVSelectState<T>> {
  state = {
    visible: false,
    placeholder: undefined,
    value: undefined,
    dataSourceSnapshot: [] as T[],

    originValue: undefined,
    originPlaceholder: undefined,
    lastValue: undefined,
    dataSource$: new BehaviorSubject<T[]>([]),
    value$: new BehaviorSubject<string>('')
  };

  private _sub: Subscription[] = [];
  private dataSource$: Observable<T[]>;

  constructor(props: any) {
    super(props);

    this.onInput = this.onInput.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onVisibleChange = this.onVisibleChange.bind(this);
  }

  static getDerivedStateFromProps<T>(props: IVSelectProps<T>, state: IVSelectState<T>) {
    const ns = {} as IVSelectState<T>;

    if (props.placeholder !== state.originPlaceholder) {
      ns.placeholder = props.placeholder;
      ns.originPlaceholder = props.placeholder;
    }

    if (props.value !== state.originValue) {
      ns.value = props.value;
      ns.originValue = props.value;
      state.value$.next(props.value);
    }

    if (props.dataSource !== state.dataSourceSnapshot) {
      ns.dataSourceSnapshot = props.dataSource;
      state.dataSource$.next(props.dataSource);
    }

    return Object.keys(ns).length ? ns : null;
  }

  componentDidMount(): void {
    this.dataSource$ = combineLatest(this.state.dataSource$, this.state.value$).pipe(
      distinctUntilChanged(),
      map(([dataSource, value]) => dataSource.filter(
        source => value
          ? source[this.props.searchField].toString().toLowerCase().includes(value.toString().toLowerCase())
          : dataSource
      ))
    );
  }

  componentWillUnmount(): void {
    this._sub.forEach(s => s.unsubscribe());
  }

  onShow() {
    const lastValue = this.state.value;
    const placeholder = lastValue === undefined ? this.state.placeholder : lastValue;
    const value = undefined;

    this.state.value$.next('');
    this.setState({ visible: true, placeholder, value, lastValue });
  }

  onClose() {
    const ns = {
      visible: false,
      placeholder: this.state.originPlaceholder,
      // value not set, recover
      // TODO current value is not valid(not exist in the list), reset it to the origin value
      // TODO use searchKeyWord not value
      value: this.state.value === undefined || this.state.value === '' ? this.state.lastValue : this.state.value
    };

    return this.setState(ns);
  }

  onVisibleChange(visible: boolean) {
    if (visible) {
      this.onShow();
    } else {
      this.onClose();
    }
  }

  onInput(e: ChangeEvent) {
    this.state.value$.next((e.target as HTMLInputElement).value);
    this.setState({ value: (e.target as HTMLInputElement).value });
  }

  onChange(v: T) {
    if (this.props.onChange) {
      this.props.onChange(v);
    }

    this.setState({ visible: false, value: v[this.props.searchField] });
  }

  render() {
    return (
      <Dropdown
        overlay={(
          <Vlist
            data$={this.dataSource$}
            children={this.props.children}
            searchField={this.props.searchField}
            value={this.state.lastValue}
            onChange={this.onChange}
          />
        )}
        trigger={['click']}
        visible={this.state.visible}
        onVisibleChange={this.onVisibleChange}
      >
        <Input
          placeholder={this.state.placeholder}
          value={this.state.value}
          onChange={this.onInput}
        />
      </Dropdown>
    );
  }
}

