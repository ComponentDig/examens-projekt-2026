import { useState } from "react";

// visar schemat för vald månad 
const AdminViewSchedule = ({ schedule, loading, users, onUpdatedTask }) => {

    const [editingTask, setEditingTask] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState("");


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
            <div className="max-w-4xl mx-auto p-4">
                <div className="space-y-4">
                    {Object.keys(groupedSchedule).map((dateKey) => {
                        const entries = groupedSchedule[dateKey];
                        const dateObj = new Date(entries[0].date);

                        return (
                            <div key={dateKey} className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-sm">
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
                                        <div key={entry._id} className="p-4 flex flex-col justify-between group relative">
                                            <div>
                                                <div className="text-xs font-bold uppercase mb-1">
                                                    {entry.taskType}
                                                </div>
                                                <div className="text-sm">
                                                    {entry.users.length > 0 ? (
                                                        entry.users.map(u => u.firstName).join(", ")
                                                    ) : (
                                                        <span className="text-red-400 italic">Obemannat</span>
                                                    )}
                                                </div>
                                            </div>

                                            <button onClick={() => setEditingTask(entry)} className="mt-3 text-xs bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-700 py-1 px-2 rounded border transition-colors self-start">
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
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-xl">
                        <h3 className="text-lg font-bold mb-2">Hantera stallpass</h3>
                        <p className="text-sm text-gray-500 mb-4">Tilldelade personer
                            <span className="font-semibold">
                                {editingTask.taskType}</span>
                            den {new Date(editingTask.date).toLocaleDateString('sv-SE')}
                        </p>

                        <div className="mb-4 space-y-2">
                            {editingTask.users && editingTask.users.length > 0 ? (
                                editingTask.users.map(user => (
                                    <div key={user._id} className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-200 text-sm">
                                        <span>{user.firstName} {user.lastName}</span>
                                        <button onClick={() => handleRemoveUser(user._id)} className="text-red-500 hover:text-red-700 font-medium px-1" title="Ta bort från pass">
                                            X
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400 italic">Ingen har tilldelats</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Lägg till person:</label>
                            <select
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                className="w-full border p-2 rounded text-sm bg-white"
                            >
                                <option value="">-- Välj hästägare --</option>
                                {users && users.map(user => (
                                    <option key={user._id} value={user._id}>
                                        {user.firstName} {user.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button onClick={() => { setEditingTask(null); setSelectedUserId(""); }} className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded">
                                Stäng
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={selectedUserId === ""}
                                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
                            >
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