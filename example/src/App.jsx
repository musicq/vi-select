import { Button } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { VSelect } from 'v-select';
import data from './data.json';

export default class App extends Component {
  state = {
    placeholder: '搜索框',
    value: '00101742'
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
          </Button.Group>
        </div>

        <VSelect
          placeholder={this.state.placeholder}
          value={this.state.value}
          dataSource={data}
          keyProp="dealer_id"
          style={{ width: 300 }}
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
      </div>
    );
  }
}
