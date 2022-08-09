import ReactDom from 'react-dom';
import React, { FC } from 'react';

type ICardModal = {
  openCardModal: boolean;
  setOpenCardModal: (openCardModal: boolean) => void;
  children: React.ReactNode;
};

const CardModal: FC<ICardModal> = ({ openCardModal, setOpenCardModal, children }) => {
  if (!openCardModal) return null;
  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-[rgba(0,0,0,.5)] z-[1000]" onClick={() => setOpenCardModal(false)}></div>
      <div className="max-w-lg w-full rounded-md fixed top-[15%] left-1/2 -translate-x-1/2 bg-white z-[1001] p-6">
        {children}
      </div>
    </>,
    document.getElementById('card-modal') as HTMLElement
  );
};

export default CardModal;
