import React from 'react';
import {useAppDispatch} from "../../hooks/redux.hooks";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuth} from "../../interfaces/auth.interface";
import {authActions} from "../../redux/slice/auth.slice";
import {Input, Spacer, Text, Button} from "@nextui-org/react";
import css from './styles/login.module.css'
import {useIsMobile} from "../../hoc/MediaQuery";

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {handleSubmit, register, formState: {isValid}} = useForm<IAuth>();

    const login: SubmitHandler<IAuth> = async (admin) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login(admin));

        if (requestStatus === 'fulfilled') {
            navigate('/orders')
        }
    };

    const isMobile = useIsMobile()

    return (
        <div>
            <form onSubmit={handleSubmit(login)} className={css.Father}>
                <div className={css.Main}>
                    <div>
                        <div className={css.LoginDiv}>
                            <Text h2 className={css.Login}>Login</Text>
                        </div>
                        <div className={css.Form}>
                            <Input
                                clearable
                                label="Email"
                                placeholder="Email"
                                initialValue="admin@gmail.com"
                                width={isMobile ? "50vw" : undefined}
                                size={isMobile ? "lg" : "md"}
                                {...register('email', {required: true})} />
                        </div>
                        <Spacer y={2} />
                        <div className={css.Form}>
                            <Input.Password
                                labelPlaceholder="Password"
                                initialValue="admin"
                                width={isMobile ? "50vw" : undefined}
                                size={isMobile ? "lg" : "sm"}
                                {...register('password', {required: true})}  />
                        </div>
                        <div className={css.Button}>
                            <Button
                                shadow
                                color="primary"
                                auto
                                type="submit"
                                disabled={!isValid}
                                size={isMobile ? "xl" : undefined}>
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
