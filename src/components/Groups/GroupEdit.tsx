import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IGroup} from "../../interfaces/group.interface";
import {useAppDispatch} from "../../hooks/redux.hooks";
import {groupActions} from "../../redux/slice/group.slice";
import {useParams} from "react-router-dom";
import {Button, Input} from "@nextui-org/react";
import css from './styles/group-edit.module.css'
import {useIsMobile} from "../../hoc/MediaQuery";
import {Alert, Snackbar} from "@mui/material";

const GroupAdd = () => {
    const dispatch = useAppDispatch();
    const {handleSubmit, register, formState: {isValid}} = useForm<IGroup>();
    const {orderId} = useParams();
    const [groupCreated, setGroupCreated] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const group: SubmitHandler<IGroup> = async (groupData) => {
        try {
            await dispatch(groupActions.create({group: groupData, id: orderId}))
            setGroupCreated(true);
        } catch (e) {
            console.log(e)
            setErrorSnackbarOpen(true);
        }
    }

    const isMobile = useIsMobile()

    return (
        <div className={css.Father}>
            <form onSubmit={handleSubmit(group)}>
                <Input
                    placeholder="Group name"
                    width={isMobile ? "20vw" : "70vw"}
                    size={isMobile ? "lg" : "sm"}
                    {...register('title', {required: true})}
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
                onClose={() => setGroupCreated(false)}>
                <Alert onClose={() => setGroupCreated(false)} severity="success" sx={{ width: '100%' }}>
                    Group created successfully
                </Alert>
            </Snackbar>
            <Snackbar
                open={errorSnackbarOpen}
                autoHideDuration={6000}
                onClose={() => setGroupCreated(false)}>
                <Alert onClose={() => setErrorSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
                    Error, please try again
                </Alert>
            </Snackbar>
        </div>
    );
};

export default GroupAdd;
