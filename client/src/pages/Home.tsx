import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Layout from "../layout";
import { IPost } from "../interface";
import { PostItem } from "../components";
import { TokenAtom } from "store";

export default function Home() {
  const navigator = useNavigate();
  const _tokenAtom = useRecoilValue(TokenAtom);

  const [PostsList, setPostsList] = useState<IPost[] | []>([]);
  const [filterVal, setFilterVal] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token") || _tokenAtom;
    if (!token && !_tokenAtom) {
      navigator("/auth");
    }
  }, [_tokenAtom, navigator]);

  useEffect(() => {
    const token = localStorage.getItem("token") || _tokenAtom;

    axios({
      url: "http://127.0.0.1:8000/posts/",
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => setPostsList(r.data))
      .catch((r) => console.log(r));
  }, [_tokenAtom]);

  const FilterHandler = () => {
    const token = localStorage.getItem("token") || _tokenAtom;

    axios({
      url: "http://127.0.0.1:8000/posts/filter",
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        filter: filterVal,
      },
    })
      .then((r) => setPostsList(r.data))
      .catch((r) => console.log(r));
  };

  const FilteredList = (direction: any) => {
    let filtered = PostsList.sort((a: any, b: any) =>
      a.title - b.title ? direction : -1 * direction
    );

    setPostsList([...filtered]);
  };

  return (
    <Layout>
      <div className="flex justify-between">
        <form className="flex">
          <input
            type="text"
            placeholder="Фильтовать по заголовку"
            onChange={(event) => setFilterVal(event.target.value)}
          />
          <p
            onClick={FilterHandler}
            className="relative flex justify-center border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Фильтровать
          </p>
        </form>
      </div>
      <div className="inline-block">
        <p
          onClick={() => FilteredList(1)}
          className="cursor-pointer p-3 border rounded"
        >
          Сортировать по убвыанию
        </p>
        <p
          onClick={() => FilteredList(-1)}
          className="cursor-pointer p-3 border rounded"
        >
          Сортировать по Возрастанию
        </p>
      </div>
      <h2 className="text-center my-8">Все посты</h2>
      <ul>
        {!PostsList && "Постов пока нет"}
        {PostsList &&
          PostsList.map((i, index) => (
            <PostItem {...i} editable={false} key={index} />
          ))}
      </ul>
    </Layout>
  );
}
