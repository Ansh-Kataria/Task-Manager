// import React, { useEffect, useState } from 'react';

// const CompletionRate = () => {
//     const [completionRate, setCompletionRate] = useState({ totalTasks: 0, completedTasks: 0 });

//     useEffect(() => {
//         const fetchCompletionRate = async () => {
//             try {
//                 const response = await fetch('http://localhost:5001/api/analytics/completionrate');
//                 const data = await response.json();
//                 setCompletionRate(data);
//             } catch (error) {
//                 console.error('Error fetching completion rate:', error);
//             }
//         };
//         fetchCompletionRate();
//     }, []);

//     const rate = completionRate.totalTasks > 0
//         ? (completionRate.completedTasks / completionRate.totalTasks) * 100
//         : 0;

//     return (
//         <div>
//             <h3>Completion Rate</h3>
//             <progress value={rate} max="100"></progress>
//             <p>{rate.toFixed(2)}% completed</p>
//         </div>
//     );
// };

// export default CompletionRate;

import React, { useState, useEffect } from 'react';

const CompletionRate = () => {
    const [completionData, setCompletionData] = useState({ totalTasks: 0, completedTasks: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/analytics/completionrate');
                const data = await response.json();
                console.log(data)
                setCompletionData(data);
            } catch (error) {
                console.error('Error fetching completion rate:', error);
            }
        };

        fetchData();
    }, []);

    const completionRate = (completionData.completedTasks / completionData.totalTasks) * 100 || 0;

    return (
        <div>
            <h2>Completion Rate</h2>
            <p>Total Tasks: {completionData.totalTasks}</p>
            <p>Completed Tasks: {completionData.completedTasks}</p>
            <p>Completion Rate: {completionRate.toFixed(2)}%</p>
        </div>
    );
};

export default CompletionRate;
