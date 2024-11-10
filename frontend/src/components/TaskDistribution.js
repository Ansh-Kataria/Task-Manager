// import React, { useState, useEffect } from 'react';

// const TaskDistribution = () => {
//     const [distributionData, setDistributionData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://localhost:5001/api/analytics/taskdistribution');
//                 const data = await response.json();
//                 setDistributionData(data);
//             } catch (error) {
//                 console.error('Error fetching task distribution:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div>
//             <h2>Task Distribution</h2>
//             {distributionData.length > 0 ? (
//                 <ul>
//                     {distributionData.map((item) => (
//                         <li key={item._id}>
//                             {item._id}: {item.count}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No data available.</p>
//             )}
//         </div>
//     );
// };

// export default TaskDistribution;

import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,  // Arc element for Pie/Doughnut charts
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TaskDistribution = () => {
    const [distributionData, setDistributionData] = useState({
        labels: [],
        datasets: [{
            label: 'Task Distribution by Priority',
            data: [],
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
        }]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/analytics/taskdistribution');
                const data = await response.json();

                console.log(data)

                if (data && data.length > 0) {
                    const labels = data.map(item => item._id);
                    const counts = data.map(item => item.count);



                    setDistributionData({
                        labels,
                        datasets: [{
                            label: 'Task Distribution by Priority',
                            data: counts,
                            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
                        }]
                    });
                } else {
                    console.warn('No data received');
                }
            } catch (error) {
                console.error('Error fetching task distribution:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Task Distribution</h2>
            {distributionData.labels.length > 0 ? (
                <>
                    <div style={{
                        width:'100%',
                        height:'100%'
                    }} >

                        <Pie data={distributionData} />
                    </div>
                </>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default TaskDistribution;
