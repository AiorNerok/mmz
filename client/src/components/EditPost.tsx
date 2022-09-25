import { Dialog, Transition } from "@headlessui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { TEditPost } from "interface";
import { Fragment, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { TokenAtom } from "store";

export default function EditPost({ description, title, id }: TEditPost) {
  let [isOpen, setIsOpen] = useState(false);

  let [title_local, setTitle] = useState(title);
  let [description_local, setDescription] = useState(description);

  const atomToken = useRecoilValue(TokenAtom);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {}, []);

  const EditPostHandler = () => {
    const token = localStorage.getItem("token") || atomToken;

    axios({
      url: `http://127.0.0.1:8000/posts/`,
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id,
      },
      data: {
        title: title_local,
        description: description_local,
      },
    })
      .then((r: AxiosResponse) => {
        console.log(r);
        closeModal();
      })
      .catch((r: AxiosError) => console.log(r));
  };

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Внести изменения
                  </Dialog.Title>
                  <div className="mt-2">
                    <form>
                      <div className="mt-2">
                        <input
                          type="text"
                          className="rounded mb-3"
                          placeholder="Заголовок"
                          value={title_local}
                          onChange={(event) => setTitle(event.target.value)}
                        />
                      </div>
                      <div>
                        <textarea
                          id="message"
                          className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Описание"
                          rows={5}
                          value={description_local}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={EditPostHandler}
                        >
                          Сохранить
                        </button>
                        <button
                          type="button"
                          className="ml-1 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Отмена
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
