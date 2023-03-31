import * as yup from 'yup';

export const findUserSchema = yup.object().shape({
    userId: yup.string().required(),
});