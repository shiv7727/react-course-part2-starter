import React,{useRef} from 'react';
import useAddTodo from './hooks/useAddTodo';


const TodoForm = () => {


  const ref = useRef<HTMLInputElement>(null);
  const addTodo = useAddTodo(() => {
    if(ref.current) ref.current.value = "";

  });
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
          <button className="btn btn-primary" >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
