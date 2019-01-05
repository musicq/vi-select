# v-select

> select component using virtual list - antd special

[![NPM](https://img.shields.io/npm/v/v-select.svg)](https://www.npmjs.com/package/v-select) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save v-select
```

## Usage

```tsx
import * as React from 'react'
import { VSelect } from 'v-select'

const array = new Array(100).fill(0).map((_, i) => i);

class Example extends React.Component {
  state = {
    value: '02555346',
  };

  onChange = e => {
    console.log('You selected', e);
    this.setState({ value: e });
  };
  
  render () {
    return (
        <VSelect
          dataSource={array}
          onChange={this.onChange}
          style={{ width: 300, marginTop: 20 }}
          value={this.state.value}
        >
          {item => <p>{item}</p>}
        </VSelect>
    )
  }
}
```

## License

MIT © [musicq](https://github.com/musicq)
