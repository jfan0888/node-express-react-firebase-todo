export const addTodo = (list, item) => {
  return list.concat(item);
};

// one liner functions:
// export const addTodo = (list, item) => list.concat(item)
// export const addTodo = (list, item) => [...list, item]

export const findById = (id, list) => {
  return list.find(item => item.id === id);
};

export const toggleTodo = todo => ({...todo, status: !todo.status })

export const updateTodo = (list, updated) => {
  const updatedIndex = list.findIndex(item => item.id === updated.id)
  return [
    ...list.slice(0, updatedIndex),
    updated,
    ...list.slice(updatedIndex + 1)
  ]
}

export const removeTodo = (list, id) => {
  const removeIndex = list.findIndex(item => item.id === id);
  return  [
    ...list.slice(0, removeIndex),
    ...list.slice(removeIndex + 1)
  ]
}

export const filterTodos = (list, route) => {
  switch(route) {
    case '/active':
      return list.filter(item => !item.status)
    case '/complete':
      return list.filter(item => item.status)
    default:
      return list
  }
}
