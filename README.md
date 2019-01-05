# v-select

> select component using virtual list - antd special

[![NPM](https://img.shields.io/npm/v/v-select.svg)](https://www.npmjs.com/package/v-select)

## Install

```bash
npm install --save v-select
```

## Usage

```javascript
import React from 'react'
import { VSelect } from 'v-select'

const array = new Array(100).fill(0).map((_, i) => i);

class App extends React.Component {
  state = {
    value: '02555346',
  };

  onChange = e => {
    console.log('You selected', e);
    this.setState({ value: e });
  };

  render() {
    return (
      <VSelect
        dataSource={array}
        onChange={this.onChange}
        style={{ width: 300, marginTop: 20 }}
        value={this.state.value}
      >
        {item => <p>{item}</p>}
      </VSelect>
    );
  }
}
```

## Props

| Property      | Type               | Description                                             |
| ------------- | ------------------ | ------------------------------------------------------- |
| `dataSource`  | `any[]`            | Data source of the select list.                         |
| `placeholder` | `string`?          | Placeholder of select input.                            |
| `value`       | `string \| number`? | Value of select.                                        |
| `onChange`    | `(v?: T) => void`? | Call after select changed.                              |
| `keyProp`     | `any`?             | Use to identify which property should be used as value. |
| `displayProp` | `any`?             | Which property should be used to show in the input box. |
| `style`       | `any`?             | Style of select container.                              |
| `className`   | `string`?          | Class of select container.                              |
| `itemHeight`  | `number`?          | Height of each list item, default is `32px`.            |
| `allowClear`  | `boolean`?         | Switch for the clear btn.                               |
| `disabled`    | `boolean`?         | Disabled select.                                        |

## License

MIT © [musicq](https://github.com/musicq)
