import Link from 'next/link';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { LogoutUserQuery, useLogoutUserQuery } from '../generated/graphql';
import graphqlRequestClient from '../requests/graphqlRequestClient';
import useStore from '../store';
import CardModal from './modals/card.modal';
import CreateCard from './cards/create.card';
import Spinner from './Spinner';

const Header = () => {
  const [openCardModal, setOpenCardModal] = useState(false);
  const store = useStore();
  const user = store.authUser;

  const queryClient = useQueryClient();
  const { refetch } = useLogoutUserQuery(
    graphqlRequestClient,
    {},
    {
      enabled: false,
      onSuccess(data: LogoutUserQuery) {
        queryClient.clear();
        document.location.href = '/login';
      },
      onError(error: any) {
        error.response.errors.forEach((err: any) => {
          toast(err.message, {
            type: 'error',
            position: 'top-right',
          });
          queryClient.clear();
          document.location.href = '/login';
        });
      },
    }
  );

  const handleLogout = () => {
    refetch();
  };

  return (
    <>
      <header className="bg-white h-20">
        <nav className="h-full flex justify-between container items-center">
          <div>
            <Link href="/" className="text-ct-dark-600 text-2xl font-semibold">
              Coinplus
            </Link>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/" className="text-ct-dark-600">
                Home
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link href="/register" className="text-ct-dark-600">
                    SignUp
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-ct-dark-600">
                    Login
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <Link href="/profile" className="text-ct-dark-600">
                    Profile
                  </Link>
                </li>
                <li className="cursor-pointer" onClick={() => setOpenCardModal(true)}>
                  Create Card
                </li>
                <li className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <CardModal openCardModal={openCardModal} setOpenCardModal={setOpenCardModal}>
        <CreateCard setOpenCardModal={setOpenCardModal} />
      </CardModal>
      <div className="pt-4 pl-2 bg-ct-blue-600 fixed">
        {store.pageLoading && <Spinner color="text-ct-yellow-600" />}
      </div>
    </>
  );
};

export default Header;
