import React from 'react';
import {useAppDispatch} from "../../hooks/redux.hooks";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuth} from "../../interfaces/auth.interface";
import {authActions} from "../../redux/slice/auth.slice";
import {Input, Spacer, Text, Button} from "@nextui-org/react";
import css from './styles/login.module.css'

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {handleSubmit, register, formState: {isValid}} = useForm<IAuth>();

    const login: SubmitHandler<IAuth> = async (admin) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login(admin));

        if (requestStatus === 'fulfilled') {
            navigate('/')
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(login)} className={css.Father}>
                <div className={css.Main}>
                    <div className={css.Form}>
                        <div className={css.LoginDiv}>
                            <Text h2 className={css.Login}>Login</Text>
                        </div>
                        <Input
                            clearable
                            label="Email"
                            placeholder="Email"
                            initialValue="admin@gmail.com"
                            {...register('email', {required: true})} />
                        <Spacer y={1.6} />
                        <Input.Password
                            size="sm"
                            labelPlaceholder="Password"
                            initialValue="admin"
                            {...register('password', {required: true})}  />
                        <div className={css.Button}>
                            <Button shadow color="primary" auto type="submit" disabled={!isValid}>
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
