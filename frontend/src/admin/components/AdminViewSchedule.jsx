
// visar schemat för vald månad 
const AdminViewSchedule = ({ schedule, loading }) => {

    if (loading) {
        return (
            <div className="p-4 text-center">Uppdaterar schemat..</div>
        );
    }

    if (schedule.length === 0) {
        return (
            <div className="p-4 text-center">
                Inget schema finns. Använd knappen ovanför för att skapa ett.
            </div>
        );
    }

// grupperat schemat efter datum
    const groupedSchedule = schedule.reduce((acc, entry) => {
        const dateKey = new Date(entry.date).toDateString();
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(entry);
        return acc;
    }, {});


    return (
        <>
            <div className="max-w-4xl mx-auto p-4">
                <div className="space-y-4">
                    {Object.keys(groupedSchedule).map((dateKey) => {
                        const entries = groupedSchedule[dateKey];
                        const dateObj = new Date(entries[0].date);

                        return (
                            <div key={dateKey} className="flex felx-col md:flex-row border rounded-lg overflow-hidden shadow-sm">
                                <div className="p-4 flex flex-col justify-center items-center md:w-32 border-b md:border-b-0 md:border-r">
                                    <span className="text-sm font-semibold uppercase">
                                        {dateObj.toLocaleDateString('sv-SE', { weekday: 'short' })}
                                    </span>
                                    <span className="text-2xl font-bold">
                                        {dateObj.getDate()}
                                    </span>
                                    <span className="text-xs">
                                        {dateObj.toLocaleDateString('sv-SE', { month: 'short' })}
                                    </span>
                                </div>

                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x">
                                    {entries.map((entry) => (
                                        <div key={entry._id} className="p-4 flex flex-col justify-center">
                                            <div className="text-xs font-bold uppercase mb-1">
                                                {entry.taskType}
                                            </div>
                                            <div className="text-sm">
                                                {entry.users.length > 0 ? entry.users.map(u => `${u.firstName}`).join(', ') : <span className="text-red-400 italic">Obemannat</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default AdminViewSchedule;