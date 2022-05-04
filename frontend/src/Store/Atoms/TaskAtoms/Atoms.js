import { atom } from 'recoil'

const tasksAtom = atom({
    key: "tasksAtom",
    default: []
});

const taskAtom = atom({
    key: "taskAtom",
    default: {
        description: "",
        createdAt: 0,
        id: "",
        title: "",
        taskStatus: "",
        updatedAt: 0
    }
});

export {
    tasksAtom,
    taskAtom
}