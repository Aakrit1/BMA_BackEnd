import * as yup from 'yup';

export const loginUserSchema = yup.object().shape({
    userId: yup.string().required(),
    password: yup.string().required(),
});