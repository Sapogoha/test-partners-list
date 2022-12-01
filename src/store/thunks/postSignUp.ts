import { createAsyncThunk } from '@reduxjs/toolkit';
import IAuth from '../../types/IAuth';

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
  console.log(body);
  try {
    const response = await fetch('https://reqres.in/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log(response.body);
      throw new Error();
    } else {
      return response.json();
    }
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue('Ошибка регистрации');
  }
});

export default signUp;
