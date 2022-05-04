import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { ApiGet, ApiPost, ApiPut } from '../../Helpers/API/ApiData'
import { taskAtom, tasksAtom } from '../Atoms/TaskAtoms/Atoms'

function TaskActions() {

    const setTasks = useSetRecoilState(tasksAtom);
    const task = useRecoilValue(taskAtom)

    function getAllTasks() {
        ApiGet("dev/tasks/")
            .then((res) => {
                res.data.data.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)
                setTasks(res.data.data)
            })
            .catch((error) => {
                console.log("Error :", error);
            })
    }

    function addTask() {
        const data = {
            description: task.description,
            title: task.title,
            taskStatus: task.taskStatus
        }
        ApiPost("dev/tasks/", data)
            .then((res) => {
                getAllTasks()
            })
            .catch((error) => {
                console.log("Error :", error);
            })
    }

    async function updateTask() {
        try {
            await ApiPut("dev/tasks/" + task.id, task)
            getAllTasks()
        } catch (error) {
            console.log("Error :", error);
        }

    }

    return {
        getAllTasks,
        addTask,
        updateTask,
        resetUser: useResetRecoilState(taskAtom)
    }
}

export { TaskActions }