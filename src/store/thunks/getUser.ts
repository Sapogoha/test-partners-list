import { createAsyncThunk } from '@reduxjs/toolkit';

interface IPartner {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface IAPI {
  data: IPartner;
  support: object;
}

interface IPartnerModified {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const getUser = createAsyncThunk<
  IPartnerModified,
  number,
  {
    rejectValue: string;
  }
>('getUser', async (id: number, thunkApi) => {
  try {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error();
    } else {
      const res: IAPI = await response.json();
      const { id, first_name, last_name, avatar, email } = res.data;
      return {
        id,
        name: `${first_name} ${last_name}`,
        avatar,
        email,
      };
    }
  } catch (err) {
    return thunkApi.rejectWithValue('Ошибка входа');
  }
});

export default getUser;
