

const AdminViewSchedule = ({ schedule, loading }) => {
    // if (loading) return <div className="">Genererar schema</div>;
    // if (error) return <div className="">{error}</div>;


    if (loading) {
        return (
            <div className="">Uppdaterar schemat..</div>
        );
    }

    if (schedule.length === 0) {
        return (
            <div className="">
                <p className="">Inget schema finns. Använd knappen ovanför för att skapa ett.</p>
            </div>
        );
    }


    return (
        <>
            <div className="">
                <div className="">
                    {schedule.map((entry) => (
                        <div key={entry._id} className="">
                            <div className="">
                                <div className="">
                                    <div className="">
                                        {new Date(entry.date).toLocaleDateString('sv-SE', { weekday: 'short' })}
                                    </div>
                                    <div className="">
                                        {new Date(entry.date).getDate()}
                                    </div>
                                </div>
                                <div>
                                    <div className="">
                                        {entry.taskType}
                                    </div>
                                    <div className="">
                                        {entry.users.map(u => `${u.firstName} ${u.lastName}`).join(', ') || 'Obemannat'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AdminViewSchedule;