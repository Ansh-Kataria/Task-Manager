// import React from 'react';
// import TaskDistribution from './TaskDistribution';
// import CompletionRate from './CompletionRate';
// import UpcomingDeadlines from './UpcomingDeadlines';
// import { Row, Col } from 'antd';

// const Dashboard = () => {
//     return (
//         <div style={{ padding: '24px' }}>
//             <Row gutter={16}>
//                 <Col span={8}>
//                     <TaskDistribution />
//                 </Col>
//                 <Col span={8}>
//                     <CompletionRate />
//                 </Col>
//                 <Col span={8}>
//                     <UpcomingDeadlines />
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default Dashboard;

import React from 'react';
import TaskDistribution from './TaskDistribution';
import CompletionRate from './CompletionRate';
import UpcomingDeadlines from './UpcomingDeadlines';

const Dashboard = () => {
    return (
        <div style={{
            padding:'32px'
        }}>
            <h1>Dashboard</h1>
            <div style={{
                display:'flex',
                justifyContent:'space-between',
                
            }}>
                <TaskDistribution />
                <CompletionRate />
                <UpcomingDeadlines />
            </div>
        </div>
    );
};

export default Dashboard;
