import React, { FC, useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import Image from 'next/future/image';
import { ICard } from '../../lib/types';
import { useDeleteCardMutation } from '../../generated/graphql';
import graphqlRequestClient, { queryClient } from '../../requests/graphqlRequestClient';
import { toast } from 'react-toastify';
import useStore from '../../store';
import CardModal from '../modals/card.modal';
import UpdateCard from './update.card';

type CardItemProps = {
  card: ICard;
};

const CardItem: FC<CardItemProps> = ({ card }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);

  const store = useStore();
  const { isLoading, mutate: deleteCard } = useDeleteCardMutation(graphqlRequestClient, {
    onSuccess(data) {
      store.setPageLoading(false);
      queryClient.refetchQueries('GetAllCards');
      toast('Card deleted successfully', {
        type: 'success',
        position: 'top-right',
      });
    },
    onError(error: any) {
      store.setPageLoading(false);
      error.response.errors.forEach((err: any) => {
        toast(err.message, {
          type: 'error',
          position: 'top-right',
        });
      });
    },
  });

  useEffect(() => {
    if (isLoading) {
      store.setPageLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const onDeleteHandler = (id: string) => {
    toggleMenu();
    if (window.confirm('Are you sure')) {
      deleteCard({ deleteCardId: id });
    }
  };
  return (
    <>
      <div className="rounded-md shadow-md bg-white">
        {/* <div className="mx-2 mt-2 overflow-hidden rounded-md">
          <Image src={card.image} alt={card.title} className="object-fill w-full h-full" width={400} height={250} />
        </div> */}
        <div className="p-4">
          <h5 className="font-semibold text-xl text-[#4d4d4d] mb-4">
            {card.title.length > 25 ? card.title.substring(0, 25) + '...' : card.title}
          </h5>
          <div className="flex items-center mt-4">
            <p className="p-1 rounded-sm mr-4 bg-[#dad8d8]">{card.category}</p>
            <p className="text-[#ffa238]">{format(parseISO(card.createdAt), 'PPP')}</p>
          </div>
        </div>
        <div className="flex justify-between items-center px-4 pb-4">
          <div className="flex items-center">
            {/* <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={card.user.photo}
                alt={card.user.name}
                className="object-cover w-full h-full"
                height={100}
                width={100}
              />
            </div> */}
            <p className="ml-4 text-sm font-semibold">{card.user.name}</p>
          </div>
          <div className="relative">
            <div className="text-3xl text-[#4d4d4d] cursor-pointer p-3" onClick={toggleMenu}>
              <i className="bx bx-dots-horizontal-rounded"></i>
            </div>
            <ul
              className={twMerge(
                `absolute bottom-5 -right-1 z-50 py-2 rounded-sm bg-white shadow-lg transition ease-out duration-300 invisible`,
                `${openMenu ? 'visible' : 'invisible'}`
              )}
            >
              <li
                className="w-24 h-7 py-3 px-2 hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer transition ease-in duration-300"
                onClick={() => {
                  setOpenCardModal(true);
                  toggleMenu();
                }}
              >
                <i className="bx bx-edit-alt"></i> <span>Edit</span>
              </li>
              <li
                className="w-24 h-7 py-3 px-2 hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer transition ease-in duration-300"
                onClick={() => onDeleteHandler(card._id)}
              >
                <i className="bx bx-trash"></i> <span>Delete</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <CardModal openCardModal={openCardModal} setOpenCardModal={setOpenCardModal}>
        <UpdateCard card={card} setOpenCardModal={setOpenCardModal} />
      </CardModal>
    </>
  );
};

export default CardItem;
