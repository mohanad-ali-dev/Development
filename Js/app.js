// ============================================================
// Development — تطور
// app.js
// Collection Point
// ============================================================

import { developmentData } from "./data.js";

import { addExpenses } from "./addExpenses.js";
import { addJourney } from "./addJourney.js";
import { addJourneysTasks } from "./addJourneysTasks.js";
import { addTask } from "./addTask.js";

import { deleteExpense } from "./deleteExpense.js";
import { deleteJourney } from "./deleteJourney.js";
import { deleteJourneyTask } from "./deleteJourneyTask.js";
import { deleteTask } from "./deleteTask.js";

import { getAllExpenses } from "./getAllExpenses.js";
import { getAllJourney } from "./getAllJourney.js";
import { getAllTask } from "./getAllTasks.js";
import { getExpense } from "./getExpense.js";
import { getJourney } from "./getJourney.js";
import { getJourneyProgress } from "./getJourneyProgress.js";
import { getTask } from "./getTask.js";
import { getTaskProgress } from "./getTaskProgress.js";

import { getTotalCompletedTasks } from "./getTotalCompletedTasks.js";
import { getTotalExpenses } from "./getTotalExpenses.js";
import { getTotalJourneysTasks } from "./getTotalJourneyTasks.js";
import { getTotalJourneys } from "./getTotalJourneys.js";
import { getTotalTasks } from "./getTotalTasks.js";

import { toggleTaskStatus } from "./toggleTaskStatus.js";

import { updateExpense } from "./updateExpenses.js";
import { updateJourney } from "./updateJourney.js";
import { updateJourneyTask } from "./updateJourneyTask.js";
import { updateTask } from "./updateTask.js";

import { storage } from "./storage.js";


// ============================================================
// Main App Object
// ============================================================

const app = {

    data: developmentData,


    // Storage
    storage,


    // Add
    addExpenses,
    addJourney,
    addJourneysTasks,
    addTask,


    // Delete
    deleteExpense,
    deleteJourney,
    deleteJourneyTask,
    deleteTask,


    // Get
    getAllExpenses,
    getAllJourney,
    getAllTask,
    getExpense,
    getJourney,
    getJourneyProgress,
    getTask,
    getTaskProgress,


    // Totals
    getTotalCompletedTasks,
    getTotalExpenses,
    getTotalJourneysTasks,
    getTotalJourneys,
    getTotalTasks,


    // Toggle
    toggleTaskStatus,


    // Update
    updateExpense,
    updateJourney,
    updateJourneyTask,
    updateTask,


    // ============================================================
    // Helper: حفظ تلقائي
    // ============================================================

    save() {

        storage.saveAll();

    }

};

export { app };
