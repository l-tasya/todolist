import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
    title: "Task Component",
    component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

const changeTaskTitleAction = action("Title changed")
const changeCheckBoxAction = action("Checkbox changed")
const removeTaskAction = action('Task removed')

export const Task1 = Template.bind({})

Task1.args = {
    todoID:'TODO1',
    id: '1',
    title: 'REACT',
    isDone: false,

    changeTaskTitle: changeTaskTitleAction,
    changeCheckBox:changeCheckBoxAction,
    removeTask: removeTaskAction,
}