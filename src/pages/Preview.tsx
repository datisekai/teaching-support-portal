import React from 'react'
import { useParams } from 'react-router-dom';
import MyTable from '../components/UI/MyTable';
import MyCard from '../components/UI/MyCard';
import MyTabs from '../components/UI/MyTabs';
import MyCalendar from '../components/UI/MyCalendar';
import { products, productSchemas } from '../dataTable/productsTable';

const componentMapping = {
    MyTable,
    MyCard,
    MyTabs,
    MyCalendar
}

const Preview = () => {
    const { componentName = "MyTable" } = useParams()

    const Component = (componentMapping as any)[componentName] || MyTable
    return <Component />;
}

export default Preview