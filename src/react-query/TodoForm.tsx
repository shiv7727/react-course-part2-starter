import {useMutation,useQueryClient} from '@tanstack/react-query';
import React,{useRef} from 'react';
import {Todo} from './hooks/useTodos';
import axios from 'axios';

const TodoForm = () => {
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo,Error,Todo>({
    mutationFn: (todo: Todo) => axios.post<Todo>('https://jsonplaceholder.typicode.com/todos',todo).then(res => res.data),
    onSuccess: (savedTodo,newTodo) => {
      // APPROACH : 1 Invalidating the CACHE
      // queryClient.invalidateQueries(({
      //   queryKey: ['todos']
      // }));

      // APPROACH : 2 updating the data in the cache
      queryClient.setQueriesData<Todo[]>(['todos'],(oldData) => {
        if(oldData) {
          return [savedTodo,...oldData];
        }
      });

    }
  });

  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(ref?.current?.value) {
      addTodo.mutate({
        id: 0,
        title: ref.current.value,
        completed: false,
        userId: 1,
      });
    }
  };

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">
          {addTodo.error.message}
        </div>
      )}
      <form className="row mb-3" onSubmit={handleSubmit} >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
