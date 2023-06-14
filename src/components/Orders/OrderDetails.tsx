import React, {useEffect, useState} from 'react';
import {Button, Input, Spacer, Text} from "@nextui-org/react";
import css from './styles/order-details.module.css'
import CakeTwoToneIcon from '@mui/icons-material/CakeTwoTone';
import LocalLibraryTwoToneIcon from '@mui/icons-material/LocalLibraryTwoTone';
import LightbulbTwoToneIcon from '@mui/icons-material/LightbulbTwoTone';
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import FunctionsTwoToneIcon from '@mui/icons-material/FunctionsTwoTone';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../hooks/redux.hooks";
import {commentActions} from "../../redux/slice/comment.slice";
import {IComment} from "../../interfaces/comment.interface";
import {useParams} from "react-router-dom";
import Comment from "../Comments/Comment";

const OrderDetails = ({order}:{order: any}) => {
    const avatar = 'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'

    const {handleSubmit, register, formState: {isValid}} = useForm<IComment>();
    const dispatch = useAppDispatch();
    const {orderId} = useParams();
    const [visibleComments, setVisibleComments] = useState<IComment[]>([]);

    const comment: SubmitHandler<IComment> = async (commentData) => {
        await dispatch(commentActions.create({ comment: commentData, id: orderId }));
    };

    const {
        name,
        surname,
        email,
        phone,
        age,
        course,
        course_format,
        status,
        sum,
        alreadyPaid,
        manager,
        comments
    } = order

    useEffect(() => {
        if (comments.length > 2) {
            setVisibleComments(comments.slice(-2));
        } else {
            setVisibleComments(comments);
        }
    }, [comments]);

    return (
        <div className={css.Father}>
            <div className={css.Mother}>
                <div className={css.ImgDiv}>
                    <img src={avatar} alt="" className={css.Img}/>
                </div>
                <div className={css.FIO}>
                    <div>
                        <Text h3>{name} {surname}</Text>
                    </div>
                    <div>
                        <Text>{email == null ? 'null': email}</Text>
                    </div>
                </div>
            </div>
            <Spacer/>
            <hr/>
            <div className={css.DescDiv}>
                <div className={css.Wrap}>
                    <CakeTwoToneIcon sx={{fontSize: 40}}/>
                    <Text className={css.Text} h4>Age:</Text>
                    <Text className={css.Text} h4>{age == null ? 'null': age}</Text>
                </div>
                <div className={css.Wrap}>
                    <LocalLibraryTwoToneIcon sx={{fontSize: 40}}/>
                    <Text className={css.Text} h4>Course Format:</Text>
                    <Text className={css.Text} h4>{course_format == null ? 'null': course_format}</Text>
                </div>
                <div className={css.Wrap}>
                    <LightbulbTwoToneIcon sx={{fontSize: 40}}/>
                    <Text className={css.Text} h4>Course:</Text>
                    <Text className={css.Text} h4>{course == null ? 'null': course}</Text>
                </div>
                <div className={css.Wrap}>
                    <PaidTwoToneIcon sx={{fontSize: 40}}/>
                    <Text className={css.Text} h4>Paid:</Text>
                    <Text className={css.Text} h4>{alreadyPaid == null ? 'null': alreadyPaid}</Text>
                </div>
                <div className={css.BottomWrap}>
                    <LocalPhoneTwoToneIcon sx={{fontSize: 26}}/>
                    <Text className={css.Text} h6>{phone == null ? 'null': phone}</Text>
                </div>
                <div className={css.BottomWrap}>
                    <FunctionsTwoToneIcon sx={{fontSize: 26}}/>
                    <Text className={css.Text} h6>{sum == null ? 'null': sum}</Text>
                </div>
                <div className={css.BottomWrap}>
                    <AdminPanelSettingsTwoToneIcon sx={{fontSize: 26}}/>
                    <Text className={css.Text} h6>{manager == null ? 'null': manager}</Text>
                </div>
            </div>
            <div>
                <div className={css.TextDiv}>
                    <Text h3>Add a comment</Text>
                </div>
                <div>
                    {visibleComments.map((comment): any => {
                        return (
                            <Comment key={comment._id} comment={comment} user={comment.user}/>
                        )
                    })}
                </div>
                <form onSubmit={handleSubmit(comment)}>
                    <Input
                        placeholder="Comment me..."
                        width="70vw"
                        className={css.InputDiv}
                        {...register('title', {required: true})}
                    />
                    <Button className={css.Button} shadow color="primary" auto type="submit" disabled={!isValid}>
                        Comment
                    </Button>
                </form>
            </div>
            <div>
                <div className={css.StatusDiv}>
                    <Text>status: {status == null ? 'null': status}</Text>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
