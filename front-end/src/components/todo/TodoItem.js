import React from 'react';
import PropTypes from 'prop-types';

import { partial } from '../../lib/utils';

export const TodoItem = props => {
  const { handleToggle, handleRemove, id, title, status } = props;
  const realHandleToggle = partial(handleToggle, id);
  const realHandleRemove = partial(handleRemove, id);

  return (
    <li>
      <input type="checkbox" onChange={realHandleToggle} checked={status}/>{title}
      <span onClick={realHandleRemove}>{`  X`}</span>
    </li>
  )
}

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.bool,
};

TodoItem.defaultProps = {
  status: false,
};
