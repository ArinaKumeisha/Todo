import React from 'react';
import { ComponentStory, ComponentMeta, Meta, Story } from '@storybook/react';
import {action} from '@storybook/addon-actions'
import AppWithRedux from './AppWithRedux'
import {ReduxStoreProviderDecorator, storyBookStore } from '../stories/Decorators/ReduxStoreProviderDecorator';
import { Provider } from 'react-redux';

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = (args) =><AppWithRedux/>
export const AppWithReduxExample = Template.bind({});


