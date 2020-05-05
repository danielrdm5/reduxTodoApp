import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll, limpiarCompletados } from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoInicial: Todo[] = [
  new Todo('Save the world'),
  new Todo('Defeat Thanos'),
  new Todo('Contact Nick Fury'),
  new Todo('Go Shopping with Tony Stark'),
  new Todo('Date Blackwidow')
];

const _todoReducer = createReducer(estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),

  on(toggle, (state, { id }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        };
      } else {
        return todo;
      }
    });
  }),

  on(editar, (state, { id, texto }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto
        };
      } else {
        return todo;
      }
    });
  }),

  on(borrar, (state, { id }) => state.filter(todo => todo.id !== id ) ),

  on(toggleAll, (state, { todosCompletados }) => {
    return state.map(todo => {
        return {
          ...todo,
          completado: todosCompletados
        };

    });
  }),

  on(limpiarCompletados, state => state.filter( todo => !todo.completado ) ),

);


export function todoReducer(state, action) {
  return _todoReducer(state, action);
}


