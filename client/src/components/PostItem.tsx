import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { TokenAtom } from "store";
import { IPostEditable } from "../interface";
import { DeletPost, EditPost } from "./";

export default function PostItem({
  created_at,
  description,
  id,
  title,
  user_id,
  editable,
}: IPostEditable) {
  const [username, setUsername] = useState("");
  const _tokenAtom = useRecoilValue(TokenAtom);

  useEffect(() => {
    const token = localStorage.getItem("token") || _tokenAtom;

    axios({
      url: `http://127.0.0.1:8000/users/${user_id}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => setUsername(r.data.username))
      .catch((r) => console.log(r));
  }, [_tokenAtom, user_id]);

  return (
    <li>
      <div className="flex shadow-lg rounded-lg mx-4 md:mx-auto max-w-md relative">
        <div className="flex items-start px-4 py-6">
          <div className="">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                {username}
              </h2>
            </div>
            <p className="text-gray-700 text-xs">
              {new Date(created_at).toLocaleString("ru").replace(",", "")}
            </p>
            <p className="mt-3 text-gray-700 text-sm">{title}</p>
            <p className="text-gray-700 text-sm">{description}</p>
          </div>
        </div>
        {editable && (
          <div className="absolute top-1 right-1 flex">
            <EditPost title={title} description={description} id={id} />
            <DeletPost id={id} />
          </div>
        )}
      </div>
    </li>
  );
}
