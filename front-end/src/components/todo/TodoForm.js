import React from 'react';
import PropTypes from 'prop-types';

export const TodoForm = props => {
  const { handleSubmit, handleInputChange, currentTodo } = props;

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="TodoInput"
        type="text"
        value={currentTodo}
        onChange={handleInputChange}
      />
    </form>
  )
}

TodoForm.propTypes = {
  currentTodo: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}
