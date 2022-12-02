import { createAsyncThunk } from '@reduxjs/toolkit';
import IAuth from '../../components/Auth/IAuth';

interface IResponse {
  id: number;
  token: string;
}
const signUp = createAsyncThunk<
  IResponse,
  IAuth,
  {
    rejectValue: string;
  }
>('signUp/post', async (body, thunkApi) => {
  try {
    const response = await fetch('https://reqres.in/api/register', {
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
    return thunkApi.rejectWithValue('Ошибка регистрации');
  }
});

export default signUp;
