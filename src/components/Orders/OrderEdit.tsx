import React, {FC, useEffect, useMemo, useState} from 'react';
import {Button, Dropdown, Input, Modal, Spacer, Text} from "@nextui-org/react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks";
import {groupActions} from "../../redux/slice/group.slice";
import GroupAdd from "../Groups/GroupEdit";
import css from './styles/order-edit.module.css'

const OrderEdit: FC = () => {
    const [selected, setSelected] = useState(new Set(["Select"]));
    const {groups, trigger} = useAppSelector(state => state.groupReducer);
    const dispatch = useAppDispatch()
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    const selectedValue = useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );

    useEffect(() => {
        dispatch(groupActions.getAll())
    }, [dispatch, trigger])

    return (
        <div>
            <div>
                <div className={css.Wrap}>
                    <div className={css.Mother}>
                        <div>
                            <Text className={css.GroupText} h4>Group</Text>
                        </div>
                        <div>
                            <Dropdown>
                                <Dropdown.Button flat color="warning" css={{ tt: "capitalize", height: "4vh" }} auto>
                                    {selectedValue}
                                </Dropdown.Button>
                                <Dropdown.Menu
                                    aria-label="Single selection actions"
                                    color="warning"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selected}
                                    //@ts-ignore
                                    onSelectionChange={setSelected}
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
                                    {selectedValue}
                                </Dropdown.Button>
                                <Dropdown.Menu
                                    aria-label="Single selection actions"
                                    color="warning"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selected}
                                    //@ts-ignore
                                    onSelectionChange={setSelected}
                                >
                                    {groups.map(group =>
                                        <Dropdown.Item key={group.title}>{group.title}</Dropdown.Item>)
                                    }
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
                                {selectedValue}
                            </Dropdown.Button>
                            <Dropdown.Menu
                                aria-label="Single selection actions"
                                color="warning"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selected}
                                //@ts-ignore
                                onSelectionChange={setSelected}
                            >
                                {groups.map(group =>
                                    <Dropdown.Item key={group.title}>{group.title}</Dropdown.Item>)
                                }
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
                                {selectedValue}
                            </Dropdown.Button>
                            <Dropdown.Menu
                                aria-label="Single selection actions"
                                color="warning"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selected}
                                //@ts-ignore
                                onSelectionChange={setSelected}
                            >
                                {groups.map(group =>
                                    <Dropdown.Item key={group.title}>{group.title}</Dropdown.Item>)
                                }
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
                                {selectedValue}
                            </Dropdown.Button>
                            <Dropdown.Menu
                                aria-label="Single selection actions"
                                color="warning"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selected}
                                //@ts-ignore
                                onSelectionChange={setSelected}
                            >
                                {groups.map(group =>
                                    <Dropdown.Item key={group.title}>{group.title}</Dropdown.Item>)
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderEdit;
