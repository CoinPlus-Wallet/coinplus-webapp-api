import React, { FC, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FileUpLoader from '../FileUpload';
import { LoadingButton } from '../LoadingButton';
import TextInput from '../TextInput';
import { useCreateCardMutation } from '../../generated/graphql';
import graphqlRequestClient, { queryClient } from '../../requests/graphqlRequestClient';
import { toast } from 'react-toastify';
import useStore from '../../store';

const createCardSchema = object({
  title: string().min(1, 'Title is required'),
  category: string().min(1, 'Category is required'),
  content: string().min(1, 'Content is required'),
  // image: string().min(1, 'Image is required'),
});

type CreateCardInput = TypeOf<typeof createCardSchema>;

type ICreateCardProp = {
  setOpenCardModal: (openCardModal: boolean) => void;
};

const CreateCard: FC<ICreateCardProp> = ({ setOpenCardModal }) => {
  const store = useStore();
  const { isLoading, mutate: createCard } = useCreateCardMutation(graphqlRequestClient, {
    onSuccess(data) {
      store.setPageLoading(false);
      setOpenCardModal(false);
      queryClient.refetchQueries('GetAllCards');
      toast('Card created successfully', {
        type: 'success',
        position: 'top-right',
      });
    },
    onError(error: any) {
      store.setPageLoading(false);
      setOpenCardModal(false);
      error.response.errors.forEach((err: any) => {
        toast(err.message, {
          type: 'error',
          position: 'top-right',
        });
      });
    },
  });
  const methods = useForm<CreateCardInput>({
    resolver: zodResolver(createCardSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (isLoading) {
      store.setPageLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onSubmitHandler: SubmitHandler<CreateCardInput> = async (data) => {
    createCard({ input: data });
  };
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Create Card</h2>

      <FormProvider {...methods}>
        <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
          <TextInput name="title" label="Title" />
          <TextInput name="category" label="Category" />
          <div className="mb-2">
            <label className="block text-gray-700 text-lg mb-2" htmlFor="title">
              Content
            </label>
            <textarea
              className={twMerge(
                `appearance-none border border-ct-dark-200 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none`,
                `${errors.content && 'border-red-500'}`
              )}
              rows={4}
              {...register('content')}
            />
            <p className={twMerge(`text-red-500 text-xs italic mb-2 invisible`, `${errors.content && 'visible'}`)}>
              {errors.content ? errors.content.message : ''}
            </p>
          </div>
          {/* <FileUpLoader name="image" /> */}
          <LoadingButton loading={isLoading} textColor="text-ct-blue-600">
            Create Card
          </LoadingButton>
        </form>
      </FormProvider>
    </section>
  );
};

export default CreateCard;
