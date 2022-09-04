import axios from "axios";
import { useQuery } from "react-query";

const useGetTodos = () => {
  const { data, isLoading, refetch } = useQuery(["todos"], async () => {
    const { data } = await axios.get(
      "https://63132301b466aa9b03939063.mockapi.io/api/todos"
    );
    return data;
  });
  return { data, isLoading, refetch };
};
export default useGetTodos;
