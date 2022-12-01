import { createAsyncThunk } from '@reduxjs/toolkit';

interface IPartner {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface IAPI {
  data: any;
  page: number;
  per_page: number;
  support: object;
  total: number;
  total_pages: number;
}

interface IPartnerModified {
  id: number;
  name: string;
  avatar: string;
}

const getUsers = createAsyncThunk<
  IPartnerModified[],
  number,
  {
    rejectValue: string;
  }
>('getUsers', async (pageNum: number, thunkApi) => {
  try {
    const response = await fetch(
      `https://reqres.in/api/users?per_page=8&page=${pageNum}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error();
    } else {
      const res: IAPI = await response.json();

      return res.data.map((item: IPartner) => ({
        id: item.id,
        name: `${item.first_name} ${item.last_name}`,
        avatar: item.avatar,
      }));
    }
  } catch (err) {
    return thunkApi.rejectWithValue('Ошибка входа');
  }
});

export default getUsers;
