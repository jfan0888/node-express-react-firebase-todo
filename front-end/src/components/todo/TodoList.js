import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from './TodoItem';

export const TodoList = props => {
  const { todos, handleToggle, handleRemove } = props;

  return (
    <div>
      <ul>
        {todos.map(todo => <TodoItem handleToggle={handleToggle} key={todo.id} {...todo} handleRemove={handleRemove} />)}
      </ul>
    </div>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
}
