import { useState } from "react";

// visar schemat för vald månad 
const AdminViewSchedule = ({ schedule, loading, users, onUpdatedTask }) => {

    const [editingTask, setEditingTask] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState("");


    if (loading) {
        return (
            <div className="p-8 text-center text-sm font-medium text-sky-900 animate-pulse">Uppdaterar schemat..</div>
        );
    }

    if (schedule.length === 0) {
        return (
            <div className="p-8 text-center text-sm border-2 border-dashed border-sky-100 rounded-xl text-sky-700 max-w-4xl mx-auto bg-white">
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

    // sparar när admin gjort ändringar för ett pass - lagt till en användare på ett specifikt pass t.ex.
    const handleSave = () => {
        if (!selectedUserId) return;

        onUpdatedTask(editingTask._id, selectedUserId, "ADD");

        setEditingTask(null);
        setSelectedUserId("");
    };

    // ta bort en person från ett pass
    const handleRemoveUser = (userId) => {
        onUpdatedTask(editingTask._id, userId, "remove");
        setEditingTask(null);
        setSelectedUserId("");
    };

    return (
        <>
            <div className="max-w-4xl mx-auto px-2 py-4 sm:px-4">
                <div className="space-y-4">
                    {Object.keys(groupedSchedule).map((dateKey) => {
                        const entries = groupedSchedule[dateKey];
                        const dateObj = new Date(entries[0].date);

                        return (
                            <div key={dateKey} className="flex flex-col md:flex-row border border-sky-100 rounded-xl overflow-hidden shadow-sm bg-white">
                                <div className="p-4 flex flex-row md:flex-col justify-center items-center gap-2 md:gap-0 md:w-32 bg-sky-950 text-white border-b md:border-b-0 md:border-r border-sky-900">
                                    <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                                        {dateObj.toLocaleDateString('sv-SE', { weekday: 'short' })}
                                    </span>
                                    <span className="text-2xl md:text-3xl font-extrabold leading-none md:my-1">
                                        {dateObj.getDate()}
                                    </span>
                                    <span className="text-xs text-sky-200 font-medium">
                                        {dateObj.toLocaleDateString('sv-SE', { month: 'short' })}
                                    </span>
                                </div>

                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-sky-100">
                                    {entries.map((entry) => (
                                        <div key={entry._id} className="p-4 flex flex-col justify-between items-start gap-4 hover:bg-sky-50/30 transition-colors">
                                            <div className="w-full">
                                                <div className="text-[10px] font-bold uppercase tracking-wider text-sky-600 mb-1">
                                                    {entry.taskType}
                                                </div>
                                                <div className="text-sm text-slate-800 font-medium">
                                                    {entry.users.length > 0 ? (
                                                        entry.users.map(u => u.firstName).join(", ")
                                                    ) : (
                                                        <span className="text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded text-xs inline-block font-semibold">Obemannat</span>
                                                    )}
                                                </div>
                                            </div>

                                            <button onClick={() => setEditingTask(entry)} className="text-xs bg-sky-50 hover:bg-sky-900 text-sky-800 hover:text-white font-bold py-1.5 px-3 rounded-lg border border-sky-200 hover:border-sky-900 transition-all duration-150 shadow-2xs active:scale-95">
                                                {entry.users.length > 0 ? "Ändra" : "Tillsätt"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {editingTask && (
                <div className="fixed inset-0 bg-sky-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl border border-sky-100 animate-in fade-in zoom-in-95 duration-150">
                        <h3 className="text-base font-bold text-sky-950 mb-1">Hantera stallpass</h3>
                        <p className="text-xs text-slate-500 mb-4">Tilldelade personer
                            <span className="font-bold text-sky-800 uppercase text-[11px]">
                                {editingTask.taskType}</span>
                            den {new Date(editingTask.date).toLocaleDateString('sv-SE')}
                        </p>

                        <div className="mb-4 space-y-1.5">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tilldelade personer:</label>
                            {editingTask.users && editingTask.users.length > 0 ? (
                                editingTask.users.map(user => (
                                    <div key={user._id} className="flex justify-between items-center bg-sky-50/50 p-2.5 rounded-xl border border-sky-100 text-sm font-medium text-sky-900">
                                        <span>{user.firstName} {user.lastName}</span>
                                        <button onClick={() => handleRemoveUser(user._id)} className="text-red-500 hover:bg-red-50 p-1 rounded-md transition-colors font-bold text-xs w-6 h-6 flex items-center justify-center" title="Ta bort från pass">
                                            X
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-slate-400 italic bg-slate-50 p-2.5 rounded-xl text-center border border-dashed">Ingen har tilldelats</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Lägg till person:</label>
                            <select
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                className="w-full border border-sky-200 p-2.5 rounded-xl text-sm bg-white text-slate-700 focus:outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10 transition-all font-medium"
                            >
                                <option value="">-- Välj hästägare --</option>
                                {users && users.map(user => (
                                    <option key={user._id} value={user._id}>
                                        {user.firstName} {user.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end gap-2 text-xs font-bold">
                            <button onClick={() => { setEditingTask(null); setSelectedUserId(""); }} className="px-4 py-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
                                Stäng
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={selectedUserId === ""}
                                className="px-4 py-2.5 bg-sky-950 hover:bg-sky-900 text-white rounded-xl disabled:opacity-30 disabled:hover:bg-sky-950 transition-all">
                                Lägg till
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
};

export default AdminViewSchedule;