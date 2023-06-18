import React, {FC, useEffect, useMemo, useState} from 'react';
import {Button, Dropdown, Input, Modal, Spacer, Text} from "@nextui-org/react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks";
import {groupActions} from "../../redux/slice/group.slice";
import GroupAdd from "../Groups/GroupEdit";
import css from './styles/order-edit.module.css'
import {SubmitHandler, useForm} from "react-hook-form";
import {IOrder} from "../../interfaces/order.interface";
import {orderActions} from "../../redux/slice/order.slice";
import {useParams} from "react-router-dom";

const OrderEdit: FC = () => {
    const [selectedGroup, setSelectedGroup] = useState(new Set(["Select"]));
    const [selectedStatus, setSelectedStatus] = useState(new Set(["Select"]));
    const [selectedCourse, setSelectedCourse] = useState(new Set(["Select"]));
    const [selectedCourseFormat, setSelectedCourseFormat] = useState(new Set(["Select"]));
    const [selectedCourseType, setSelectedCourseType] = useState(new Set(["Select"]));

    const {groups, trigger} = useAppSelector(state => state.groupReducer);
    const dispatch = useAppDispatch()
    const [visible, setVisible] = React.useState(false);
    const {orderId} = useParams();

    const {handleSubmit, register, setValue} = useForm<IOrder>();
    const {orderForUpdate} = useAppSelector(state => state.orderReducer);
    console.log(orderForUpdate);

    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
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

    useEffect(() => {
        dispatch(groupActions.getAll())

        if (orderForUpdate) {
            setValue('age', orderForUpdate.age)
            setValue('sum', orderForUpdate.sum)
            setValue('name', orderForUpdate.name)
            setValue('email', orderForUpdate.email)
            setValue('already_paid', orderForUpdate.already_paid)
            setValue('course', orderForUpdate.course)
            setValue('course_format', orderForUpdate.course_format)
            setValue('phone', orderForUpdate.phone)
            setValue('status', orderForUpdate.status)
            setValue('surname', orderForUpdate.surname)
            setValue('course_type', orderForUpdate.course_type)
            setValue('group', orderForUpdate.group)
        }

    }, [dispatch, orderForUpdate, setValue, trigger])

    const update: SubmitHandler<IOrder> = async (order) => {
        dispatch(orderActions.update({id: orderId, order}))
    };

    return (
        <div>
            <form onSubmit={handleSubmit(update)}>
                <div className={css.Wrap}>
                    <div className={css.Mother}>
                        <div>
                            <Text className={css.GroupText} h4>Group</Text>
                        </div>
                        <div>
                            <Dropdown>
                                <Dropdown.Button flat color="warning" css={{ tt: "capitalize", height: "4vh" }} auto>
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
                                        register('group', { value: selected.anchorKey });
                                    }}
                                >
                                    {groups.map(group =>
                                        <Dropdown.Item key={group.title}>{group.title}</Dropdown.Item>)
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div>
                            <Button onPress={handler} className={css.Button} auto css={{height: "3vh"}}>Add Group</Button>
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
                                    <GroupAdd/>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                    <div className={css.Mother}>
                        <div>
                            <Text className={css.GroupText} h4>Status</Text>
                        </div>
                        <div>
                            <Dropdown>
                                <Dropdown.Button flat color="warning" css={{ tt: "capitalize", height: "4vh" }} auto>
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
                                        register('status', { value: selected.anchorKey });
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
                </div>
                <div className={css.Wrap2}>
                    <div className={css.Mother}>
                        <div>
                            <Text className={css.GroupText} h4>Name</Text>
                        </div>
                        <form action="">
                            <Input
                                clearable
                                underlined
                                initialValue="Stefan"
                                width="30vw"
                                {...register('name')}
                            />
                        </form>
                    </div>
                    <div className={css.Mother}>
                        <div>
                            <Text className={css.GroupText} h4>Sum</Text>
                        </div>
                        <form action="">
                            <Input
                                clearable
                                underlined
                                initialValue="2000"
                                type="number"
                                width="30vw"
                            />
                        </form>
                    </div>
                </div>
                <div className={css.Wrap2}>
                    <div className={css.Mother}>
                        <div>
                            <Text className={css.GroupText} h4>Surname</Text>
                        </div>
                        <form action="">
                            <Input
                                clearable
                                underlined
                                initialValue="Samokhval"
                                type="text"
                                width="30vw"
                            />
                        </form>
                    </div>
                    <div className={css.Mother}>
                        <div>
                            <Text className={css.GroupText} h4>Already paid</Text>
                        </div>
                        <form action="">
                            <Input
                                clearable
                                underlined
                                initialValue="2000"
                                type="number"
                                width="30vw"
                            />
                        </form>
                    </div>
                </div>

                <Spacer y={1}/>

                <div className={css.Wrap2}>
                    <div className={css.Mother}>
                        <div>
                            <Text className={css.GroupText} h4>Email</Text>
                        </div>
                        <form action="">
                            <Input
                                clearable
                                underlined
                                initialValue="testmail@gmail.com"
                                type="text"
                                width="30vw"
                            />
                        </form>
                    </div>
                    <div className={css.Mother}>
                        <div>
                            <Text className={css.GroupText} h4>Course</Text>
                        </div>
                        <Dropdown>
                            <Dropdown.Button flat color="warning" css={{ tt: "capitalize", height: "4vh" }} auto>
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
                                    register('course', { value: selected.anchorKey });
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
                </div>
                <div className={css.Wrap2}>
                    <div className={css.Mother}>
                        <div>
                            <Text className={css.GroupText} h4>Phone</Text>
                        </div>
                        <form action="">
                            <Input
                                clearable
                                underlined
                                initialValue="+380675555555"
                                type="text"
                                width="30vw"
                            />
                        </form>
                    </div>
                    <div className={css.Mother}>
                        <div>
                            <Text className={css.GroupText} h4>Course format</Text>
                        </div>
                        <Dropdown>
                            <Dropdown.Button flat color="warning" css={{ tt: "capitalize", height: "4vh" }} auto>
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
                                    register('course_format', { value: selected.anchorKey });
                                }}
                            >
                                <Dropdown.Item key="static">static</Dropdown.Item>
                                <Dropdown.Item key="online">online</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className={css.Wrap2}>
                    <div className={css.Mother}>
                        <div>
                            <Text className={css.GroupText} h4>Age</Text>
                        </div>
                        <form action="">
                            <Input
                                clearable
                                underlined
                                initialValue="18"
                                type="number"
                                width="30vw"
                            />
                        </form>
                    </div>
                    <div className={css.Mother}>
                        <div>
                            <Text className={css.GroupText} h4>Course type</Text>
                        </div>
                        <Dropdown>
                            <Dropdown.Button flat color="warning" css={{ tt: "capitalize", height: "4vh" }} auto>
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
                                    register('course_type', { value: selected.anchorKey });
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
                <div className={css.ButtonDiv}>
                    <Button shadow color="success" className={css.Submit} auto type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default OrderEdit;
