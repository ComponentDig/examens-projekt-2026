

const UserViewSchedule = ({ schedule, loading }) => {
    if (loading) {
        return <div className="p-4 text-center text-gray-500">Laddar in schemat..</div>;
    }

    // visar en ruta om att inget schema finns om admin inte genererat det än
    if (!schedule || schedule.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500 italic bg-white rounded-xl border">Inget schema finns ännu</div>
        )
    }

    const taskOrder = { 'Utsläpp': 1, 'Insläpp': 2, 'Kvällsfodring': 3 };

    // sortering av schemat 
    // efter datum och passtyp
    const sortedSchedule = [...schedule].sort((a, b) => {
        const dateDiff = new Date(a.date) - new Date(b.date);
        if (dateDiff !== 0) return dateDiff;
        return (taskOrder[a.taskType] || 99) - (taskOrder[b.taskType] || 99);
    });

    // gruppering ac schema efter datum
    const groupedSchedule = sortedSchedule.reduce((acc, entry) => {

        if (!entry || !entry.date) return acc;
        
        const dateKey = new Date(entry.date).toDateString();

        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }

        acc[dateKey].push(entry);
        return acc;
    }, {});

    return (
        <>
            <div className="space-y-4">
                {Object.keys(groupedSchedule).map((dateKey) => {
                    const entries = groupedSchedule[dateKey];
                    const dateObj = new Date(entries[0].date);

                    return (
                        <div key={dateKey} className="flex flex-col md:flex-row border rounded-xl overflow-hidden shadow-sm bg-white border-secondarycolor">
                            <div className="p-4 flex flex-col justify-center items-center md:w-32 border-b md:border-0 md:border-r bg-primarybgcolor border-secondarycolor">
                                <span className="">
                                    {dateObj.toLocaleDateString('sv-SE', { weekday: 'short' })}
                                </span>
                                <span className="">
                                    {dateObj.getDate()}
                                </span>
                                <span className="">
                                    {dateObj.toLocaleDateString('sv-SE', { month: 'short' })}
                                </span>
                            </div>

                            <div className="">
                                {entries.map((entry) => (
                                    <div key={entry._id} className="">
                                        <div>
                                            <div className="">
                                                {entry.taskType}
                                            </div>
                                            <div className="">
                                                {entry.users && entry.users.length > 0 ? (
                                                    entry.users.map(u => `${u.firstName} ${u.lastName}`).join(", ")
                                                ) : (
                                                    <span className="">Obemannat</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )
                })}
            </div>
        </>
    )

}
export default UserViewSchedule;