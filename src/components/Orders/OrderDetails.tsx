import AdminPanelSettingsTwoToneIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import CakeTwoToneIcon from "@mui/icons-material/CakeTwoTone";
import FunctionsTwoToneIcon from "@mui/icons-material/FunctionsTwoTone";
import LightbulbTwoToneIcon from "@mui/icons-material/LightbulbTwoTone";
import LocalLibraryTwoToneIcon from "@mui/icons-material/LocalLibraryTwoTone";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import PaidTwoToneIcon from "@mui/icons-material/PaidTwoTone";
import { Button, Input, Modal, Spacer, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useIsMobile } from "../../hoc";
import { useAppDispatch } from "../../hooks";
import { IComment } from "../../interfaces";
import { commentActions } from "../../redux";
import Comment from "../Comments/Comment";
import OrderEdit from "./OrderEdit";
import OrderEditPc from "./OrderEditPC";
import css from "./styles/order-details.module.css";

const OrderDetails = ({ order }: { order: any }) => {
  const avatar =
    "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png";

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<IComment>();
  const dispatch = useAppDispatch();
  const { orderId } = useParams();
  const [visibleComments, setVisibleComments] = useState<IComment[]>([]);
  const [visible, setVisible] = React.useState(false);

  const isMobile = useIsMobile();

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const comment: SubmitHandler<IComment> = async (commentData) => {
    await dispatch(
      commentActions.create({ comment: commentData, id: orderId })
    );
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
    comments,
  } = order;

  useEffect(() => {
    if (comments.length > 2) {
      setVisibleComments(comments.slice(-2));
    } else {
      setVisibleComments(comments);
    }
  }, [comments]);

  return (
    <div className={css.Father}>
      <div className={css.Others}>
        <div className={css.Mother}>
          <div className={css.ImgDiv}>
            <img src={avatar} alt="" className={css.Img} />
          </div>
          <div className={css.FIO}>
            <div>
              <Text h3 className={css.NameSurname}>
                {name} {surname}
              </Text>
            </div>
            <div className={css.EmailDiv2}>
              <Text className={css.Email}>
                {email == null ? "null" : email}
              </Text>
            </div>
          </div>
        </div>
        <div className={css.EmailDiv}>
          <Text className={css.Email}>{email == null ? "null" : email}</Text>
        </div>
        <Spacer />
        <hr />
        <div className={css.DescDiv}>
          <div className={css.Wrap}>
            <CakeTwoToneIcon
              sx={isMobile ? { fontSize: 80 } : { fontSize: 40 }}
            />
            <Text className={css.Text} h4>
              Age:
            </Text>
            <Text className={css.Text} h4>
              {age == null ? "null" : age}
            </Text>
          </div>
          <div className={css.Wrap}>
            <LocalLibraryTwoToneIcon
              sx={isMobile ? { fontSize: 80 } : { fontSize: 40 }}
            />
            <Text className={css.Text} h4>
              Course Format:
            </Text>
            <Text className={css.Text} h4>
              {course_format == null ? "null" : course_format}
            </Text>
          </div>
          <div className={css.Wrap}>
            <LightbulbTwoToneIcon
              sx={isMobile ? { fontSize: 80 } : { fontSize: 40 }}
            />
            <Text className={css.Text} h4>
              Course:
            </Text>
            <Text className={css.Text} h4>
              {course == null ? "null" : course}
            </Text>
          </div>
          <div className={css.Wrap}>
            <PaidTwoToneIcon
              sx={isMobile ? { fontSize: 80 } : { fontSize: 40 }}
            />
            <Text className={css.Text} h4>
              Paid:
            </Text>
            <Text className={css.Text} h4>
              {already_paid == null ? "null" : already_paid}
            </Text>
          </div>
          <div className={css.BottomWrap}>
            <LocalPhoneTwoToneIcon
              sx={isMobile ? { fontSize: 80 } : { fontSize: 40 }}
            />
            <Text className={css.Text} h6>
              {phone == null ? "null" : phone}
            </Text>
          </div>
          <div className={css.BottomWrap}>
            <FunctionsTwoToneIcon
              sx={isMobile ? { fontSize: 80 } : { fontSize: 40 }}
            />
            <Text className={css.Text} h6>
              {sum == null ? "null" : sum}
            </Text>
          </div>
          <div className={css.BottomWrap}>
            <AdminPanelSettingsTwoToneIcon
              sx={isMobile ? { fontSize: 80 } : { fontSize: 40 }}
            />
            <Text className={css.Text} h6>
              {manager == null ? "null" : manager}
            </Text>
          </div>
        </div>
        <div>
          <div className={css.TextDiv}>
            <Text h3 className={css.Comment}>
              Add a comment
            </Text>
          </div>
          <div className={css.Comments}>
            {visibleComments.map((comment): any => {
              return (
                <Comment
                  key={comment._id}
                  comment={comment}
                  user={comment.user}
                />
              );
            })}
          </div>
          <form onSubmit={handleSubmit(comment)}>
            <div className={css.InputDiv}>
              <Input
                placeholder="Comment me..."
                width="70vw"
                size={isMobile ? "xl" : "sm"}
                {...register("title", { required: true })}
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
            <Text className={css.Status}>
              status: {status == null ? "null" : status}
            </Text>
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
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text b size={isMobile ? 25 : 18}>
              {name}
            </Text>
          </Modal.Header>
          <Modal.Body>
            <OrderEdit />
          </Modal.Body>
        </Modal>
      </div>
      <div className={css.PCs}>
        <OrderEditPc order={order} />
      </div>
    </div>
  );
};

export default OrderDetails;
