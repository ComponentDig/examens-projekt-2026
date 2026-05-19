import Holidays from "date-holidays";
import { eachDayOfInterval, isWeekend, startOfMonth, lastDayOfMonth, isSameDay } from 'date-fns';
import User from "../models/userSchema.js";
import Schedule from "../models/scheduleEntry.js";
import MonthSchedule from "../models/monthSchedule.js";

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

        // Utsläpp ska visas varje dag så att admin kan lägga in manuellt måndag-fredag helgfria dagar

        if (isSatOrSun || isHoliday) {
            taskPool.push({ date: currentDay, taskType: 'Utsläpp', slots: 1, isManual: false });
        } else {
            taskPool.push({ date: currentDay, taskType: 'Utsläpp', slots: 1, isManual: true });
        }
        taskPool.push({ date: currentDay, taskType: 'Insläpp', slots: 2, isManual: false });
        taskPool.push({ date: currentDay, taskType: 'Kvällsfodring', slots: 1, isManual: false });

    }

    return taskPool;
}

// function som ska skapa ett schema för en månad utifrån de stallpass som ska tilldelas
// hämtar användare och delar ut jämnt på alla hästägare
export async function generateSchedule(taskPool, year, month) {
    const usersFromDB = await User.find({ isActive: true, role: 'user' });

    const userPool = usersFromDB.map(user => ({
        id: user._id.toString(),
        tasksLeft: user.requiredTasks,
        lastTaskDate: null
    }));

    const scheduleEntries = [];

    for (const task of taskPool) {
        let assignedUserForTask = [];

        if (!task.isManual) {
            for (let slot = 0; slot < task.slots; slot++) {
                let horseOwners = userPool.filter(horseOwner => {
                    if (horseOwner.tasksLeft <= 0) {
                        return false;
                    }

                    const alreadyBookedToday = scheduleEntries.some(entry => (
                        entry.users.includes(horseOwner.id) && isSameDay(entry.date, task.date)
                    ));

                    if (alreadyBookedToday) {
                        return false;
                    }

                    if (assignedUserForTask.includes(horseOwner.id)) {
                        return false;
                    }

                    return true;
                });

                // sortering av hästägare 
                // väljer de som har gjort minst pass först
                horseOwners.sort((horseOwnerA, horseOwnerB) => {
                    const taskDifference = horseOwnerB.tasksLeft - horseOwnerA.tasksLeft;

                    if (taskDifference !== 0) {
                        return taskDifference;
                    }

                    if (horseOwnerA.lastTaskDate === null && horseOwnerB.lastTaskDate !== null) {
                        return -1;
                    }

                    if (horseOwnerA.lastTaskDate !== null && horseOwnerB.lastTaskDate === null) {
                        return 1;
                    }

                    if (horseOwnerA.lastTaskDate === null && horseOwnerB.lastTaskDate === null) {
                        return 0;
                    }

                    return horseOwnerA.lastTaskDate - horseOwnerB.lastTaskDate;
                });

                let selectedUser = horseOwners[0];

                if (!selectedUser) {
                    console.warn(`Kunde inte hitta användare till ${task.taskType} ${task.date.toDateString()}`);
                    continue;
                }

                const userIndex = userPool.findIndex(owner => owner.id === selectedUser.id);

                if (userIndex === -1) {
                    throw new Error('Internt fel: Hittade inte den valda ägaren.');
                }

                userPool[userIndex].tasksLeft -= 1;
                userPool[userIndex].lastTaskDate = task.date;

                assignedUserForTask.push(selectedUser.id);
            }
        }

        scheduleEntries.push({
            date: task.date,
            taskType: task.taskType,
            users: assignedUserForTask,
        });
    }

    try {
        const savedEntries = await Schedule.insertMany(scheduleEntries);
        const savedEntryIds = savedEntries.map(entry => entry._id);

        const newMonthSchedule = new MonthSchedule({
            month: month,
            year: year,
            entries: savedEntryIds,
        });
        await newMonthSchedule.save();

        return { success: true, message: `Schema genererat för ${year}-${month}.` };
    } catch (error) {
        console.error('Fel vid schemagenerering', error);
        throw new Error('Schemat kunde inte slutföras eller sparas');
    }
}

// hämtar schemat för en specifik månad
export async function getScheduleByMonth(year, month) {
    try {
        const findSchedule = await MonthSchedule.findOne({ year, month })
            .populate({
                path: 'entries',
                populate: { path: 'users', select: 'firstName lastName' }
            });

        if (!findSchedule) {
            return null;
        }

        return findSchedule.entries;
    } catch (error) {
        console.error('Fel vid hämtning av schema:', error);
        throw new Error('Kunde inte hämta schema');
    }
}