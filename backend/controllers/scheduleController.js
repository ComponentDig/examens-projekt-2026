import { buildTaskPool, generateSchedule, getScheduleByMonth } from "./scheduleGeneratorController.js";
import Schedule from "../models/scheduleEntry.js";


// tar emot år och månad
// skapar uppgifter för månaden och fördelar mellan användare
export const triggerScheduleGenerator = async (req, res) => {
    const { year, month } = req.body;

    try {
        const taskPool = buildTaskPool(year, month);

        const result = await generateSchedule(taskPool, year, month);

        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// hämtar schemat för en viss månad
// koll att år och månad är giltigt och specificerat
// hämtar från databasen och returnerar
export const getScheduleController = async (req, res) => {
    const { year, month } = req.query;

    const parsedYear = Number(year);
    const parsedMonth = Number(month);

    if (!parsedYear || !parsedMonth) {
        return res.status(400).json({ message: 'År och månad måste specifieras' });
    }

    try {
        const schedule = await getScheduleByMonth(parsedYear, parsedMonth);

        if (!schedule || schedule.length === 0) {
            return res.status(404).json({ message: `Inget schema hittades för ${year}-${month}` });
        }

        return res.status(200).json(schedule);
    } catch (error) {
        console.error('Fel upptäckt', error);
        return res.status(500).json({ message: error.message || 'Internt serverfel' });
    }
};

export const updateScheduleEntry = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const updatedUsers = (userId && userId !== "remove_user") ? [userId] : [];

        const updatedEntry = await Schedule.findByIdAndUpdate(
            id,
            { users: updatedUsers },
            { new: true }
        ).populate('users', 'firstName lastName');

        if (!updatedEntry) {
            return res.status(404).json({ message: "Passet hittades inte" });
        }

        return res.status(200).json({ success: true, entry: updatedEntry });
    } catch (error) {
        console.error('Fel vid uppdateringen', error);
        return res.status(500).json({ message: error.message || 'Internt serverfel' });
    }
};
