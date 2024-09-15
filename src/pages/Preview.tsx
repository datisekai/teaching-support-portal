import React from 'react'
import { useParams } from 'react-router-dom';
import MyTable from '../components/UI/MyTable';
import MyButton from '../components/UI/MyButton';
import MyCard from '../components/UI/MyCard';
import MyTabs from '../components/UI/MyTabs';
import MyToast from '../components/UI/MyToast';
import MyCalendar from '../components/UI/MyCalendar';
import { products, productSchemas } from '../dataTable/products';

const componentMapping = {
    MyTable,
    MyButton,
    MyCard,
    MyTabs,
    MyToast,
    MyCalendar
}

const Preview = () => {
    const { componentName = "MyTable" } = useParams()

    const Component = (componentMapping as any)[componentName] || MyTable
    return <Component />;
}

export default Preview