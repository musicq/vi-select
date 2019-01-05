import { Button } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { VSelect } from 'v-select';
import data from './data.json';

const array = new Array(100).fill(0).map((_, i) => i);

export default class App extends Component {
  state = {
    placeholder: '搜索框',
    value: '02555346',
    disabled: false
  };

  onChange = e => {
    console.log('You selected', e);
    this.setState({ value: e });
  };

  render() {
    return (
      <div style={{ width: 500, margin: '200px auto' }}>
        <div style={{ marginBottom: 20 }}>
          <Button.Group>
            <Button onClick={() => this.setState({ placeholder: 'placeholder: ' + Math.random().toString(36) })}>
              Change Placeholder
            </Button>
            <Button onClick={() => this.setState({ value: 'value: ' + Math.random().toString(36) })}>
              Change Value
            </Button>
            <Button onClick={() => this.setState({ value: undefined })}>Clear</Button>
            <Button onClick={() => this.setState({ disabled: !this.state.disabled })}>Toggle Disabled</Button>
          </Button.Group>
        </div>

        <VSelect
          placeholder={this.state.placeholder}
          value={this.state.value}
          dataSource={data}
          keyProp="dealer_id"
          displayProp="dealer_product_name"
          onChange={this.onChange}
          itemHeight={90}
          style={{ width: 300 }}
          allowClear={true}
          disabled={this.state.disabled}
        >
          {item => (
            <div>
              <div>{item.created_type}</div>
              <div>{item.dealer_id}</div>
              <div>{item.dealer_product_name}</div>
              <div>{item.signed}</div>
            </div>
          )}
        </VSelect>

        <VSelect
          dataSource={array}
          onChange={this.onChange}
          style={{ width: 300, marginTop: 20 }}
          disabled={this.state.disabled}
          value={this.state.value}
        >
          {item => <p>{item}</p>}
        </VSelect>
      </div>
    );
  }
}
