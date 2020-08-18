import * as React from 'react'
import DynamicTable from 'react-dynamic-table'

const columns: any[] = [
  {
    name: 'From',
    type: 'date'
  },
  {
    name: 'End Date',
    type: 'date'
  },
  {
    name: 'Asset Operator',
    type: 'text'
  }
]
const rows: any[] = []

type Props = any
type State = {
  loading: boolean
  rows: any[]
  columns: string[]
}
export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      loading: false,
      rows: [],
      columns: []
    }
  }

  componentDidMount() {
    this.setState({
      rows,
      columns
    })
  }

  onRowAdded = (e: React.MouseEvent<HTMLButtonElement>, row: any): any => {
    e.preventDefault()

    this.setState({
      rows: [...this.state.rows, row]
    })
  }

  render() {
    return (
      <div style={{ width: '75vw', border: 'solid 1px #000', padding: '1rem' }}>
        <DynamicTable
          columns={this.state.columns}
          rows={this.state.rows}
          onRowAdded={this.onRowAdded}
          title={'Operation History'}
        />
      </div>
    )
  }
}
