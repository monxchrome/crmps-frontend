import { Button, Input, Spacer, Text } from "@nextui-org/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useIsMobile } from "../../hoc";
import { useAppDispatch } from "../../hooks";
import { IAuth } from "../../interfaces";
import { authActions } from "../../redux";
import css from "./styles/login.module.css";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<IAuth>();

    const isMobile = useIsMobile();

  const login: SubmitHandler<IAuth> = async (admin) => {
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.login(admin));

    if (requestStatus === "fulfilled") {
      navigate("/orders");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(login)} className={css.Father}>
        <div className={css.Main}>
          <div>
            <div className={css.LoginDiv}>
              <Text h2 className={css.Login}>
                Login
              </Text>
            </div>
            <div className={css.Form}>
              <Input
                clearable
                label="Email"
                placeholder="Email"
                initialValue="admin@gmail.com"
                width={isMobile ? "50vw" : undefined}
                size={isMobile ? "lg" : "md"}
                {...register("email", { required: true })}
              />
            </div>
            <Spacer y={2} />
            <div className={css.Form}>
              <Input.Password
                labelPlaceholder="Password"
                initialValue="admin"
                width={isMobile ? "50vw" : undefined}
                size={isMobile ? "lg" : "sm"}
                {...register("password", { required: true })}
              />
            </div>
            <div className={css.Button}>
              <Button
                shadow
                color="primary"
                auto
                type="submit"
                disabled={!isValid}
                size={isMobile ? "xl" : undefined}
              >
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
