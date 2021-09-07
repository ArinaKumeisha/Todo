import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Task, TaskPropsType } from './Task';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Example/Task',
    component: Task,
} as Meta<typeof Task>;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;
let arg = {
    changeTaskStatus: action('change status'),
    changeTaskTitle: action('change title'),
    removeTask: action('remove task'),

};
export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
   ...arg,
    task: {id: '1', isDone: true, title: 'JS'},
    todolistId:'todolistId1'
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
   ...arg,
    task: {id: '1', isDone: false, title: 'JS'},
    todolistId:'todolistId1'
};

