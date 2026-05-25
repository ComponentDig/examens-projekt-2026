import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="p-4 sm:p-8 min-h-screen bg-slate-50/50">
            <div className="max-w-5xl mx-auto mb-8">
                <h1 className="text-xl sm:text-2xl font-bold text-sky-950">Välkommen tillbaka, Admin!</h1>
                <p className="text-xs text-slate-500 mt-1">Här är morgonens överblick för stallets drift och planering.</p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-5 bg-white border border-sky-100 rounded-2xl shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Registrerade</p>
                        <h3 className="text-2xl font-extrabold text-sky-950">14</h3>
                        <p className="text-xs text-emerald-600 font-medium mt-0.5">Alla aktiva</p>
                    </div>
                </div>

                <div className="p-5 bg-white border border-sky-100 rounded-2xl shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Status denna månad</p>
                        <h3 className="text-2xl font-extrabold text-amber-600">3 pass</h3>
                        <p className="text-xs text-amber-600 font-medium mt-0.5">Kräver tillsättning</p>
                    </div>
                </div>

                <div className="p-5 bg-white border border-sky-100 rounded-2xl shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Stallstatus</p>
                        <h3 className="text-2xl font-extrabold text-emerald-700">Full rulle</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Inget onormalt rapporterat</p>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="md:col-span-2 p-6 bg-white border border-sky-100 rounded-2xl shadow-xs">
                    <h2 className="text-sm font-bold text-sky-950 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                        Systeminformation & flöde
                    </h2>
                    <div className="space-y-4">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm">
                            <span className="font-bold text-sky-900 block mb-0.5">Info: Ny funktion på gång</span>Du kan nu enkelt exportera och skriva ut schemat direkt från schemafliken om du vill sätta upp en fysisk lapp i foderkammaren.</div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm"><span className="font-bold text-sky-900 block mb-0.5">Säkerhetstips</span>Kom ihåg att inbjudningslänkar du skapar till nya hästägare är unika och förbrukas så fort de registrerar sitt konto.</div>
                    </div>
                </div>

                <div className="p-6 bg-white border border-sky-100 rounded-2xl shadow-xs flex flex-col justify-between">
                    <div>
                        <h2 className="text-sm font-bold text-sky-950 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Snabba åtgärder</h2>
                        <div className="space-y-2">
                            <Link to="/admin/schedule" className="w-full text-left block p-2.5 rounded-xl text-xs font-bold text-sky-900 bg-sky-50 hover:bg-sky-950 hover:text-white transition-all">Gå till Schemahantering</Link>
                            <Link to="/admin/users" className="w-full text-left block p-2.5 rounded-xl text-xs font-bold text-sky-900 bg-sky-50 hover:bg-sky-950 hover:text-white transition-all">Bjud in ny hästägare</Link>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center font-medium">Stall-Portalen Admin • v1.2.0</div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;