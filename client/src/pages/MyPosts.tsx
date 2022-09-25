import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Layout from "../layout";
import { IPost } from "../interface";
import { PostItem } from "../components";
import { TokenAtom } from "store";

export default function MyPosts() {
  const navigator = useNavigate();
  const _tokenAtom = useRecoilValue(TokenAtom);

  const [PostsList, setPostsList] = useState<IPost[] | []>([]);

  useEffect(() => {
    const token = localStorage.getItem("token") || _tokenAtom;
    if (!token && !_tokenAtom) {
      navigator("/auth");
    }
  }, [_tokenAtom, navigator]);

  useEffect(() => {
    const token = localStorage.getItem("token") || _tokenAtom;

    axios({
      url: "http://127.0.0.1:8000/posts/my",
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => setPostsList(r.data))
      .catch((r) => console.log(r));
  }, [_tokenAtom]);

  return (
    <Layout>
      <h2 className="text-center my-8">Все посты </h2>
      <ul>
        {!PostsList && "Постов пока нет"}
        {PostsList &&
          PostsList.map((i, index) => (
            <PostItem {...i} editable={true} key={index} />
          ))}
      </ul>
    </Layout>
  );
}
