import { Dialog, Transition } from "@headlessui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Fragment, useState } from "react";
import { useRecoilValue } from "recoil";
import { TokenAtom } from "store";

export default function ModlaDialog() {
  let [isOpen, setIsOpen] = useState<boolean>(false);

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");

  const atomToken = useRecoilValue(TokenAtom);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const CreatePost = () => {
    const token = localStorage.getItem("token") || atomToken;

    axios({
      url: "http://127.0.0.1:8000/posts/",
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        title,
        description,
      },
    })
      .then((r: AxiosResponse) => {
        console.log(r);
        closeModal()
      })
      .catch((r: AxiosError) => console.log(r));
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Создать Пост
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
                    Создать Пост
                  </Dialog.Title>
                  <form>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="rounded mb-3"
                        placeholder="Заголовок"
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </div>
                    <div>
                      <textarea
                        id="message"
                        className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Описание"
                        rows={5}
                        onChange={(event) => setDescription(event.target.value)}
                      ></textarea>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={CreatePost}
                      >
                        Создать
                      </button>
                      <button
                        type="button"
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Закрыть
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
