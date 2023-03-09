import {AddItem} from "./AddItem";
import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: "AddItem Component",
    component: AddItem,
} as ComponentMeta<typeof AddItem>;

const Template: ComponentStory<typeof AddItem> = (args) => <AddItem {...args}/>

const callback = action('Key: "Enter" was pressed to add: ')

export const FirstStory = Template.bind({})

FirstStory.args = {
    addItem: callback
}