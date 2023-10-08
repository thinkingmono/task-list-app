import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authFetch from "./custom";
import { toast } from "react-toastify";

export const useFetchTask = () => {
    /*useQuery Hook declaration*/
    const { isLoading, data, error } = useQuery({
        queryKey: ['tasks'],
        // queryFn: async () => authFetch.get('/') /*Complete data response*/
        queryFn: async () => {
            const { data } = await authFetch.get('/'); /*Response destructure to return just data, not data.data*/
            // console.log(data);
            return data;
        }
    })
    return { isLoading, data, error };
}

export const useEditTask = () => {
    const queryClient = useQueryClient();
    /*Mutation creation to edit task isDone attribute. Sends patch request with new isDone value using task id as an identifier.*/
    const { mutate: editTask } = useMutation({
        /*taskId and isDone destructure from call in checkbox input*/
        mutationFn: ({ taskId, isDone }) => {
            return authFetch.patch(`/${taskId}`, { isDone })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });
    return { editTask };
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    /*Mutation creation to delete task. Sends delete request with task id capture from delete button.*/
    const { mutate: deleteTask, isLoading: isLoadingDelete } = useMutation({
        mutationFn: (taskId) => authFetch.delete(`/${taskId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task removed')
        },
        onError: (error) => toast.error('Task could not be remove: ' + error.response.data.msg)
    });
    return { deleteTask, isLoadingDelete }
}

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    /*Mutation creation to create task that it's going to pass the input content to POST request to the server*/
    const { mutate: createTask, isLoadingCreate } = useMutation({
        mutationFn: (taskTitle) => authFetch.post('/', { title: taskTitle }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task added');
        },
        onError: (error) => {
            toast.error(error.response.data.msg);
        }
    })
    return { createTask, isLoadingCreate };
}