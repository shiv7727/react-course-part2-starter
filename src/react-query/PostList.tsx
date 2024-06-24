import React,{useState} from "react";
import usePosts from './hooks/usePosts';



const PostList = () => {
  const [userId,setUserId] = useState<number>();
  const {data,error,isLoading} = usePosts(userId);


  if(isLoading) return <p>Loading ...</p>;

  if(error) return <p>{error.message}</p>;

  return (
    <>
      <select className="form-select mb-3"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUserId(parseInt(e.target.value))}
        value={userId}
      >
        <option value=""></option>
        <option value="1">user 1</option>
        <option value="2">user 2</option>
        <option value="3">user 3</option>
      </select>
      <ul className="list-group">
        {data?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
