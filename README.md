# react-materialui-dynamic-table

> Dynamic table component for ReactJS using Material UI

[![NPM](https://img.shields.io/npm/v/react-materialui-dynamic-table.svg)](https://www.npmjs.com/package/react-materialui-dynamic-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
$ npm install --save react-materialui-dynamic-table
```

## Props (Required)

| Prop Name    | Type                                                             | Description                                                                          | Required |
| ------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------- |
| columns      | `{name: string, type: string}[]`                                 | Array of Columns                                                                     | True     |
| rows         | `any[]`                                                          | Array of Rows. Structure should match array of columns(See example for more details) | True     |
| onRowAdded   | `(e: React.MouseEvent<HTMLButtonElement>, row: any) => any`      | Callback function. Gets executed when a row gets added to table.                     | True     |
| onRowDeleted | `(e: React.MouseEvent<HTMLButtonElement>, index: number) => any` | Callback function. Gets executed when a row gets deleted from the table.             | True     |

## Example

```tsx
import * as React from 'react'
import DynamicTable from 'react-materialui-dynamic-table'

interface Props {}
interface State {
  columns: any[]
  rows: any[]
}
class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      columns: [],
      rows: []
    }
  }

  componentDidMount() {
    const Columns: any[] = [
      {
        name: 'Name',
        type: 'text'
      },
      {
        name: 'Age',
        type: 'number'
      }
    ]
    const rows: any[] = [
      {
        name: 'John Doe',
        age: 12
      },
      {
        name: 'Jane Doe',
        age: 15
      }
    ]

    this.setState({
      rows,
      columns
    })
  }

  onRowAdded = (e: React.MouseEvent<HTMLButtonElement>, row: any): void => {
    this.setState({
      rows: [...this.state.rows, row]
    })
  }

  onRowDeleted = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ): void => {
    let rows: any[] = this.state.rows
    rows.splice(index, 1)
    this.setState({
      rows
    })
  }

  render() {
    return (
      <DynamicTable
        columns={this.state.columns}
        rows={this.state.rows}
        onRowAdded={this.onRowAdded}
        onRowDeleted={this.onRowDeleted}
      />
    )
  }
}
```

## Development
```bash
$ npx concurrently "npm start" "cd example; npm start"
```

## License

MIT © [vxlllc-us](https://github.com/vxlllc-us)
