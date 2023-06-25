import { Alert, Snackbar } from "@mui/material";
import { Button, Input, Text, User } from "@nextui-org/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks";
import { IComment } from "../../interfaces";
import { commentActions } from "../../redux";
import css from "./styles/order.module.css";

const Order = ({ order }: { order: any }) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<IComment>();
  const [commentCreated, setCommentCreated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

  const avatar =
    "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png";
  const arrow =
    "https://www.freeiconspng.com/thumbs/arrow-icon/arrow-icon--myiconfinder-23.png";

  const {
    _id,
    name,
    surname,
    phone,
    age,
    course,
    course_format,
    course_type,
    email,
    status,
    sum,
    already_paid,
  } = order;

  const handler = () => {
    navigate(_id);
  };

  const comment: SubmitHandler<IComment> = async (commentData) => {
    await dispatch(commentActions.create({ comment: commentData, id: _id }));
    setCommentCreated(true);
  };

  const toggleHeight = () => {
    setExpanded(!expanded);
  };

  const divStyle = {
    height: expanded ? "20vh" : "12vh",
    backgroundColor: "white",
    transition: "height 0.3s ease",
    cursor: "pointer",
  };
  const contentStyle = {
    display: expanded ? "flex" : "none",
  };

  return (
    <div>
      <div className={css.Mobile}>
        <NavLink to={_id} className={css.Father}>
          <User src={avatar} name={`${name}  ${surname}`} size="lg" />
          <div>
            <img src={arrow} alt="" className={css.Arrow} />
          </div>
        </NavLink>
      </div>

      <div className={css.Pads}>
        <div className={css.TextDiv}>
          <Text h3>{name == null || name === "" ? "null" : name}</Text>
        </div>
        <div className={css.TextDiv}>
          <Text h3>{surname == null || surname === "" ? "null" : surname}</Text>
        </div>
        <div className={css.TextDiv2}>
          <Text h3>{age == null || age === "" ? "null" : age}</Text>
        </div>
        <div className={css.Button}>
          <NavLink to={_id}>
            <Button shadow color="warning">
              More
            </Button>
          </NavLink>
        </div>
        <hr className={css.Hr} />
      </div>

      <div className={css.Laptops} style={divStyle} onClick={toggleHeight}>
        <div className={css.TextDiv}>
          <Text h5>{name == null || name === "" ? "null" : name}</Text>
        </div>
        <div className={css.TextDiv}>
          <Text h5>{surname == null || surname === "" ? "null" : surname}</Text>
        </div>
        <div className={css.TextDiv1}>
          <Text h5>{email == null || email === "" ? "null" : email}</Text>
        </div>
        <div className={css.TextDiv4}>
          <Text h5>{phone == null || phone === "" ? "null" : phone}</Text>
        </div>
        <div className={css.TextDiv3}>
          <Text h5>{course == null || course === "" ? "null" : course}</Text>
        </div>
        <div className={css.TextDiv3}>
          <Text h5>
            {course_format == null || course_format === ""
              ? "null"
              : course_format}
          </Text>
        </div>
        <div className={css.TextDiv3}>
          <Text h5>
            {course_type == null || course_type === "" ? "null" : course_type}
          </Text>
        </div>
        <div className={css.TextDiv2}>
          <Text h5>{status == null || status === "" ? "null" : status}</Text>
        </div>
        <div className={css.TextDiv2}>
          <Text h5>{sum == null || sum === "" ? "null" : sum}</Text>
        </div>
        <div className={css.TextDiv2}>
          <Text h5>
            {already_paid == null || already_paid === ""
              ? "null"
              : already_paid}
          </Text>
        </div>
      </div>
      <form
        style={contentStyle}
        className={css.Edit}
        onSubmit={handleSubmit(comment)}
      >
        <Button shadow color="success" size="lg" onPress={handler}>
          Edit
        </Button>

        <div className={css.InputDiv}>
          <Input
            className={css.Input}
            clearable
            label="Comment"
            placeholder="Write a comment..."
            size="lg"
            css={{ width: "20vw" }}
            {...register("title", { required: true })}
          />
        </div>
        <Button
          shadow
          color="secondary"
          size="lg"
          disabled={!isValid}
          type="submit"
        >
          Submit
        </Button>
      </form>
      <hr className={css.Hr} />
      <Snackbar
        open={commentCreated}
        autoHideDuration={6000}
        onClose={() => setCommentCreated(false)}
      >
        <Alert
          onClose={() => setCommentCreated(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Comment created successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Order;
