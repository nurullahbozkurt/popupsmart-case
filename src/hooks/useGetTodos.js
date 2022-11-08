import axios from "axios";
import { useQuery } from "react-query";

const useGetTodos = () => {
  const { data, isLoading, refetch } = useQuery(["todos"], async () => {
    const { data } = await axios.get(
      "https://63131b08a8d3f673ffc4641b.mockapi.io/api/todos"
    );
    return data;
  });
  return { data, isLoading, refetch };
};
export default useGetTodos;
