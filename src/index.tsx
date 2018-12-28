import { Dropdown, Icon, Input } from 'antd';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { Subject, Subscription } from 'rxjs';
import style from './styles.css';

interface IVSelectProps<T> {
  placeholder?: string;
  value?: string | number | undefined;
  onChange?: Function;
  dataSource: T[];
  // use to identify which property should be used as value
  keyProp: keyof T;
}

interface IVSelectState<T> {
  value: string | number | undefined;
  isEdit: boolean;
  visible: boolean;
  changingValue: string | undefined;
  dataSource: T[] | undefined;
}

export class VSelect<T> extends React.Component<IVSelectProps<T>, IVSelectState<T>> {
  state = {
    value: undefined,
    isEdit: false,
    visible: false,
    changingValue: undefined,
    dataSource: undefined
  };

  private _sub: Subscription[] = [];
  private inputRef = React.createRef<Input>();
  private changingValue$ = new Subject<string>();

  constructor(props: any) {
    super(props);

    this.onVisibleChange = this.onVisibleChange.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  static getDerivedStateFromProps<T>(props: IVSelectProps<T>, state: IVSelectState<T>) {
    const newState = {} as IVSelectState<T>;

    if (props.value !== state.value) {
      newState.value = props.value;
    }

    if (props.dataSource !== state.dataSource) {
      newState.dataSource = state.dataSource;
    }

    return newState;
  }

  componentDidMount(): void {
    this._sub.push(
      this.changingValue$.subscribe(v => this.setState({ changingValue: v }))
    );
  }

  componentWillUnmount(): void {
    this._sub.forEach(s => s.unsubscribe());
  }

  render() {
    const isShowPlaceholder = this.state.value || this.state.changingValue ? 'none' : 'block';
    const isShowValuePlaceholder = this.state.value && !this.state.changingValue ? 'block' : 'none';
    const isShowInput = this.state.isEdit ? 'block' : 'none';

    return (
      <Dropdown
        overlay={<div>Dropdown</div>}
        // prevent default behavior
        trigger={[]}
        // @ts-ignore
        showAction={['click']}
        hideAction={['blur']}
        onVisibleChange={this.onVisibleChange}
      >
        <div>
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

            <span className="ant-select-arrow">
              <Icon type="down"/>
           </span>
          </div>
        </div>
      </Dropdown>
    );
  }

  private onVisibleChange(visible: boolean) {
    if (visible) {
      const ref = this.inputRef.current;
      if (ref) {
        setTimeout(() => ref.focus());
      }
      this.setState({ isEdit: true });
    } else {
      this.setState({ isEdit: false, changingValue: undefined });
    }

    this.setState({ visible });
  }

  private onInput(e: ChangeEvent) {
    this.changingValue$.next((e.target as any).value);
  }
}
