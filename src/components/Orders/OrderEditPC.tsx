import { Alert, Snackbar } from "@mui/material";
import {
  Button,
  Dropdown,
  Input,
  Modal,
  Spacer,
  Text,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useIsMobile } from "../../hoc";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IComment, IOrder } from "../../interfaces";
import { groupActions, orderActions } from "../../redux";
import Comment from "../Comments/Comment";
import GroupAdd from "../Groups/GroupEdit";
import css from "./styles/order-edit.module.css";

const OrderEditPc = ({ order }: { order: any }) => {
  const { comments } = order;

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const [visible, setVisible] = React.useState(false);

  const [selectedGroup, setSelectedGroup] = useState(new Set(["Select"]));
  const [selectedStatus, setSelectedStatus] = useState(new Set(["Select"]));
  const [selectedCourse, setSelectedCourse] = useState(new Set(["Select"]));
  const [selectedCourseFormat, setSelectedCourseFormat] = useState(
    new Set(["Select"])
  );
  const [selectedCourseType, setSelectedCourseType] = useState(
    new Set(["Select"])
  );
  const [orderUpdated, setOrderUpdated] = useState(false);
  const { orderId } = useParams();
  const { handleSubmit, register, setValue } = useForm<IOrder>();

  const dispatch = useAppDispatch();

  const update: SubmitHandler<IOrder> = async (order) => {
    dispatch(orderActions.update({ id: orderId, order }));
    setOrderUpdated(true);
  };

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

  const { groups, trigger } = useAppSelector((state) => state.groupReducer);

  const { orderForUpdate } = useAppSelector((state) => state.orderReducer);

  useEffect(() => {
    dispatch(groupActions.getAll());

    if (orderForUpdate) {
      setValue("age", orderForUpdate.age);
      setValue("sum", orderForUpdate.sum);
      setValue("name", orderForUpdate.name);
      setValue("email", orderForUpdate.email);
      setValue("already_paid", orderForUpdate.already_paid);
      setValue("course", orderForUpdate.course);
      setValue("course_format", orderForUpdate.course_format);
      setValue("phone", orderForUpdate.phone);
      setValue("status", orderForUpdate.status);
      setValue("surname", orderForUpdate.surname);
      setValue("course_type", orderForUpdate.course_type);
      setValue("group", orderForUpdate.group);
    }
  }, [dispatch, orderForUpdate, setValue, trigger]);

  const isMobile = useIsMobile();

  const [visibleComments, setVisibleComments] = useState<IComment[]>([]);

  useEffect(() => {
    if (comments.length > 2) {
      setVisibleComments(comments.slice(-2));
    } else {
      setVisibleComments(comments);
    }
  }, [comments]);

  return (
    <form onSubmit={handleSubmit(update)}>
      {/* eslint-disable @typescript-eslint/ban-ts-comment */}
      <div className={css.Wrap}>
        <div className={css.Mother}>
          <div>
            <Text className={css.GroupText} h4>
              Group
            </Text>
          </div>
          <div>
            <Dropdown>
              <Dropdown.Button
                flat
                color="warning"
                css={
                  isMobile
                    ? { tt: "capitalize", height: "4vh", width: "20vw" }
                    : { tt: "capitalize", height: "4vh" }
                }
                size={isMobile ? "lg" : "sm"}
                auto
              >
                {selectedValueGroup}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                color="warning"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedGroup}
                //@ts-ignore
                onSelectionChange={(selected) => {
                  // @ts-ignore
                  setSelectedGroup(selected);
                  // @ts-ignore
                  register("group", { value: selected.anchorKey });
                }}
              >
                {groups.map((group) => (
                  <Dropdown.Item key={group.title}>{group.title}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <Button
              onPress={handler}
              className={css.Button}
              auto
              css={
                isMobile ? { height: "2vh", width: "20vw" } : { height: "3vh" }
              }
            >
              Add Group
            </Button>
            <Modal
              closeButton
              aria-labelledby="modal-title"
              open={visible}
              onClose={closeHandler}
            >
              <Modal.Header>
                <Text b size={18}>
                  Group
                </Text>
              </Modal.Header>
              <Modal.Body>
                <GroupAdd />
              </Modal.Body>
            </Modal>
          </div>
        </div>
        <div className={css.Mother}>
          <div>
            <Text className={css.GroupText} h4>
              Status
            </Text>
          </div>
          <div>
            <Dropdown>
              <Dropdown.Button
                flat
                color="warning"
                css={
                  isMobile
                    ? { tt: "capitalize", height: "4vh", width: "20vw" }
                    : { tt: "capitalize", height: "4vh" }
                }
                auto
              >
                {selectedValueStatus}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                color="warning"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedStatus}
                //@ts-ignore
                onSelectionChange={(selected) => {
                  // @ts-ignore
                  setSelectedStatus(selected);
                  // @ts-ignore
                  register("status", { value: selected.anchorKey });
                }}
              >
                <Dropdown.Item key="inWork">In work</Dropdown.Item>
                <Dropdown.Item key="new">New</Dropdown.Item>
                <Dropdown.Item key="agree">Agree</Dropdown.Item>
                <Dropdown.Item key="disagree">Disagree</Dropdown.Item>
                <Dropdown.Item key="dubbing">Dubbing</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className={css.Mother}>
          <div>
            <Text className={css.GroupText} h4>
              Name
            </Text>
          </div>
          <form action="">
            <Input
              clearable
              underlined
              placeholder="Write a name"
              width="20vw"
              size={isMobile ? "xl" : "sm"}
              {...register("name")}
            />
          </form>
        </div>
      </div>
      <div className={css.Wrap2}>
        <div className={css.Mother}>
          <div>
            <Text className={css.GroupText} h4>
              Sum
            </Text>
          </div>
          <form action="">
            <Input
              clearable
              underlined
              placeholder="Write a sum"
              type="number"
              size={isMobile ? "xl" : "sm"}
              width="20vw"
              {...register("sum")}
            />
          </form>
        </div>
        <div className={css.Mother}>
          <div>
            <Text className={css.GroupText} h4>
              Surname
            </Text>
          </div>
          <form action="">
            <Input
              clearable
              underlined
              placeholder="Write a surname"
              type="text"
              size={isMobile ? "xl" : "sm"}
              width="20vw"
              {...register("surname")}
            />
          </form>
        </div>
        <div className={css.Mother}>
          <div>
            <Text className={css.GroupText} h4>
              Already paid
            </Text>
          </div>
          <form action="">
            <Input
              clearable
              underlined
              placeholder="Write a already paid"
              type="number"
              size={isMobile ? "xl" : "sm"}
              width="20vw"
              {...register("already_paid")}
            />
          </form>
        </div>
      </div>
      <div className={css.Wrap2}>
        <div className={css.Mother}>
          <div>
            <Text className={css.GroupText} h4>
              Email
            </Text>
          </div>
          <form action="">
            <Input
              clearable
              underlined
              placeholder="Write an email"
              type="text"
              size={isMobile ? "xl" : "sm"}
              width="20vw"
              {...register("email")}
            />
          </form>
        </div>
        <div className={css.Mother}>
          <div>
            <Text className={css.GroupText} h4>
              Age
            </Text>
          </div>
          <form action="">
            <Input
              clearable
              underlined
              placeholder="Write an age"
              type="number"
              size={isMobile ? "xl" : "sm"}
              width="20vw"
              {...register("age")}
            />
          </form>
        </div>
        <div className={css.Mother}>
          <div>
            <Text className={css.GroupText} h4>
              Phone
            </Text>
          </div>
          <form action="">
            <Input
              clearable
              underlined
              placeholder="Write a phone number"
              type="text"
              size={isMobile ? "xl" : "sm"}
              width="20vw"
              {...register("phone")}
            />
          </form>
        </div>
      </div>
      <div className={css.Wrap2}>
        <div className={css.Mother}>
          <div>
            <Text className={css.GroupText} h4>
              Course format
            </Text>
          </div>
          <Dropdown>
            <Dropdown.Button
              flat
              color="warning"
              size={isMobile ? "xl" : "sm"}
              css={
                isMobile
                  ? { tt: "capitalize", height: "4vh", width: "20vw" }
                  : { tt: "capitalize", height: "4vh" }
              }
              auto
            >
              {selectedValueCourseFormat}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="warning"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedCourseFormat}
              //@ts-ignore
              onSelectionChange={(selected) => {
                // @ts-ignore
                setSelectedCourseFormat(selected);
                // @ts-ignore
                register("course_format", { value: selected.anchorKey });
              }}
            >
              <Dropdown.Item key="static">static</Dropdown.Item>
              <Dropdown.Item key="online">online</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={css.Mother}>
          <div>
            <Text className={css.GroupText} h4>
              Course
            </Text>
          </div>
          <Dropdown>
            <Dropdown.Button
              flat
              color="warning"
              css={
                isMobile
                  ? { tt: "capitalize", height: "4vh", width: "20vw" }
                  : { tt: "capitalize", height: "4vh" }
              }
              auto
            >
              {selectedValueCourse}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="warning"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedCourse}
              //@ts-ignore
              onSelectionChange={(selected) => {
                // @ts-ignore
                setSelectedCourse(selected);
                // @ts-ignore
                register("course", { value: selected.anchorKey });
              }}
            >
              <Dropdown.Item key="FS">FS</Dropdown.Item>
              <Dropdown.Item key="QACX">QACX</Dropdown.Item>
              <Dropdown.Item key="JSCX">JSCX</Dropdown.Item>
              <Dropdown.Item key="FE">FE</Dropdown.Item>
              <Dropdown.Item key="PCX">PCX</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={css.Mother}>
          <div>
            <Text className={css.GroupText} h4>
              Course type
            </Text>
          </div>
          <Dropdown>
            <Dropdown.Button
              flat
              color="warning"
              css={
                isMobile
                  ? { tt: "capitalize", height: "4vh", width: "20vw" }
                  : { tt: "capitalize", height: "4vh" }
              }
              auto
            >
              {selectedValueCourseType}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="warning"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedCourseType}
              //@ts-ignore
              onSelectionChange={(selected) => {
                // @ts-ignore
                setSelectedCourseType(selected);
                // @ts-ignore
                register("course_type", { value: selected.anchorKey });
              }}
            >
              <Dropdown.Item key="pro">Pro</Dropdown.Item>
              <Dropdown.Item key="minimal">Minimal</Dropdown.Item>
              <Dropdown.Item key="premium">Premium</Dropdown.Item>
              <Dropdown.Item key="incubator">Incubator</Dropdown.Item>
              <Dropdown.Item key="vip">Vip</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Spacer y={3} />
      <div className={css.Comments}>
        {visibleComments.map((comment): any => {
          return (
            <Comment key={comment._id} comment={comment} user={comment.user} />
          );
        })}
      </div>
      <Spacer y={1} />
      <div className={css.ButtonDiv}>
        <Button
          shadow
          color="success"
          className={css.Submit}
          auto
          type="submit"
        >
          Submit
        </Button>
      </div>
      <Snackbar
        open={orderUpdated}
        autoHideDuration={6000}
        onClose={() => setOrderUpdated(false)}
      >
        <Alert
          onClose={() => setOrderUpdated(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Order updated successfully
        </Alert>
      </Snackbar>
    </form>
  );
};

export default OrderEditPc;
