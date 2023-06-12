import React from 'react';
import {Input, Spacer, Text} from "@nextui-org/react";
import css from './styles/order-details.module.css'
import CakeTwoToneIcon from '@mui/icons-material/CakeTwoTone';
import LocalLibraryTwoToneIcon from '@mui/icons-material/LocalLibraryTwoTone';
import LightbulbTwoToneIcon from '@mui/icons-material/LightbulbTwoTone';
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import FunctionsTwoToneIcon from '@mui/icons-material/FunctionsTwoTone';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';

const OrderDetails = ({order}:{order: any}) => {
    const avatar = 'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'

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
                <div className={css.InputDiv}>
                    <Input placeholder="Comment me..." width="70vw"/>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
