import { Alert, Snackbar } from "@mui/material";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useIsMobile } from "../../hoc";
import { useAppDispatch } from "../../hooks";
import { IGroup } from "../../interfaces";
import { groupActions } from "../../redux";
import css from "./styles/group-edit.module.css";

const GroupAdd = () => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<IGroup>();
  const { orderId } = useParams();
  const [groupCreated, setGroupCreated] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const isMobile = useIsMobile();

  const group: SubmitHandler<IGroup> = async (groupData) => {
    try {
      await dispatch(groupActions.create({ group: groupData, id: orderId }));
      setGroupCreated(true);
    } catch (e) {
      setErrorSnackbarOpen(true);
    }
  };

  return (
    <div className={css.Father}>
      <form onSubmit={handleSubmit(group)}>
        <Input
          placeholder="Group name"
          width={isMobile ? "20vw" : "70vw"}
          size={isMobile ? "lg" : "sm"}
          {...register("title", { required: true })}
        />
        <div className={css.ButtonDiv}>
          <Button
            shadow
            color="primary"
            auto
            type="submit"
            disabled={!isValid}
            className={css.Button}
            size={isMobile ? "lg" : "sm"}
          >
            Add group
          </Button>
        </div>
      </form>
      <Snackbar
        open={groupCreated}
        autoHideDuration={6000}
        onClose={() => setGroupCreated(false)}
      >
        <Alert
          onClose={() => setGroupCreated(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Group created successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setGroupCreated(false)}
      >
        <Alert
          onClose={() => setErrorSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error, please try again
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GroupAdd;
