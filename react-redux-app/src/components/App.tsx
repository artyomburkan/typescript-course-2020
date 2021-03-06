import React from "react"
import { connect } from "react-redux"
import { Todo, fetchTodos, deleteTodo } from "../actions"
import { StoreState } from "../reducers"
import { todosReducer } from "../reducers/todos"

interface AppProps {
  todos: Todo[]
  fetchTodos: Function
  deleteTodo: Function
}

interface AppState {
  fetching: boolean
}

class App extends React.Component<AppProps, AppState> {
  state = {
    fetching: false,
  }

  componentDidUpdate(prevProps: AppProps) {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false })
    }
  }

  onButtonClick = () => {
    this.props.fetchTodos()
    this.setState({ fetching: true })
  }

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id)
  }

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
          {todo.title}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch</button>
        {this.state.fetching ? "LOADING" : null}
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return {
    todos,
  }
}

export const AppConnected = connect(mapStateToProps, {
  fetchTodos,
  deleteTodo,
})(App)
