import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IGroup} from "../../interfaces/group.interface";
import {useAppDispatch} from "../../hooks/redux.hooks";
import {groupActions} from "../../redux/slice/group.slice";
import {useParams} from "react-router-dom";
import {Button, Input} from "@nextui-org/react";
import css from './styles/group-edit.module.css'

const GroupAdd = () => {
    const dispatch = useAppDispatch();
    const {handleSubmit, register, formState: {isValid}} = useForm<IGroup>();
    const {orderId} = useParams();

    const group: SubmitHandler<IGroup> = async (groupData) => {
        await dispatch(groupActions.create({group: groupData, id: orderId}))
    }

    return (
        <div className={css.Father}>
            <form onSubmit={handleSubmit(group)}>
                <Input
                    placeholder="Group name"
                    width="70vw"
                    {...register('title', {required: true})}
                />
                <Button shadow color="primary" auto type="submit" disabled={!isValid} className={css.Button}>
                    Add group
                </Button>
            </form>
        </div>
    );
};

export default GroupAdd;
