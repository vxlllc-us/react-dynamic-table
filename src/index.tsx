import * as React from 'react'
import {
  Typography,
  IconButton,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TextField,
  Button,
  WithStyles,
  withStyles,
  TableFooter
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = () => ({
  tableHead: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#000'
  },
  tableFooter: {
    border: '1px solid grey'
  },
  buttonContainer: {
    width: '100%',
    background: 'gree',
    minWidth: '250px',
    justifyContent: 'flex-end'
  }
})

type Props = {
  title: string
  columns: any[]
  rows: any[]
  onRowAdded: (e: React.MouseEvent<HTMLButtonElement>, row: any) => any
  onRowDeleted: (e: React.MouseEvent<HTMLButtonElement>, index: number) => any
} & WithStyles<typeof styles>
interface State {
  loading: boolean
  rows: any[]
  form: {
    [key: string]: any
  }
}
class DynamicTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      loading: false,
      rows: [],
      form: {}
    }
  }

  componentDidMount() {
    this.setState({
      rows: this.props.rows
    })
  }

  onRowDeleted = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ): void => {
    e.preventDefault()

    let rows: any[] = this.state.rows
    rows.splice(index, 1)
    this.setState({
      rows
    })

    this.props.onRowDeleted(e, index)
  }

  onRowAdded = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    const row: any = this.state.form
    this.setState({
      rows: [...this.state.rows, row]
    })

    this.props.onRowAdded(e, row)
  }

  onInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('key: ', e.target.name)
    console.log('value: ', e.target.value)
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant={'h5'} gutterBottom>
          {this.props.title}
        </Typography>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={this.props.classes.tableHead}>
                  S No.
                </TableCell>
                {this.props.columns.map((column: any) => (
                  <TableCell className={this.props.classes.tableHead}>
                    {column.name}
                  </TableCell>
                ))}
                <TableCell className={this.props.classes.tableHead}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.rows.map((row: any, index: number) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  {this.props.columns.map((column: any) => {
                    const key: string = column.name
                      .toLowerCase()
                      .replace(/ /g, '_')
                    return <TableCell>{row[key]}</TableCell>
                  })}
                  <TableCell>
                    <IconButton
                      color={'secondary'}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        this.onRowDeleted(e, index)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell />
                {this.props.columns.map((column: any) => (
                  <TableCell>
                    <TextField
                      label={column.name}
                      fullWidth
                      InputLabelProps={
                        column.type === 'date'
                          ? {
                              shrink: true
                            }
                          : {}
                      }
                      variant={'outlined'}
                      margin={'dense'}
                      size={'small'}
                      type={column.type || 'text'}
                      name={column.name.toLowerCase().replace(/ /g, '_')}
                      onChange={this.onInput}
                      placeholder={column.name}
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    fullWidth
                    variant={'contained'}
                    color={'primary'}
                    onClick={this.onRowAdded}
                  >
                    Submit
                  </Button>
                </TableCell>
                {/*
<TableCell
                  className={this.props.classes.tableFooter}
                  colSpan={this.props.columns.length}
                >
                  <form noValidate autoComplete={'off'}>
                    <Grid container spacing={2}>
                      {this.props.columns.map((column: any) => (
                        <Grid item xs={4}>
                          <TextField
                            label={column.name}
                            fullWidth
                            InputLabelProps={{
                              shrink: column.type === 'date'
                            }}
                            variant={'outlined'}
                            margin={'dense'}
                            size={'small'}
                            type={column.type || 'text'}
                            name={column.name.toLowerCase().replace(/ /g, '_')}
                            onChange={this.onInput}
                            placeholder={column.name}
                          />
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <ButtonGroup
                          className={this.props.classes.buttonContainer}
                        >
                          <Button color={'secondary'}>Reset</Button>
                          <Button color={'primary'} onClick={this.onRowAdded}>
                            Submit
                          </Button>
                        </ButtonGroup>
                      </Grid>
                    </Grid>
                  </form>
                </TableCell>
                */}
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(DynamicTable)
