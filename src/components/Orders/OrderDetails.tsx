import React, {useEffect, useMemo, useState} from 'react';
import {Button, Dropdown, Input, Modal, Spacer, Text} from "@nextui-org/react";
import css from './styles/order-details.module.css'
import CakeTwoToneIcon from '@mui/icons-material/CakeTwoTone';
import LocalLibraryTwoToneIcon from '@mui/icons-material/LocalLibraryTwoTone';
import LightbulbTwoToneIcon from '@mui/icons-material/LightbulbTwoTone';
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import FunctionsTwoToneIcon from '@mui/icons-material/FunctionsTwoTone';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks";
import {commentActions} from "../../redux/slice/comment.slice";
import {IComment} from "../../interfaces/comment.interface";
import {useParams} from "react-router-dom";
import Comment from "../Comments/Comment";
import OrderEdit from "./OrderEdit";
import {useIsMobile} from "../../hoc/MediaQuery";
import {IOrder} from "../../interfaces/order.interface";
import {orderActions} from "../../redux/slice/order.slice";
import GroupAdd from "../Groups/GroupEdit";
import OrderEditPc from "./OrderEditPC";

const OrderDetails = ({order}:{order: any}) => {
    const avatar = 'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'

    const [selectedGroup, setSelectedGroup] = useState(new Set(["Select"]));
    const [selectedStatus, setSelectedStatus] = useState(new Set(["Select"]));
    const [selectedCourse, setSelectedCourse] = useState(new Set(["Select"]));
    const [selectedCourseFormat, setSelectedCourseFormat] = useState(new Set(["Select"]));
    const [selectedCourseType, setSelectedCourseType] = useState(new Set(["Select"]));

    const {handleSubmit, register, formState: {isValid}} = useForm<IComment>();
    const dispatch = useAppDispatch();
    const {orderId} = useParams();
    const [visibleComments, setVisibleComments] = useState<IComment[]>([]);
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
    };

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
        already_paid,
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

    const isMobile = useIsMobile()

    const selectedValueGroup = useMemo(
        () => Array.from(selectedGroup).join(", ").replaceAll("_", " "),
        [selectedGroup]
    );

    const selectedValueStatus = useMemo(
        () => Array.from(selectedStatus).join(", ").replaceAll("_", " "),
        [selectedStatus]
    );

    const selectedValueCourse = useMemo(
        () => Array.from(selectedCourse).join(", ").replaceAll("_", " "),
        [selectedCourse]
    );

    const selectedValueCourseFormat = useMemo(
        () => Array.from(selectedCourseFormat).join(", ").replaceAll("_", " "),
        [selectedCourseFormat]
    );

    const selectedValueCourseType = useMemo(
        () => Array.from(selectedCourseType).join(", ").replaceAll("_", " "),
        [selectedCourseType]
    );

    const update: SubmitHandler<IOrder> = async (order) => {
        dispatch(orderActions.update({id: orderId, order}))
    };

    const {groups, trigger} = useAppSelector(state => state.groupReducer);

    return (
        <div className={css.Father}>
            <div className={css.Others}>
                <div className={css.Mother}>
                    <div className={css.ImgDiv}>
                        <img src={avatar} alt="" className={css.Img}/>
                    </div>
                    <div className={css.FIO}>
                        <div>
                            <Text h3 className={css.NameSurname}>{name} {surname}</Text>
                        </div>
                        <div className={css.EmailDiv2}>
                            <Text className={css.Email}>{email == null ? 'null': email}</Text>
                        </div>
                    </div>
                </div>
                <div className={css.EmailDiv}>
                    <Text className={css.Email}>{email == null ? 'null': email}</Text>
                </div>
                <Spacer/>
                <hr/>
                <div className={css.DescDiv}>
                    <div className={css.Wrap}>
                        <CakeTwoToneIcon sx={isMobile ? {fontSize: 80} : {fontSize: 40}}/>
                        <Text className={css.Text} h4>Age:</Text>
                        <Text className={css.Text} h4>{age == null ? 'null': age}</Text>
                    </div>
                    <div className={css.Wrap}>
                        <LocalLibraryTwoToneIcon sx={isMobile ? {fontSize: 80} : {fontSize: 40}}/>
                        <Text className={css.Text} h4>Course Format:</Text>
                        <Text className={css.Text} h4>{course_format == null ? 'null': course_format}</Text>
                    </div>
                    <div className={css.Wrap}>
                        <LightbulbTwoToneIcon sx={isMobile ? {fontSize: 80} : {fontSize: 40}}/>
                        <Text className={css.Text} h4>Course:</Text>
                        <Text className={css.Text} h4>{course == null ? 'null': course}</Text>
                    </div>
                    <div className={css.Wrap}>
                        <PaidTwoToneIcon sx={isMobile ? {fontSize: 80} : {fontSize: 40}}/>
                        <Text className={css.Text} h4>Paid:</Text>
                        <Text className={css.Text} h4>{already_paid == null ? 'null': already_paid}</Text>
                    </div>
                    <div className={css.BottomWrap}>
                        <LocalPhoneTwoToneIcon sx={isMobile ? {fontSize: 80} : {fontSize: 40}}/>
                        <Text className={css.Text} h6>{phone == null ? 'null': phone}</Text>
                    </div>
                    <div className={css.BottomWrap}>
                        <FunctionsTwoToneIcon sx={isMobile ? {fontSize: 80} : {fontSize: 40}}/>
                        <Text className={css.Text} h6>{sum == null ? 'null': sum}</Text>
                    </div>
                    <div className={css.BottomWrap}>
                        <AdminPanelSettingsTwoToneIcon sx={isMobile ? {fontSize: 80} : {fontSize: 40}}/>
                        <Text className={css.Text} h6>{manager == null ? 'null': manager}</Text>
                    </div>
                </div>
                <div>
                    <div className={css.TextDiv}>
                        <Text h3 className={css.Comment}>Add a comment</Text>
                    </div>
                    <div className={css.Comments}>
                        {visibleComments.map((comment): any => {
                            return (
                                <Comment key={comment._id} comment={comment} user={comment.user}/>
                            )
                        })}
                    </div>
                    <form onSubmit={handleSubmit(comment)}>
                        <div className={css.InputDiv}>
                            <Input
                                placeholder="Comment me..."
                                width="70vw"
                                size={isMobile ? "xl" : "sm"}
                                {...register('title', {required: true})}
                            />
                        </div>
                        <div className={css.Button}>
                            <Button
                                shadow
                                color="primary"
                                auto
                                type="submit"
                                disabled={!isValid}
                                size={isMobile ? "xl" : "sm"}
                            >
                                Comment
                            </Button>
                        </div>
                    </form>
                </div>
                <div>
                    <div className={css.StatusDiv}>
                        <Text className={css.Status}>status: {status == null ? 'null': status}</Text>
                    </div>
                </div>
                <div className={css.ButtonDiv}>
                    <Button
                        shadow
                        color="success"
                        className={css.Edit}
                        onPress={handler}
                        size={isMobile ? "xl" : "sm"}
                    >
                        Edit
                    </Button>
                </div>
                <Modal
                    closeButton
                    blur
                    aria-labelledby="modal-title"
                    open={visible}
                    width="90vw"
                    onClose={closeHandler}>
                    <Modal.Header>
                        <Text b size={isMobile ? 25 : 18}>
                            {name}
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <OrderEdit/>
                    </Modal.Body>
                </Modal>
            </div>
            <div className={css.PCs}>
                <OrderEditPc order={order}/>
            </div>
        </div>
    );
};

export default OrderDetails;
