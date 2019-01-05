import { Dropdown, Icon, Input } from 'antd';
import * as React from 'react';
import { ChangeEvent, MouseEvent } from 'react';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import style from './styles.css';
import { Vlist } from './Vlist';

interface IVSelectProps<T> {
  placeholder?: string;
  value?: string | number | undefined;
  onChange?: Function;
  dataSource: T[];
  // use to identify which property should be used as value
  keyProp: keyof T;
  // which field to show in the input box
  displayProp: keyof T;
  style?: any;
  className?: string;
  // for vist, default is 32px
  itemHeight?: number;
  allowClear?: boolean;
  disabled?: boolean;
}

interface IVSelectState<T> {
  // display value
  value: string | number | undefined;
  isEdit: boolean;
  visible: boolean;
  changingValue: string | undefined;
  dataSource: T[] | undefined;
  dataSource$: BehaviorSubject<T[]>;
  inputValue: string | number | undefined;
  // real value
  realValue: string | number | undefined;
  index: number;
}

export class VSelect<T> extends React.Component<IVSelectProps<T>, IVSelectState<T>> {
  state = {
    value: undefined,
    isEdit: false,
    visible: false,
    changingValue: undefined,
    dataSource: undefined,
    dataSource$: new BehaviorSubject<T[]>([]),
    inputValue: undefined,
    realValue: undefined,
    index: 0
  };

  private _sub: Subscription[] = [];
  private inputRef = React.createRef<Input>();
  private changingValue$ = new BehaviorSubject<string>('');
  private data$: Observable<T[]>;

  constructor(props: any) {
    super(props);

    this.onVisibleChange = this.onVisibleChange.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearValue = this.clearValue.bind(this);
  }

  static getDerivedStateFromProps<T>(props: IVSelectProps<T>, state: IVSelectState<T>) {
    const newState = {} as IVSelectState<T>;

    // if props value has change, then change the state value
    if (props.value !== state.inputValue) {
      state.inputValue = props.value;
      state.realValue = props.value;

      // if cannot get the value, use the given value
      const [v, index] = VSelect.transValue<T>(props.value, props.dataSource, props.keyProp, props.displayProp);
      state.value = v || props.value;
      state.index = index;
    }

    if (props.dataSource !== state.dataSource) {
      newState.dataSource = props.dataSource;
      state.dataSource$.next(props.dataSource);
    }

    return newState;
  }

  // transform value
  private static transValue<T>(
    value: string | number | undefined,
    dataSource: T[],
    keyProp: keyof T,
    displayProp: keyof T
  ): [string | number | undefined, number] {
    let index = 0;
    let item = undefined;

    dataSource.forEach((source, i) => {
      const x = keyProp ? source[keyProp] : source;
      if (x as any === value) {
        item = source;
        index = i;
        return;
      }
    });

    if (item === undefined) {
      return [item, index];
    }

    return [(displayProp ? (item as T)[displayProp] : item) as any, index];
  }

  componentDidMount(): void {
    this._sub.push(
      this.changingValue$.subscribe(v => this.setState({ changingValue: v }))
    );

    this.data$ = combineLatest(
      this.state.dataSource$,
      this.changingValue$.pipe(distinctUntilChanged())
    ).pipe(
      map(([dataSource, changingValue]) => changingValue ? dataSource.filter(source => {
        const item = this.props.displayProp ? source[this.props.displayProp] : source;
        return item.toString().toLowerCase().includes(changingValue.toString().toLowerCase());
      }) : dataSource)
    );
  }

  componentWillUnmount(): void {
    this._sub.forEach(s => s.unsubscribe());
  }

  render() {
    const isShowPlaceholder = this.state.value !== undefined || this.state.changingValue ? 'none' : 'block';
    const isShowValuePlaceholder = this.state.value !== undefined && !this.state.changingValue ? 'block' : 'none';
    const isShowInput = this.state.isEdit ? 'block' : 'none';
    const isShowClearBtn = this.props.allowClear && this.state.value;

    const cls = [
      this.props.className,
      'ant-select',
      this.props.disabled ? 'ant-select-disabled' : 'ant-select-enabled',
      this.props.allowClear ? 'ant-select-allow-clear' : '',
      this.state.visible ? 'ant-select-open ant-select-focused' : '',
      this.state.visible ? style.VSelectOpen : ''
    ].join(' ');

    const showAction = this.props.disabled ? [] : ['click'];

    return (
      <Dropdown
        overlay={
          <Vlist
            data$={this.data$}
            children={this.props.children}
            keyProp={this.props.keyProp}
            value={this.state.realValue}
            itemHeight={this.props.itemHeight}
            index={this.state.index}
            onChange={this.onChange}
          />
        }
        // prevent default behavior
        trigger={[]}
        // @ts-ignore
        showAction={showAction}
        hideAction={['blur']}
        visible={this.state.visible}
        onVisibleChange={this.onVisibleChange}
      >
        <div style={this.props.style} className={cls}>
          <div className="ant-select-selection ant-select-selection--single">
            <div className="ant-select-selection__rendered">
              {/* placeholder */}
              <div className="ant-select-selection__placeholder"
                   style={{ display: isShowPlaceholder }}>
                {this.props.placeholder}
              </div>

              {/* value placeholder */}
              <div className="ant-select-selection-selected-value"
                   style={{ display: isShowValuePlaceholder, opacity: this.state.isEdit ? 0.4 : 1 }}>
                {this.state.value}
              </div>

              {/* input placeholder */}
              <div className="ant-select-search ant-select-search--inline" style={{ display: isShowInput }}>
                <div className="ant-select-search__field__wrap">
                  <Input
                    ref={this.inputRef}
                    className={['ant-select-search__field', style.VSelectInput].join(' ')}
                    value={this.state.changingValue}
                    onChange={this.onInput}
                  />
                </div>
              </div>
            </div>

            {isShowClearBtn && (
              <span className="ant-select-selection__clear" onClick={this.clearValue}>
                <Icon type="close-circle" theme="filled" className="ant-select-clear-icon"/>
              </span>
            )}
            <span className={['ant-select-arrow', style.VSelectArrow].join(' ')}>
              <Icon type="down"/>
            </span>
          </div>
        </div>
      </Dropdown>
    );
  }

  private onVisibleChange(visible: boolean) {
    if (visible === this.state.visible) {
      return;
    }

    if (visible) {
      const ref = this.inputRef.current;
      if (ref) {
        setTimeout(() => ref.focus());
      }
      this.setState({ isEdit: true });
    } else {
      // clear temp value
      this.changingValue$.next('');
      this.setState({ isEdit: false });
    }

    this.setState({ visible });
  }

  private onInput(e: ChangeEvent) {
    this.changingValue$.next((e.target as any).value);
  }

  private onChange(v: T) {
    // use to output
    const output: any = this.props.keyProp ? v[this.props.keyProp] : v;
    // use to display
    const value: any = this.props.displayProp ? v[this.props.displayProp] : v;

    if (this.props.onChange) {
      this.props.onChange(output);
    }

    setTimeout(() => this.onVisibleChange(false));

    this.setState({ value, realValue: output });
    this.changingValue$.next('');
  }

  private clearValue(e: MouseEvent) {
    // stop popup
    e.stopPropagation();

    this.setState({ value: undefined });

    if (this.props.onChange) {
      this.props.onChange(undefined);
    }
  }
}
