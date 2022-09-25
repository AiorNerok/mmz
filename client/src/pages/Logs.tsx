import { useEffect, useState } from "react";

import { ILogs } from "interface";

import Layout from "layout";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { TokenAtom } from "store";
import axios from "axios";

export default function Logs() {
  const [authorsList, setAuthorsList] = useState<ILogs[] | []>([]);
  const HeaderTable: string[] = [
    "id",
    "user_id",
    "methods",
    "username",
    "description",
    "time",
  ];

  const navigator = useNavigate();
  const _tokenAtom = useRecoilValue(TokenAtom);

  useEffect(() => {
    const token = localStorage.getItem("token") || _tokenAtom;
    if (!token && !_tokenAtom) {
      navigator("/auth");
    }
  }, [_tokenAtom, navigator]);

  useEffect(() => {
    const token = localStorage.getItem("token") || _tokenAtom;

    axios({
      url: "http://127.0.0.1:8000/logs/",
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => setAuthorsList(r.data))
      .catch((r) => console.log(r));
  }, [_tokenAtom]);

  return (
    <Layout>
      <div className="flex flex-col max-w-3xl mx-auto">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    {HeaderTable.map((i) => {
                      return (
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          {i.toUpperCase()}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {authorsList.map(
                    ({
                      id,
                      username,
                      methods,
                      user_id,
                      description,
                      time,
                    }: ILogs) => {
                      return (
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {id}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {username}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {methods}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {user_id}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {description}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {new Date(time)
                              .toLocaleString("ru")
                              .replace(",", "")}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
