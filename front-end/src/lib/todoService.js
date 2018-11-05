const baseUrl = 'https://todo-rest-api.firebaseapp.com/api/v1/todos';

export const loadTodos = () => {
  return fetch(baseUrl)
    .then(res => res.json());
};

export const createTodo = (todo) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  }).then(res => res.json);
};

export const saveTodo = (todo) => {
  return fetch(`${baseUrl}/${todo.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  }).then(res => res.json);
};

export const deleteTodo = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
};
