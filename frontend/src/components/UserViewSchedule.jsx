const UserViewSchedule = ({ schedule, loading }) => {
    if (loading) {
        return <div className="p-4 text-center text-gray-500">Laddar in schemat..</div>;
    }

    // visar en ruta om att inget schema finns om admin inte genererat det än
    if (!schedule || schedule.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500 italic bg-white rounded-xl border border-secondarycolor">Inget schema finns ännu</div>
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
                            
                            {/* Vänsterboxen: Datum och dag */}
                            <div className="p-4 flex flex-row md:flex-col justify-center items-center gap-1.5 md:gap-0 md:w-24 border-b md:border-0 md:border-r bg-primarybgcolor border-secondarycolor text-gray-600 font-medium shrink-0">
                                <span className="text-sm md:text-xs uppercase tracking-wider">
                                    {dateObj.toLocaleDateString('sv-SE', { weekday: 'short' })}
                                </span>
                                <span className="text-xl md:text-2xl font-bold text-textprimary md:my-0.5">
                                    {dateObj.getDate()}
                                </span>
                                <span className="text-sm md:text-xs">
                                    {dateObj.toLocaleDateString('sv-SE', { month: 'short' })}
                                </span>
                            </div>

                            {/* Högerboxen: HÄR ÄR ÄNDRINGEN! Flex-1, padding (p-4) och space-y-3 gör det luftigt */}
                            <div className="flex-1 p-4 md:p-5 flex flex-col justify-center divide-y divide-secondarycolor/30 space-y-3">
                                {entries.map((entry, index) => (
                                    <div 
                                        key={entry._id} 
                                        className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-4 ${index > 0 ? 'pt-3' : ''}`}
                                    >
                                        {/* Passtyp (t.ex. Utsläpp) */}
                                        <div className="font-bold text-gray-700 text-sm sm:text-base">
                                            {entry.taskType}
                                        </div>
                                        
                                        {/* Vem som har passet */}
                                        <div className="text-sm">
                                            {entry.users && entry.users.length > 0 ? (
                                                <span className="text-textprimary font-medium">
                                                    {entry.users.map(u => `${u.firstName} ${u.lastName}`).join(", ")}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 italic">Obemannat</span>
                                            )}
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