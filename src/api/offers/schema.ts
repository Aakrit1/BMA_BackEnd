import * as yup from 'yup';

export const locationUpdateSchema = yup.object().shape({
    latitude: yup.string().required(),
    longitude: yup.string().required(),
});

export const findUserSchema = yup.object().shape({
    userId: yup.string().required(),
});