import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
    title: "EditableSpan Component",
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

const callback = action("span wants to change")

export const EditableSpanExample = Template.bind({})

EditableSpanExample.args = {
    c1: callback,
    title: "Double"
}