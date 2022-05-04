import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TaskActions } from '../../../../Store/Actions/task.actions';
import { taskAtom } from '../../../../Store/Atoms/TaskAtoms/Atoms';
import { Button, Input } from 'reactstrap'
import "./Home.scss"

function Create({ setIsAdd, isEdit, setIsEdit }) {

    const task = useRecoilValue(taskAtom)
    const taskActions = TaskActions()
    const setTask = useSetRecoilState(taskAtom);

    return (
        <>
            <div className='heading space '>
                <div className='py-3'>
                    <h3>Add Task</h3>
                    <div className=' py-2'>
                        <Input
                            className='input'
                            type="text"
                            value={task.title}
                            placeholder="Enter Title"
                            onChange={(e) => setTask({ ...task, "title": e.target.value })}
                        />

                    </div>
                    <div className=' py-2'>
                        <Input
                            className='input'
                            type="text"
                            value={task.description}
                            placeholder="Enter Description"
                            onChange={(e) => setTask({ ...task, "description": e.target.value })}
                        />
                    </div>
                    {isEdit && <div className=' py-2'>
                        <Input
                            className='input'
                            type="select"
                            value={task.taskStatus}
                            placeholder="Enter Description"
                            onChange={(e) => setTask({ ...task, "taskStatus": e.target.value })}
                        >
                            <option value={"completed"}>
                                Completed
                            </option>
                            <option value={"pending"}>
                                Pending
                            </option>
                        </Input>
                    </div>}
                    <div className='mt-5'>
                        <Button
                            className='mx-2'
                            color="primary"
                            onClick={() => {
                                isEdit ?
                                    taskActions.updateTask()
                                    :
                                    taskActions.addTask()
                                taskActions.resetUser()
                                setIsAdd(false)
                                setIsEdit(false)
                            }}
                        >
                            {isEdit ? "Save" : "Add"}
                        </Button>
                        <Button
                            color="danger"
                            onClick={(e) => {
                                taskActions.resetUser()
                                setIsEdit(false)
                                setIsAdd(false)
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Create