import { Dropdown, Input } from 'antd';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { fromEvent } from 'rxjs';
import { Vlist } from './Vlist';

interface IVSelectProps {
  placeholder?: string;
  value?: string;
  onChange?: Function;
}

interface IVSelectState {
  visible: boolean;
  placeholder: string | undefined;
  value: any | undefined;
  originValue: any | undefined;
  originPlaceholder: any | undefined;
  lastValue: any | undefined;
}

export class VSelect extends React.Component<IVSelectProps, IVSelectState> {
  state = {
    visible: false,
    placeholder: undefined,
    value: undefined,

    originValue: undefined,
    originPlaceholder: undefined,
    lastValue: undefined
  };

  constructor(props: any) {
    super(props);

    this.onShow = this.onShow.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  // 为了对比是否外界传入的参数变化，如果变化则改变内在的状态，外部优先
  static getDerivedStateFromProps(props: IVSelectProps, state: IVSelectState) {
    const ns = {} as IVSelectState;

    if (props.placeholder !== state.originPlaceholder) {
      ns.placeholder = props.placeholder;
      ns.originPlaceholder = props.placeholder;
    }

    if (props.value !== state.originValue) {
      ns.value = props.value;
      ns.originValue = props.value;
    }

    return Object.keys(ns).length ? ns : null;
  }

  componentDidMount(): void {
    fromEvent(document.body, 'click').subscribe(e => {
      const clsList = Array.from((e.target as HTMLElement).classList);

      // click elements except dropdown panel
      if (!clsList.includes('ant-dropdown') && this.state.visible) {
        this.setState({ visible: false });
      }
    });
  }

  onShow() {
    const lastValue = this.state.value;
    const placeholder = lastValue === undefined ? this.state.placeholder : lastValue;
    const value = undefined;

    this.setState({ visible: true, placeholder, value, lastValue });
  }

  onClose(visible: boolean) {
    if (!visible) {
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
  }

  onInput(e: ChangeEvent) {
    this.setState({ value: (e.target as HTMLInputElement).value });
  }

  render() {
    return (
      <Dropdown overlay={<Vlist/>} trigger={['click']} visible={this.state.visible} onVisibleChange={this.onClose}>
        <Input
          placeholder={this.state.placeholder}
          value={this.state.value}
          onChange={this.onInput}
          onClick={this.onShow}/>
      </Dropdown>
    );
  }
}

