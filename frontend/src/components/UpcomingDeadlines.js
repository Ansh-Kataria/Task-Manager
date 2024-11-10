import React, { useState, useEffect } from 'react';

const UpcomingDeadlines = () => {
    const [upcomingTasks, setUpcomingTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/analytics/upcomingdeadlines');
                const data = await response.json();
                setUpcomingTasks(data);
            } catch (error) {
                console.error('Error fetching upcoming deadlines:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Upcoming Deadlines</h2>
            {upcomingTasks.length > 0 ? (
                <ul>
                    {upcomingTasks.map((task) => (
                        <li key={task._id}>
                            {task.name} - Due: {new Date(task.dueDate).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No upcoming tasks.</p>
            )}
        </div>
    );
};

export default UpcomingDeadlines;
