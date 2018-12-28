import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { VSelect } from 'v-select';
import data from './data.json';

export default class App extends Component {
  state = {
    placeholder: '搜索框',
    value: '屈阁华刚'
  };

  render() {
    return (
      <div style={{ width: 300, margin: '200px auto' }}>
        <div style={{ marginBottom: 20 }}>
          <button onClick={() => this.setState({ placeholder: 'placeholder: ' + Math.random().toString(36) })}>Change
            Placeholder
          </button>
          <button onClick={() => this.setState({ value: 'value: ' + Math.random().toString(36) })}>Change Value</button>
        </div>

        <VSelect
          placeholder={this.state.placeholder}
          value={this.state.value}
          dataSource={data}
          searchField="dealer_product_name"
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
