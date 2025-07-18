import { useQuery } from "@tanstack/react-query";
import fetchPrefectures from "@/libs/prefectureAPI";

const usePrefectures = () => {
  return useQuery({
    queryKey: ["prefectures"],
    queryFn: fetchPrefectures,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};


export default usePrefectures;