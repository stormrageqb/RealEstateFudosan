import React, { useEffect, useState } from 'react';
import axios from 'axios';

import DashboardEyeCatch from './DashboardEyeCatch';
import DashboardFeedbackBoard from './DashboardFeedbackBoard';
import DashboardFAQPage from './DashboardFAQBoard';
import DashboardRealEstatePostBoard from './DashboardRealEstatePostBoard';
import Loading from "../../components/Loading"

const DashboardPage = () => {

    const [realEstates, setRealEstates] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = new URLSearchParams({
                    firstNumber: '1',
                    lastNumber: '16'
                }).toString();
                const res = await axios.get(`/getRealEstates?${params}`);
                setRealEstates(res.data);
            
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    },[]);

    if(realEstates === null) {
        return (
            <div>
                <Loading />
            </div>
        )
    }

    return (
        <div className='flex flex-col w-full'>
            <DashboardEyeCatch/>
            <DashboardRealEstatePostBoard realEstates = {realEstates}/>
            <DashboardFAQPage/>
            <DashboardFeedbackBoard/>
        </div>
    )
}

export default DashboardPage;