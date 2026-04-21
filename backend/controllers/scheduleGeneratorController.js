import Holidays from "date-holidays";
import { eachDayOfInterval, isWeekend, format, startOfMonth, lastDayOfMonth, isSameDay } from 'date-fns';
import userSchema from '../models/userSchema.js';
import scheduleEntry from '../models/scheduleEntry.js';
import monthSchedule from '../models/monthSchedule.js';

// hantera svenska helgdagar
const holiday = new Holidays('SE');

// funktion för att generera en lista med stallpass
// alla dagar ska ha pass för insläpp och kvällsfodring
// if-sats för helger och röda dagar då utsläpp ska inkluderas
export function buildTaskPool(year, month) {
    const monthIndex = month - 1;

    const startDate = startOfMonth(new Date(year, monthIndex));
    const endDate = lastDayOfMonth(new Date(year, monthIndex));

    const taskPool = [];

    const allDaysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

    for (const currentDay of allDaysInMonth) {
        const isSatOrSun = isWeekend(currentDay);
        const isHoliday = holiday.isHoliday(currentDay);

        taskPool.push({ date: currentDay, taskType: 'Insläpp', slots: 2 });
        taskPool.push({ date: currentDay, taskType: 'Kvällsfodring', slots: 1 });

        if (isSatOrSun || isHoliday) {
            taskPool.push({ date: currentDay, taskType: 'Utsläpp', slots: 1 });
        }
    }

    return taskPool;
}