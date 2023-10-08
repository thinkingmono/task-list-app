import SingleItem from './SingleItem';
import { useFetchTask } from './utils/reactQueryCustomHooks';

const Items = () => {
  const { isLoading, error, data } = useFetchTask();

  if (isLoading) {
    return <p style={{ marginTop: '1rem' }}>Loading...</p>
  }

  if (error) {
    return <p style={{ marginTop: '1rem' }}>{error.response.data}</p>
  }

  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
