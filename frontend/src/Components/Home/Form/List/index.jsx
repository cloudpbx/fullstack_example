import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TaskActions } from '../../../../Store/Actions/task.actions';
import { taskAtom, tasksAtom } from '../../../../Store/Atoms/TaskAtoms/Atoms';
import { Button, Table } from 'reactstrap'
import Create from '../Create/index.jsx';

const List = () => {

    const tasks = useRecoilValue(tasksAtom)
    const taskActions = TaskActions()
    const setTask = useSetRecoilState(taskAtom);
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    // eslint-disable-next-line
    useEffect(() => {
        taskActions.getAllTasks()
    }, [])

    return (
        <>
            <div className='d-flex justify-content-between heading space mb-2'>
                <h2 className=''>
                    Tasks List
                </h2>
                <Button
                    color="primary"
                    onClick={(e) => {
                        setIsAdd(true)
                    }}
                >
                    Add
                </Button>
            </div>
            {isAdd &&
                <div>
                    <Create setIsAdd={setIsAdd} isEdit={isEdit} setIsEdit={setIsEdit} />
                </div>}
            <div>
                <Table responsive striped bordered>
                    <thead>
                        <tr>
                            <th>
                                Title
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Task Status
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length === 0 ?
                            <tr>
                                No Tasks Found
                            </tr>

                            :
                            <>
                                {tasks.map((task) => {
                                    return (
                                        <tr>
                                            <th scope="row">
                                                {task.title}
                                            </th>
                                            <td>
                                                {task.description}
                                            </td>
                                            <td>
                                                {task.taskStatus}
                                            </td>
                                            <td>
                                                <Button
                                                    color="primary"
                                                    onClick={() => {
                                                        setTask(task)
                                                        setIsAdd(true)
                                                        setIsEdit(true)
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </>
                        }

                    </tbody>
                </Table>
            </div>

        </>
    )
}

export default List