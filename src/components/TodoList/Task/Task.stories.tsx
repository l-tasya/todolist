import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import { TaskPriorities, TaskStatuses } from "../../../common/types/types";

export default {
    title: "Task Component",
    component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

const changeTaskTitleAction = action("Title changed")
const changeStatusAction = action("Checkbox changed")
const removeTaskAction = action("Task removed")

export const Task1 = Template.bind({})

Task1.args = {
    todoID: "TODO1",
    task: {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low
    },

    changeTaskTitle: changeTaskTitleAction,
    changeStatus: changeStatusAction,
    removeTask: removeTaskAction,
}