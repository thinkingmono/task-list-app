import { useState } from 'react';
import { useCreateTask } from './utils/reactQueryCustomHooks';

const Form = () => {
  const [newItemName, setNewItemName] = useState('');
  const {createTask, isLoadingCreate} = useCreateTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(newItemName, {onSuccess: () => {
      setNewItemName('');
    }}); /*Call to mutation an pass input content*/
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className='form-control'>
        <input
          type='text '
          className='form-input'
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type='submit' className='btn' disabled={isLoadingCreate}>
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
