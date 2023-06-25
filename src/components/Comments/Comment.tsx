import React from 'react';
import {Text} from "@nextui-org/react";
import css from './styles/comment.module.css'

const Comment = ({comment, user}: {comment: any, user: any}) => {
    const {title} = comment
    const {email, createdAt} = user

    const date = new Date(createdAt);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate: string = date.toLocaleDateString('en-US', options);

    return (
        <div className={css.Father}>
            <div>
                <Text h6 className={css.Text}>{title}</Text>
            </div>
            <div>
                <Text h6 className={css.Text}>{email}</Text>
            </div>
            <div>
                <Text h6 className={css.Text}>{formattedDate}</Text>
            </div>
        </div>
    );
};

export default Comment;
