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
  value: string | undefined;
  originValue: string | undefined;
  originPlaceholder: string | undefined;
}

export class VSelect extends React.Component<IVSelectProps, IVSelectState> {
  state = {
    visible: false,
    placeholder: undefined,
    value: undefined,

    originValue: undefined,
    originPlaceholder: undefined
  };

  constructor(props: any) {
    super(props);

    this.onShow = this.onShow.bind(this);
    this.onInput = this.onInput.bind(this);
  }

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
    fromEvent(document.body, 'click').subscribe(() => {
      if (this.state.visible) {
        this.setState({ visible: false });
      }
    });
  }

  onShow() {
    this.setState({ visible: true });
  }

  onInput(e: ChangeEvent) {
    this.setState({ value: (e.target as HTMLInputElement).value });
  }

  render() {
    return (
      <Dropdown overlay={<Vlist/>} visible={this.state.visible}>
        <Input
          placeholder={this.state.placeholder}
          value={this.state.value}
          onChange={this.onInput}
          onClick={this.onShow}/>
      </Dropdown>
    );
  }
}

