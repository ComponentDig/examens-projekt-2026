import { buildTaskPool, generateSchedule, getScheduleByMonth } from "./scheduleGeneratorController.js";
import Schedule from "../models/scheduleEntry.js";


export const triggerScheduleGenerator = async (req, res) => {
    // tar emot år och månad 
    // för att veta när schemas ska skapar för - vilken månad och år
    const { year, month } = req.body;

    try {
        // skapar en lista med alla pass för månaden
        const taskPool = buildTaskPool(year, month);

        // genererar schemat - fördelas mellan användarna som är registrerade
        const result = await generateSchedule(taskPool, year, month);

        res.status(201).json(result);

        // visar fel om genereringen misslyckades
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// hämtar schemat för en viss månad
// hämtar från databasen och returnerar
export const getScheduleController = async (req, res) => {
    const { year, month } = req.query;

    const parsedYear = Number(year);
    const parsedMonth = Number(month);

    // kollar om månad och år är giltiga nummer
    if (!parsedYear || !parsedMonth) {
        return res.status(400).json({ message: 'År och månad måste specifieras' });
    }

    try {
        const schedule = await getScheduleByMonth(parsedYear, parsedMonth);

        // visar meddelande om inget schema finns
        if (!schedule || schedule.length === 0) {
            return res.status(404).json({ message: `Inget schema hittades för ${year}-${month}` });
        }

        return res.status(200).json(schedule);
    } catch (error) {
        console.error('Fel upptäckt', error);
        return res.status(500).json({ message: error.message || 'Internt serverfel' });
    }
};

// hade lite strul med att få till detta, tog hjälp av Gemini för att lägga till action
export const updateScheduleEntry = async (req, res) => {
    // hämtar id och userId
    const { id } = req.params;
    const { userId, action } = req.body;

    try {

        // objekt för att updatera schemat
        let updatedQuery = {};

        // om action är "remove" ska användaren tas bort från valda passet
        if (action === "remove") {
            updatedQuery = { $pull: { users: userId } };
        }
        else {
            if (!userId) {
                return res.status(400).json({ message: "userId krävs" });
            }
            updatedQuery = { $addToSet: { users: userId } };
        }

        // uppdaterar schema
        const updatedEntry = await Schedule.findByIdAndUpdate(
            id,
            updatedQuery,
            { new: true }
        ).populate('users', 'firstName lastName');

        if (!updatedEntry) {
            return res.status(404).json({ message: "passet hittades inte" });
        }

        return res.status(200).json({ success: true, entry: updatedEntry });

    } catch (error) {
        console.error('Fel vid uppdateringen', error);
        return res.status(500).json({ message: error.message || 'Internt serverfel' });
    }
};
