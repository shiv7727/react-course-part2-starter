import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CACHE_KEY_TODOS } from '../constants';
import todoService, { Todo } from '../services/todoService';

interface AddTodoContext {
	previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
	const queryClient = useQueryClient();
	return useMutation<Todo, Error, Todo, AddTodoContext>({
		mutationFn: todoService.post,

		onMutate: (newTodo: Todo) => {
			const previousTodos =
				queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];

			queryClient.setQueriesData<Todo[]>(CACHE_KEY_TODOS, (todos) => {
				if (todos) {
					return [newTodo, ...todos];
				}
			});
			onAdd();
			return { previousTodos };
		},

		onSuccess: (savedTodo, newTodo) => {
			queryClient.setQueriesData<Todo[]>(CACHE_KEY_TODOS, (todos) => {
				return todos?.map((todo) => (todo === newTodo ? savedTodo : todo));
			});
			// APPROACH : 1 Invalidating the CACHE
			// queryClient.invalidateQueries(({
			//   queryKey: CACHE_KEY_TODOS
			// }));

			// APPROACH : 2 updating the data in the cache
			// queryClient.setQueriesData<Todo[]>(CACHE_KEY_TODOS,(oldData) => {
			//   if(oldData) {
			//     return [savedTodo,...oldData];
			//   }
			// });
			// if(ref.current) ref.current.value = "";
		},

		onError: (error, newTodo, context) => {
			queryClient.setQueriesData<Todo[]>(
				CACHE_KEY_TODOS,
				context?.previousTodos,
			);
		},
	});
};

export default useAddTodo;
