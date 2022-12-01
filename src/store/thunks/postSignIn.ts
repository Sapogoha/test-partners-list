import { createAsyncThunk } from '@reduxjs/toolkit';
import IAuth from '../../types/IAuth';

const signIn = createAsyncThunk<
  { token: string },
  IAuth,
  {
    rejectValue: string;
  }
>('signIn/post', async (body, thunkApi) => {
  try {
    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error();
    } else {
      return response.json();
    }
  } catch (err) {
    return thunkApi.rejectWithValue('Ошибка входа');
  }
});

export default signIn;
