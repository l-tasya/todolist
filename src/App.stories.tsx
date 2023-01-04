import {ComponentMeta, ComponentStory} from "@storybook/react";
import {App} from "./App";
import React from "react";
import {ReduxStoreProviderDecorator} from "./common/stories/ReduxStoreProviderDecorator";


export default {
    title: "App Component",
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>


const Template: ComponentStory<typeof App> = () => <App/>


export const App1 = Template.bind({})
App1.args = {}