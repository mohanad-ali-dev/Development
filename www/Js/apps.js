// ============================================================
// Development — تطور
// apps.js
// DOM + Events + Logic
// ============================================================

import { app } from "./app.js";
import { storage } from "./storage.js";
import { excel } from "./excel.js";


// ============================================================
// DOM
// ============================================================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


// Pages
const pages = $$(".page");
const navItems = $$(".nav-item");


// Menu
const menuButton = $("#menuButton");
const closeMenuButton = $("#closeMenuButton");
const sideMenu = $("#sideMenu");
const menuOverlay = $("#menuOverlay");


// Tabs
const tabButtons = $$("[data-tab]");
const tabContents = $$("[data-tab-content]");


// Task
const addMainButton = $("#addMainButton");
const emptyAddTaskButton = $("#emptyAddTaskButton");
const taskModal = $("#taskModal");
const taskForm = $("#taskForm");
const taskModalTitle = $("#taskModalTitle");
const taskModalEyebrow = $("#taskModalEyebrow");
const taskSubmitButton = $("#taskSubmitButton");

const taskNameInput = $("#taskNameInput");
const taskClassificationInput = $("#taskClassificationInput");
const taskTimeInput = $("#taskTimeInput");


// Journey
const emptyAddJourneyButton = $("#emptyAddJourneyButton");
const journeyModal = $("#journeyModal");
const journeyForm = $("#journeyForm");
const journeyModalTitle = $("#journeyModalTitle");
const journeyModalEyebrow = $("#journeyModalEyebrow");
const journeySubmitButton = $("#journeySubmitButton");

const journeyNameInput = $("#journeyNameInput");
const journeyTimeInput = $("#journeyTimeInput");


// Journey Task
const journeyTaskModal = $("#journeyTaskModal");
const journeyTaskForm = $("#journeyTaskForm");
const journeyTaskNameInput = $("#journeyTaskNameInput");
const journeyTaskClassificationInput = $("#journeyTaskClassificationInput");
const journeyTaskTimeInput = $("#journeyTaskTimeInput");

let journeyTaskTargetIndex = null;


// Choose Type
const chooseTypeModal = $("#chooseTypeModal");
const chooseTask = $("#chooseTask");
const chooseJourney = $("#chooseJourney");


// Expense
const addExpenseButton = $("#addExpenseButton");
const expenseModal = $("#expenseModal");
const expenseForm = $("#expenseForm");
const expenseModalTitle = $("#expenseModalTitle");
const expenseModalEyebrow = $("#expenseModalEyebrow");
const expenseSubmitButton = $("#expenseSubmitButton");

const expenseNameInput = $("#expenseNameInput");
const customExpenseField = $("#customExpenseField");
const customExpenseInput = $("#customExpenseInput");
const expenseAmountInput = $("#expenseAmountInput");


// Lists
const tasksList = $("#tasksList");
const journeysList = $("#journeysList");
const expensesList = $("#expensesList");


// About
const aboutModal = $("#aboutModal");


// Report
const reportModal = $("#reportModal");
const reportModalTitle = $("#reportModalTitle");
const reportModalEyebrow = $("#reportModalEyebrow");
const reportContent = $("#reportContent");
const exportReportButton = $("#exportReportButton");

let currentReport = null;


// Old Reports
const oldReportsModal = $("#oldReportsModal");
const oldReportsList = $("#oldReportsList");


// Monthly Notification
const monthlyReportNotificationModal = $("#monthlyReportNotificationModal");
const viewReportButton = $("#viewReportButton");
const dismissReportButton = $("#dismissReportButton");

let pendingReport = null;


// Export Expenses
const exportExpensesButton = $("#exportExpensesButton");


// Toast
const toast = $("#toast");
const toastMessage = $("#toastMessage");


// Options Menu
const optionsMenu = $("#optionsMenu");


// ============================================================
// STATE
// ============================================================

let activeTab = "tasks";

let editingTaskIndex = null;
let editingJourneyIndex = null;
let editingExpenseIndex = null;
let editingJourneyTaskIndex = null;

let optionsTarget = {
    type: null,
    index: null,
    subIndex: null
};


// ============================================================
// NAVIGATION
// ============================================================

function showPage(pageName) {

    pages.forEach((page) => {
        page.classList.remove("active");
    });

    navItems.forEach((item) => {
        item.classList.remove("active");
        item.removeAttribute("aria-current");
    });


    const selectedPage = $(`[data-page="${pageName}"]`);
    const selectedNav = $(`[data-page-target="${pageName}"]`);


    if (selectedPage) selectedPage.classList.add("active");

    if (selectedNav) {
        selectedNav.classList.add("active");
        selectedNav.setAttribute("aria-current", "page");
    }


    window.scrollTo({ top: 0, behavior: "smooth" });

}


navItems.forEach((item) => {

    item.addEventListener("click", () => {
        showPage(item.dataset.pageTarget);
    });

});


$$("[data-go-to]").forEach((button) => {

    button.addEventListener("click", () => {
        showPage(button.dataset.goTo);
    });

});


// ============================================================
// TABS
// ============================================================

function showTab(tabName) {

    activeTab = tabName;


    tabButtons.forEach((button) => {

        button.classList.remove("active");

        if (button.dataset.tab === tabName) {
            button.classList.add("active");
        }

    });


    tabContents.forEach((content) => {

        content.classList.remove("active");

        if (content.dataset.tabContent === tabName) {
            content.classList.add("active");
        }

    });

}


tabButtons.forEach((button) => {

    button.addEventListener("click", () => {
        showTab(button.dataset.tab);
    });

});


// ============================================================
// SIDE MENU
// ============================================================

function openMenu() {

    sideMenu.classList.add("open");
    menuOverlay.classList.add("open");

    menuButton.setAttribute("aria-expanded", "true");

}


function closeMenu() {

    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("open");

    menuButton.setAttribute("aria-expanded", "false");

}


menuButton.addEventListener("click", openMenu);
closeMenuButton.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);


// ============================================================
// SIDE MENU ACTIONS
// ============================================================

$$(".menu-item").forEach((item) => {

    item.addEventListener("click", () => {

        const action = item.dataset.action;

        closeMenu();


        if (action === "reports") {
            openOldReportsModal();
        }


        if (action === "theme") {
            toggleTheme();
        }


        if (action === "about") {
            openModal(aboutModal);
        }

    });

});


// ============================================================
// MODALS
// ============================================================

function openModal(modal) {

    if (!modal) return;

    closeAllOptions();

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


function closeAllModals() {

    $$(".modal").forEach((modal) => closeModal(modal));

}


$$("[data-close-modal]").forEach((element) => {

    element.addEventListener("click", () => {

        const modalId = element.dataset.closeModal;
        const modal = document.getElementById(modalId);

        closeModal(modal);

    });

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeAllModals();
        closeMenu();
        closeAllOptions();

    }

});


// ============================================================
// THEME
// ============================================================

function toggleTheme() {

    const isDark = document.body.classList.toggle("dark");

    const theme = isDark ? "dark" : "light";


    app.data.settings.theme = theme;

    app.save();


    showToast(
        isDark ? "🌙 الوضع الليلي" : "☀️ الوضع النهاري"
    );

}


function loadTheme() {

    if (app.data.settings.theme === "dark") {
        document.body.classList.add("dark");
    }

}


// ============================================================
// CHOOSE TYPE
// ============================================================

addMainButton.addEventListener("click", () => {

    if (activeTab === "tasks") {
        openModal(chooseTypeModal);
    } else if (activeTab === "journeys") {
        openJourneyModal();
    }

});


chooseTask.addEventListener("click", () => {

    closeModal(chooseTypeModal);

    setTimeout(openTaskModal, 200);

});


chooseJourney.addEventListener("click", () => {

    closeModal(chooseTypeModal);

    setTimeout(openJourneyModal, 200);

});


// ============================================================
// OPTIONS MENU
// ============================================================

function openOptionsMenu(button, type, index, subIndex = null) {

    optionsTarget = { type, index, subIndex };


    const completeButton = optionsMenu.querySelector(
        '[data-option="complete"]'
    );

    const addJourneyTaskButton = optionsMenu.querySelector(
        '[data-option="add-journey-task"]'
    );


    if (type === "task" || type === "journey-task") {
        completeButton.hidden = false;
    } else {
        completeButton.hidden = true;
    }


    if (type === "journey") {
        addJourneyTaskButton.hidden = false;
    } else {
        addJourneyTaskButton.hidden = true;
    }


    const rect = button.getBoundingClientRect();

    const menuWidth = 180;

    let left = rect.right - menuWidth;

    if (left < 10) left = 10;

    if (left + menuWidth > window.innerWidth - 10) {
        left = window.innerWidth - menuWidth - 10;
    }


    let top = rect.bottom + 6;

    const menuHeight = 200;

    if (top + menuHeight > window.innerHeight) {
        top = rect.top - menuHeight - 6;
    }

    if (top < 10) top = 10;


    optionsMenu.style.left = `${left}px`;
    optionsMenu.style.top = `${top}px`;

    optionsMenu.classList.add("open");
    optionsMenu.setAttribute("aria-hidden", "false");

}


function closeAllOptions() {

    optionsMenu.classList.remove("open");
    optionsMenu.setAttribute("aria-hidden", "true");

    optionsTarget = { type: null, index: null, subIndex: null };

}


document.addEventListener("click", (event) => {

    if (
        !optionsMenu.contains(event.target) &&
        !event.target.closest("[data-task-options]") &&
        !event.target.closest("[data-journey-options]") &&
        !event.target.closest("[data-expense-options]") &&
        !event.target.closest("[data-journey-task-options]")
    ) {
        closeAllOptions();
    }

});


// ============================================================
// OPTIONS ACTIONS
// ============================================================

optionsMenu.querySelectorAll("[data-option]")
    .forEach((button) => {

        button.addEventListener("click", () => {

            const action = button.dataset.option;
            const { type, index, subIndex } = optionsTarget;

            closeAllOptions();


            if (action === "edit") {

                if (type === "task") openEditTask(index);
                if (type === "journey") openEditJourney(index);
                if (type === "expense") openEditExpense(index);
                if (type === "journey-task") openEditJourneyTask(index, subIndex);

            }


            if (action === "delete") {

                if (type === "task") deleteTaskConfirm(index);
                if (type === "journey") deleteJourneyConfirm(index);
                if (type === "expense") deleteExpenseConfirm(index);
                if (type === "journey-task") deleteJourneyTaskConfirm(index, subIndex);

            }


            if (action === "complete") {

                if (type === "task") {

                    app.toggleTaskStatus(index);
                    app.save();

                    renderTasks();
                    renderHome();

                    showToast("تم تحديث حالة المهمة");

                }


                if (type === "journey-task") {

                    const journey = app.getJourney(index);

                    if (journey && journey.journeyTasks[subIndex]) {

                        journey.journeyTasks[subIndex].completed =
                            !journey.journeyTasks[subIndex].completed;

                        app.save();

                        renderJourneys();
                        renderHome();

                        showToast("تم تحديث المهمة");

                    }

                }

            }


            if (action === "add-journey-task") {

                if (type === "journey") {
                    openJourneyTaskModal(index);
                }

            }

        });

    });


// ============================================================
// TASK MODAL
// ============================================================

function openTaskModal() {

    editingTaskIndex = null;

    taskForm.reset();

    taskModalEyebrow.textContent = "مهمة جديدة";
    taskModalTitle.textContent = "إضافة مهمة";

    taskSubmitButton.innerHTML =
        '<i class="fa-solid fa-plus"></i> إضافة المهمة';


    openModal(taskModal);

    setTimeout(() => taskNameInput.focus(), 100);

}


function openEditTask(index) {

    const task = app.getTask(index);

    if (!task) return;

    editingTaskIndex = index;

    taskModalEyebrow.textContent = "تعديل مهمة";
    taskModalTitle.textContent = "تعديل المهمة";

    taskSubmitButton.innerHTML =
        '<i class="fa-solid fa-check"></i> حفظ التعديلات';


    taskNameInput.value = task.taskName || "";
    taskClassificationInput.value = task.classification || "normal";
    taskTimeInput.value = task.completionTime ?? "";


    openModal(taskModal);

    setTimeout(() => taskNameInput.focus(), 100);

}


emptyAddTaskButton.addEventListener("click", openTaskModal);


// ============================================================
// TASK FORM
// ============================================================

taskForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name = taskNameInput.value.trim();
    const classification = taskClassificationInput.value;
    const timeValue = taskTimeInput.value.trim();


    if (!name) {
        showToast("اكتب اسم المهمة");
        return;
    }


    let completionTime = null;

    if (timeValue) {

        const parsed = Number(timeValue);

        if (parsed < 1 || parsed > 30) {
            showToast("الزمن يجب أن يكون بين 1 و 30 يوم");
            return;
        }

        completionTime = parsed;

    }


    if (editingTaskIndex !== null) {

        app.updateTask(editingTaskIndex, {
            taskName: name,
            classification: classification,
            taskTime: completionTime
        });

        showToast("تم تحديث المهمة");

    } else {

        app.addTask(name, classification, completionTime);

        showToast("تمت إضافة المهمة");

    }


    app.save();

    closeModal(taskModal);
    editingTaskIndex = null;

    renderTasks();
    renderHome();

});


// ============================================================
// JOURNEY MODAL
// ============================================================

function openJourneyModal() {

    editingJourneyIndex = null;

    journeyForm.reset();

    journeyModalEyebrow.textContent = "رحلة جديدة";
    journeyModalTitle.textContent = "إضافة رحلة";

    journeySubmitButton.innerHTML =
        '<i class="fa-solid fa-plus"></i> إضافة الرحلة';


    openModal(journeyModal);

    setTimeout(() => journeyNameInput.focus(), 100);

}


function openEditJourney(index) {

    const journey = app.getJourney(index);

    if (!journey) return;

    editingJourneyIndex = index;

    journeyModalEyebrow.textContent = "تعديل رحلة";
    journeyModalTitle.textContent = "تعديل الرحلة";

    journeySubmitButton.innerHTML =
        '<i class="fa-solid fa-check"></i> حفظ التعديلات';


    journeyNameInput.value = journey.journeyName || "";
    journeyTimeInput.value = journey.journeyTime || "";


    openModal(journeyModal);

    setTimeout(() => journeyNameInput.focus(), 100);

}


emptyAddJourneyButton.addEventListener("click", openJourneyModal);


// ============================================================
// JOURNEY FORM
// ============================================================

journeyForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name = journeyNameInput.value.trim();
    const time = Number(journeyTimeInput.value);


    if (!name) {
        showToast("اكتب اسم الرحلة");
        return;
    }


    if (!time || time < 30) {
        showToast("الحد الأدنى للرحلة 30 يوم");
        return;
    }


    if (editingJourneyIndex !== null) {

        app.updateJourney(editingJourneyIndex, {
            journeyName: name,
            journeyTime: time
        });

        showToast("تم تحديث الرحلة");

    } else {

        const journey = {
            journeyName: name,
            journeyTime: time,
            startDate: new Date().toISOString(),
            journeyTasks: [],
            lastReportMonth: 0
        };

        app.data.journeys.push(journey);

        showToast("تمت إضافة الرحلة");

    }


    app.save();

    closeModal(journeyModal);
    editingJourneyIndex = null;

    renderJourneys();
    renderHome();

});


// ============================================================
// JOURNEY TASK MODAL
// ============================================================

function openJourneyTaskModal(journeyIndex) {

    journeyTaskTargetIndex = journeyIndex;

    editingJourneyTaskIndex = null;

    journeyTaskForm.reset();


    // نرجع العناوين الأصلية
    const modalTitle = journeyTaskModal.querySelector("h2");
    const modalEyebrow = journeyTaskModal.querySelector(".eyebrow");
    const modalSubmit = journeyTaskForm.querySelector("button[type='submit']");

    if (modalEyebrow) modalEyebrow.textContent = "مهمة رحلة";
    if (modalTitle) modalTitle.textContent = "إضافة مهمة للرحلة";
    if (modalSubmit) {
        modalSubmit.innerHTML =
            '<i class="fa-solid fa-plus"></i> إضافة المهمة';
    }


    openModal(journeyTaskModal);

    setTimeout(() => journeyTaskNameInput.focus(), 100);

}


function openEditJourneyTask(journeyIndex, taskIndex) {

    const journey = app.getJourney(journeyIndex);

    if (!journey || !journey.journeyTasks[taskIndex]) return;


    const task = journey.journeyTasks[taskIndex];


    journeyTaskTargetIndex = journeyIndex;
    editingJourneyTaskIndex = taskIndex;


    journeyTaskNameInput.value = task.taskName || "";
    journeyTaskClassificationInput.value = task.classification || "normal";
    journeyTaskTimeInput.value = task.completionTime ?? "";


    // نغيّر العناوين
    const modalTitle = journeyTaskModal.querySelector("h2");
    const modalEyebrow = journeyTaskModal.querySelector(".eyebrow");
    const modalSubmit = journeyTaskForm.querySelector("button[type='submit']");

    if (modalEyebrow) modalEyebrow.textContent = "تعديل مهمة رحلة";
    if (modalTitle) modalTitle.textContent = "تعديل المهمة";
    if (modalSubmit) {
        modalSubmit.innerHTML =
            '<i class="fa-solid fa-check"></i> حفظ التعديلات';
    }


    openModal(journeyTaskModal);

    setTimeout(() => journeyTaskNameInput.focus(), 100);

}


journeyTaskForm.addEventListener("submit", (event) => {

    event.preventDefault();


    if (journeyTaskTargetIndex === null) return;


    const name = journeyTaskNameInput.value.trim();
    const classification = journeyTaskClassificationInput.value;
    const timeValue = journeyTaskTimeInput.value.trim();


    if (!name) {
        showToast("اكتب اسم المهمة");
        return;
    }


    let completionTime = null;

    if (timeValue) {

        const parsed = Number(timeValue);

        if (parsed < 1 || parsed > 30) {
            showToast("الزمن يجب أن يكون بين 1 و 30 يوم");
            return;
        }

        completionTime = parsed;

    }


    const journey = app.getJourney(journeyTaskTargetIndex);

    if (!journey) return;


    if (editingJourneyTaskIndex !== null) {

        // تعديل مهمة موجودة
        journey.journeyTasks[editingJourneyTaskIndex].taskName = name;
        journey.journeyTasks[editingJourneyTaskIndex].classification = classification;
        journey.journeyTasks[editingJourneyTaskIndex].completionTime = completionTime;

        showToast("تم تحديث المهمة");

    } else {

        // إضافة مهمة جديدة
        journey.journeyTasks.push({
            taskName: name,
            classification: classification,
            completionTime: completionTime,
            completed: false
        });

        showToast("تمت إضافة المهمة للرحلة");

    }


    app.save();

    closeModal(journeyTaskModal);
    journeyTaskTargetIndex = null;
    editingJourneyTaskIndex = null;

    renderJourneys();
    renderHome();

});


// ============================================================
// RENDER TASKS
// ============================================================

function renderTasks() {

    const tasks = app.getAllTask();
    const totalTasks = app.getTotalTasks();
    const completedTasks = app.getTotalCompletedTasks();


    const progress = totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;


    $("#tasksCountBadge").textContent = totalTasks;
    $("#tasksProgressPercent").textContent = `${progress}%`;
    $("#tasksProgressBar").style.width = `${progress}%`;
    $("#tasksProgressText").textContent =
        `${completedTasks} من ${totalTasks} مهام مكتملة`;


    if (!tasks || tasks.length === 0) {

        tasksList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fa-solid fa-list-check"></i>
                </div>
                <h3>لا توجد مهام</h3>
                <p>أضف مهمتك الأولى وابدأ الإنجاز</p>
                <button class="primary-button" id="emptyAddTaskButton" type="button">
                    <i class="fa-solid fa-plus"></i>
                    إضافة مهمة
                </button>
            </div>
        `;


        const btn = $("#emptyAddTaskButton");
        if (btn) btn.addEventListener("click", openTaskModal);

        return;
    }


    tasksList.innerHTML = "";


    tasks.forEach((task, index) => {

        const card = document.createElement("article");

        card.className = "task-card";
        if (task.completed) card.classList.add("completed");


        const classification = getClassificationName(task.classification);

        const time = task.completionTime
            ? `${task.completionTime} يوم`
            : "بدون زمن";


        card.innerHTML = `
            <button
                class="task-check ${task.completed ? "completed" : ""}"
                type="button"
                data-task-toggle="${index}">

                ${task.completed ? '<i class="fa-solid fa-check"></i>' : ''}

            </button>

            <div class="task-card-content">

                <div class="task-card-name">
                    ${escapeHTML(task.taskName)}
                </div>

                <div class="task-card-meta">

                    <span class="task-meta">
                        <i class="fa-solid fa-tag"></i>
                        ${classification}
                    </span>

                    <span class="task-meta">
                        <i class="fa-regular fa-clock"></i>
                        ${time}
                    </span>

                </div>

            </div>

            <button
                class="task-card-options"
                type="button"
                data-task-options="${index}">

                <i class="fa-solid fa-ellipsis-vertical"></i>

            </button>
        `;


        tasksList.appendChild(card);

    });


    attachTaskEvents();

}


function attachTaskEvents() {

    $$("[data-task-toggle]").forEach((button) => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.taskToggle);

            app.toggleTaskStatus(index);
            app.save();

            renderTasks();
            renderHome();

            showToast("تم تحديث حالة المهمة");

        });

    });


    $$("[data-task-options]").forEach((button) => {

        button.addEventListener("click", (event) => {

            event.stopPropagation();

            const index = Number(button.dataset.taskOptions);

            openOptionsMenu(button, "task", index);

        });

    });

}


// ============================================================
// RENDER JOURNEYS
// ============================================================

function renderJourneys() {

    const journeys = app.getAllJourney();

    $("#journeysCountBadge").textContent = journeys.length;


    if (!journeys || journeys.length === 0) {

        journeysList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fa-solid fa-route"></i>
                </div>
                <h3>لا توجد رحلات</h3>
                <p>ابدأ رحلتك الأولى الآن</p>
                <button class="primary-button" id="emptyAddJourneyButton" type="button">
                    <i class="fa-solid fa-plus"></i>
                    إضافة رحلة
                </button>
            </div>
        `;


        const btn = $("#emptyAddJourneyButton");
        if (btn) btn.addEventListener("click", openJourneyModal);

        return;
    }


    journeysList.innerHTML = "";


    journeys.forEach((journey, index) => {

        const item = document.createElement("article");

        item.className = "journey-item";


        const progress = getJourneyProgressSafe(index);
        const duration = Number(journey.journeyTime || 0);
        const tasksCount = journey.journeyTasks
            ? journey.journeyTasks.length
            : 0;


        const tasksHtml = journey.journeyTasks &&
            journey.journeyTasks.length > 0
            ? journey.journeyTasks.map((task, tIndex) => `
                <div class="journey-task-item ${task.completed ? "completed" : ""}">
                    <button
                        class="task-check ${task.completed ? "completed" : ""}"
                        type="button"
                        data-journey-task-toggle="${index}-${tIndex}">

                        ${task.completed ? '<i class="fa-solid fa-check"></i>' : ''}

                    </button>

                    <span class="journey-task-name">
                        ${escapeHTML(task.taskName)}
                    </span>

                    <button
                        class="task-card-options"
                        type="button"
                        data-journey-task-options="${index}-${tIndex}"
                        aria-label="خيارات المهمة">

                        <i class="fa-solid fa-ellipsis-vertical"></i>

                    </button>
                </div>
            `).join("")
            : `<div class="journey-tasks-empty">
                لا توجد مهام — أضف مهمة لهذه الرحلة
            </div>`;


        item.innerHTML = `
            <div class="journey-item-header">

                <div class="journey-item-icon">
                    <i class="fa-solid fa-route"></i>
                </div>

                <div class="journey-item-info">

                    <div class="journey-item-name">
                        ${escapeHTML(journey.journeyName)}
                    </div>

                    <div class="journey-item-meta">
                        ${duration} يوم • ${tasksCount} مهام
                    </div>

                    <div class="journey-item-progress">
                        <div
                            class="journey-item-progress-value"
                            style="width: ${progress}%">
                        </div>
                    </div>

                </div>

                <button
                    class="task-card-options"
                    type="button"
                    data-journey-options="${index}">

                    <i class="fa-solid fa-ellipsis-vertical"></i>

                </button>

                <div class="journey-item-toggle">
                    <i class="fa-solid fa-chevron-down"></i>
                </div>

            </div>


            <div class="journey-item-body">

                <div class="journey-tasks-list">
                    ${tasksHtml}
                </div>

                <button
                    class="journey-add-task-btn"
                    type="button"
                    data-journey-add-task="${index}">

                    <i class="fa-solid fa-plus"></i>
                    إضافة مهمة للرحلة

                </button>

            </div>
        `;


        journeysList.appendChild(item);

    });


    attachJourneyEvents();

}


function attachJourneyEvents() {

    $$(".journey-item-header").forEach((header) => {

        header.addEventListener("click", (event) => {

            if (event.target.closest("[data-journey-options]")) return;

            const item = header.closest(".journey-item");

            item.classList.toggle("expanded");

        });

    });


    $$("[data-journey-options]").forEach((button) => {

        button.addEventListener("click", (event) => {

            event.stopPropagation();

            const index = Number(button.dataset.journeyOptions);

            openOptionsMenu(button, "journey", index);

        });

    });


    $$("[data-journey-add-task]").forEach((button) => {

        button.addEventListener("click", (event) => {

            event.stopPropagation();

            const index = Number(button.dataset.journeyAddTask);

            openJourneyTaskModal(index);

        });

    });


    // إكمال / إلغاء مهمة رحلة (من زر الـ check)
    $$("[data-journey-task-toggle]").forEach((button) => {

        button.addEventListener("click", (event) => {

            event.stopPropagation();

            const [jIndex, tIndex] = button.dataset
                .journeyTaskToggle
                .split("-")
                .map(Number);


            const journey = app.getJourney(jIndex);
            if (!journey) return;


            journey.journeyTasks[tIndex].completed =
                !journey.journeyTasks[tIndex].completed;


            app.save();

            renderJourneys();
            renderHome();

            showToast("تم تحديث المهمة");

        });

    });


    // خيارات مهمة الرحلة (زر الـ 3 نقاط)
    $$("[data-journey-task-options]").forEach((button) => {

        button.addEventListener("click", (event) => {

            event.stopPropagation();

            const [jIndex, tIndex] = button.dataset
                .journeyTaskOptions
                .split("-")
                .map(Number);

            openOptionsMenu(button, "journey-task", jIndex, tIndex);

        });

    });

}


// ============================================================
// JOURNEY PROGRESS
// ============================================================

function getJourneyProgressSafe(index) {

    const journey = app.getJourney(index);

    if (!journey || !journey.journeyTasks ||
        journey.journeyTasks.length === 0) {
        return 0;
    }


    const completed = journey.journeyTasks.filter(
        task => task.completed === true
    ).length;


    return Math.round(
        (completed / journey.journeyTasks.length) * 100
    );

}


// ============================================================
// CLASSIFICATION NAME
// ============================================================

function getClassificationName(classification) {

    const names = {
        normal: "عادية",
        priority: "أولوية",
        special: "خاصة"
    };


    return names[classification] || classification || "عادية";

}


// ============================================================
// DELETE CONFIRMATIONS
// ============================================================

function deleteTaskConfirm(index) {

    const task = app.getTask(index);
    if (!task) return;


    if (!confirm(`هل تريد حذف المهمة "${task.taskName}"؟`)) return;


    app.deleteTask(index);
    app.save();

    renderTasks();
    renderHome();

    showToast("تم حذف المهمة");

}


function deleteJourneyConfirm(index) {

    const journey = app.getJourney(index);
    if (!journey) return;


    if (!confirm(`هل تريد حذف الرحلة "${journey.journeyName}"؟`)) return;


    app.deleteJourney(index);
    app.save();

    renderJourneys();
    renderHome();

    showToast("تم حذف الرحلة");

}


function deleteExpenseConfirm(index) {

    if (!confirm("هل تريد حذف هذا المصروف؟")) return;


    app.deleteExpense(index);
    app.save();

    renderExpenses();
    renderHome();

    showToast("تم حذف المصروف");

}


function deleteJourneyTaskConfirm(journeyIndex, taskIndex) {

    const journey = app.getJourney(journeyIndex);

    if (!journey || !journey.journeyTasks[taskIndex]) return;


    const task = journey.journeyTasks[taskIndex];


    if (!confirm(`هل تريد حذف المهمة "${task.taskName}"؟`)) return;


    journey.journeyTasks.splice(taskIndex, 1);

    app.save();

    renderJourneys();
    renderHome();

    showToast("تم حذف المهمة");

}


// ============================================================
// HOME
// ============================================================

function renderHome() {

    renderHomeTasks();
    renderHomeStats();
    renderHomeExpenses();
    renderHomeJourney();

}


function renderHomeTasks() {

    const tasks = app.getAllTask();
    const container = $("#homeTodayTasks");


    if (!tasks || tasks.length === 0) {

        container.innerHTML = `
            <div class="empty-state compact">
                <div class="empty-icon">
                    <i class="fa-solid fa-list-check"></i>
                </div>
                <p>لا توجد مهام حالياً</p>
            </div>
        `;

        return;
    }


    const visibleTasks = tasks.slice(0, 5);
    container.innerHTML = "";


    visibleTasks.forEach((task, index) => {

        const item = document.createElement("div");

        item.className = "task-preview";
        if (task.completed) item.classList.add("completed");


        item.innerHTML = `
            <button
                class="task-check ${task.completed ? "completed" : ""}"
                type="button"
                data-home-task="${index}">

                ${task.completed ? '<i class="fa-solid fa-check"></i>' : ''}

            </button>

            <span class="task-preview-name">
                ${escapeHTML(task.taskName)}
            </span>
        `;


        container.appendChild(item);

    });


    $$("[data-home-task]").forEach((button) => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.homeTask);

            app.toggleTaskStatus(index);
            app.save();

            renderHome();
            renderTasks();

        });

    });

}


function renderHomeStats() {

    const total = app.getTotalTasks();
    const completed = app.getTotalCompletedTasks();

    const progress = total > 0
        ? Math.round((completed / total) * 100)
        : 0;


    $("#homeTasksCount").textContent = total;
    $("#homeTasksProgress").textContent = `${progress}%`;
    $("#homeTotalTasks").textContent = total;
    $("#homeCompletedTasks").textContent = completed;

}


function renderHomeExpenses() {

    const expenses = app.getAllExpenses();

    const todayExpenses = getExpensesForDay(expenses, new Date());

    const total = todayExpenses.reduce(
        (sum, expense) => sum + Number(expense.amount || 0),
        0
    );


    $("#homeTodayExpenses").textContent =
        `${formatNumber(total)} جنيه`;

}


function renderHomeJourney() {

    const journeys = app.getAllJourney();


    if (!journeys || journeys.length === 0) {

        $("#homeJourneyName").textContent = "لا توجد رحلة حالية";
        $("#homeJourneyDay").textContent = "اليوم 0 من 0";
        $("#homeJourneyProgress").textContent = "0%";
        $("#homeJourneyProgressBar").style.width = "0%";

        return;
    }


    const journey = journeys[journeys.length - 1];
    const journeyIndex = journeys.length - 1;


    $("#homeJourneyName").textContent = journey.journeyName;


    const duration = Number(journey.journeyTime || 0);
    const progress = getJourneyProgressSafe(journeyIndex);
    const currentDay = calculateJourneyDay(journey);


    $("#homeJourneyDay").textContent =
        `اليوم ${currentDay} من ${duration}`;

    $("#homeJourneyProgress").textContent = `${progress}%`;
    $("#homeJourneyProgressBar").style.width = `${progress}%`;

}


function calculateJourneyDay(journey) {

    if (!journey || !journey.startDate) return 0;


    const start = new Date(journey.startDate);
    const now = new Date();

    const diff = now.getTime() - start.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;


    return Math.max(1, days);

}


// ============================================================
// EXPENSES
// ============================================================

function renderExpenses() {

    const expenses = app.getAllExpenses();
    const today = new Date();

    const todayExpenses = getExpensesForDay(expenses, today);


    const todayTotal = todayExpenses.reduce(
        (sum, expense) => sum + Number(expense.amount || 0),
        0
    );


    $("#todayExpensesTotal").textContent = formatNumber(todayTotal);
    $("#expensesCountBadge").textContent = todayExpenses.length;


    renderExpenseList(todayExpenses, expenses);
    updateExpenseStatistics();

}


function renderExpenseList(todayExpenses, allExpenses) {

    if (!todayExpenses || todayExpenses.length === 0) {

        expensesList.innerHTML = `
            <div class="empty-state compact">
                <div class="empty-icon">
                    <i class="fa-solid fa-receipt"></i>
                </div>
                <p>لا توجد مصروفات اليوم</p>
            </div>
        `;

        return;
    }


    expensesList.innerHTML = "";


    todayExpenses.forEach((expense) => {

        const realIndex = allExpenses.indexOf(expense);
        const item = document.createElement("div");

        item.className = "expense-item";


        item.innerHTML = `
            <div class="expense-item-icon">
                <i class="fa-solid ${getExpenseIcon(expense.expenseName)}"></i>
            </div>

            <div class="expense-item-info">

                <span class="expense-item-name">
                    ${escapeHTML(getExpenseName(expense.expenseName))}
                </span>

                <span class="expense-item-date">
                    ${formatExpenseDate(expense.date)}
                </span>

            </div>

            <strong class="expense-item-amount">
                ${formatNumber(Number(expense.amount || 0))} جنيه
            </strong>

            <button
                class="expense-item-options"
                type="button"
                data-expense-options="${realIndex}">

                <i class="fa-solid fa-ellipsis-vertical"></i>

            </button>
        `;


        expensesList.appendChild(item);

    });


    $$("[data-expense-options]").forEach((button) => {

        button.addEventListener("click", (event) => {

            event.stopPropagation();

            const index = Number(button.dataset.expenseOptions);

            openOptionsMenu(button, "expense", index);

        });

    });

}


// ============================================================
// EXPENSE MODAL
// ============================================================

function openExpenseModal() {

    editingExpenseIndex = null;

    expenseForm.reset();
    customExpenseField.classList.add("hidden");

    expenseModalEyebrow.textContent = "مصروف جديد";
    expenseModalTitle.textContent = "إضافة مصروف";

    expenseSubmitButton.innerHTML =
        '<i class="fa-solid fa-check"></i> حفظ المصروف';


    openModal(expenseModal);

    setTimeout(() => expenseNameInput.focus(), 100);

}


function openEditExpense(index) {

    const expense = app.getExpense(index);
    if (!expense) return;

    editingExpenseIndex = index;

    expenseModalEyebrow.textContent = "تعديل مصروف";
    expenseModalTitle.textContent = "تعديل المصروف";

    expenseSubmitButton.innerHTML =
        '<i class="fa-solid fa-check"></i> حفظ التعديلات';


    const options = Array.from(expenseNameInput.options)
        .map(o => o.value);


    if (options.includes(expense.expenseName)) {

        expenseNameInput.value = expense.expenseName;
        customExpenseField.classList.add("hidden");

    } else {

        expenseNameInput.value = "custom";
        customExpenseField.classList.remove("hidden");
        customExpenseInput.value = expense.expenseName;

    }


    expenseAmountInput.value = expense.amount;


    openModal(expenseModal);

    setTimeout(() => expenseAmountInput.focus(), 100);

}


addExpenseButton.addEventListener("click", openExpenseModal);


// ============================================================
// EXPENSE TYPE CHANGE
// ============================================================

expenseNameInput.addEventListener("change", () => {

    if (expenseNameInput.value === "custom") {

        customExpenseField.classList.remove("hidden");
        customExpenseInput.required = true;

    } else {

        customExpenseField.classList.add("hidden");
        customExpenseInput.required = false;
        customExpenseInput.value = "";

    }

});


// ============================================================
// EXPENSE FORM
// ============================================================

expenseForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const selectedType = expenseNameInput.value;
    let expenseName = selectedType;


    if (selectedType === "custom") {

        expenseName = customExpenseInput.value.trim();

        if (!expenseName) {
            showToast("اكتب اسم المصروف");
            return;
        }

    }


    const amount = Number(expenseAmountInput.value);


    if (!amount || amount <= 0) {
        showToast("اكتب مبلغاً صحيحاً");
        return;
    }


    if (editingExpenseIndex !== null) {

        app.updateExpense(editingExpenseIndex, {
            expenseName: expenseName,
            amount: amount
        });

        showToast("تم تحديث المصروف");

    } else {

        const expense = {
            expenseName: expenseName,
            amount: amount,
            date: new Date().toISOString()
        };

        app.data.expenses.push(expense);

        showToast("تم حفظ المصروف");

    }


    app.save();

    closeModal(expenseModal);
    editingExpenseIndex = null;

    renderExpenses();
    renderHome();

});


// ============================================================
// EXPENSE STATISTICS
// ============================================================

let currentPeriod = "day";


$$("[data-period]").forEach((button) => {

    button.addEventListener("click", () => {

        currentPeriod = button.dataset.period;


        $$("[data-period]").forEach((item) => {
            item.classList.remove("active");
        });


        button.classList.add("active");
        updateExpenseStatistics();

    });

});


function updateExpenseStatistics() {

    const expenses = app.getAllExpenses();
    const filtered = filterExpensesByPeriod(expenses, currentPeriod);


    const total = filtered.reduce(
        (sum, expense) => sum + Number(expense.amount || 0),
        0
    );


    let days = 1;

    if (currentPeriod === "week") days = 7;
    if (currentPeriod === "month") days = 30;


    const average = days > 0 ? total / days : 0;


    $("#periodTotal").textContent = `${formatNumber(total)} جنيه`;
    $("#periodAverage").textContent =
        `${formatNumber(Math.round(average))} جنيه`;

}


// ============================================================
// EXPENSE HELPERS — 6 صباحاً
// ============================================================

function getExpenseDate(date) {

    const d = new Date(date);

    if (d.getHours() < 6) {
        d.setDate(d.getDate() - 1);
    }

    return d;

}


function isSameDay(first, second) {

    const a = getExpenseDate(first);
    const b = getExpenseDate(second);

    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );

}


function getExpensesForDay(expenses, day) {

    return expenses.filter((expense) => {

        if (!expense.date) return false;

        return isSameDay(new Date(expense.date), day);

    });

}


function filterExpensesByPeriod(expenses, period) {

    const now = new Date();


    return expenses.filter((expense) => {

        if (!expense.date) return period === "day";


        const date = new Date(expense.date);

        if (Number.isNaN(date.getTime())) return false;


        if (period === "day") {
            return isSameDay(date, now);
        }


        const expDay = getExpenseDate(date);
        const nowDay = getExpenseDate(now);

        const diff = nowDay.getTime() - expDay.getTime();
        const day = 1000 * 60 * 60 * 24;


        if (period === "week") {
            return diff >= 0 && diff <= day * 7;
        }

        if (period === "month") {
            return diff >= 0 && diff <= day * 30;
        }


        return false;

    });

}


function getExpenseName(name) {

    const names = {
        food: "الطعام",
        coffee: "القهوة",
        tea: "الشاي",
        transport: "المواصلات",
        internet: "الإنترنت",
        custom: "أخرى"
    };

    return names[name] || name || "مصروف";

}


function getExpenseIcon(name) {

    const icons = {
        food: "fa-utensils",
        coffee: "fa-mug-hot",
        tea: "fa-mug-hot",
        transport: "fa-car",
        internet: "fa-wifi",
        custom: "fa-receipt"
    };

    return icons[name] || "fa-receipt";

}


function formatExpenseDate(date) {

    if (!date) return "";

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) return "";


    return value.toLocaleTimeString("ar-SD", {
        hour: "2-digit",
        minute: "2-digit"
    });

}


// ============================================================
// EXPORT EXPENSES
// ============================================================

exportExpensesButton.addEventListener("click", () => {

    const expenses = app.getAllExpenses();

    if (!expenses || expenses.length === 0) {
        showToast("لا توجد مصروفات للتصدير");
        return;
    }


    const success = excel.exportExpenses(expenses);

    if (success) {
        showToast("تم تصدير المصروفات ✅");
    }

});


// ============================================================
// NUMBER FORMAT
// ============================================================

function formatNumber(number) {

    return new Intl.NumberFormat("ar-SD")
        .format(Number(number) || 0);

}


// ============================================================
// HTML SECURITY
// ============================================================

function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// ============================================================
// TOAST
// ============================================================

let toastTimer;


function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}


// ============================================================
// MONTHLY REPORT CHECK
// ============================================================

function checkMonthlyReport() {

    const journeys = app.data.journeys;

    if (!journeys || journeys.length === 0) return;


    const journey = journeys[journeys.length - 1];

    if (!journey.startDate) return;


    const start = new Date(journey.startDate);
    const now = new Date();

    const diffDays = Math.floor(
        (now - start) / (1000 * 60 * 60 * 24)
    );


    const monthsPassed = Math.floor(diffDays / 30);

    const lastMonth = journey.lastReportMonth || 0;


    if (monthsPassed > lastMonth) {

        const newMonth = monthsPassed;

        pendingReport = generateMonthlyReport(journey, newMonth);

        openModal(monthlyReportNotificationModal);

    }

}


function generateMonthlyReport(journey, monthNumber) {

    const start = new Date(journey.startDate);

    const monthStart = new Date(start);
    monthStart.setDate(start.getDate() + (monthNumber - 1) * 30);

    const monthEnd = new Date(start);
    monthEnd.setDate(start.getDate() + monthNumber * 30);


    const tasks = journey.journeyTasks || [];

    const total = tasks.length;

    const completed = tasks.filter(t => t.completed).length;

    const failed = total - completed;

    const rate = total > 0
        ? Math.round((completed / total) * 100)
        : 0;


    const previousReports = app.data.reports.filter(
        r => r.journeyName === journey.journeyName
    );

    const previousReport = previousReports.find(
        r => r.monthNumber === monthNumber - 1
    );

    const previousRate = previousReport
        ? previousReport.completionRate
        : null;

    const progressDiff = previousRate !== null
        ? rate - previousRate
        : null;


    return {

        id: Date.now(),

        journeyName: journey.journeyName,

        monthNumber: monthNumber,

        startDate: monthStart.toISOString(),

        endDate: monthEnd.toISOString(),

        totalTasks: total,

        completedTasks: completed,

        failedTasks: failed,

        completionRate: rate,

        previousRate: previousRate,

        progressDiff: progressDiff,

        tasksSnapshot: JSON.parse(JSON.stringify(tasks)),

        createdAt: new Date().toISOString()

    };

}


// ============================================================
// NOTIFICATION ACTIONS
// ============================================================

viewReportButton.addEventListener("click", () => {

    closeModal(monthlyReportNotificationModal);

    if (pendingReport) {
        showReport(pendingReport);
    }

});


dismissReportButton.addEventListener("click", () => {

    if (pendingReport) {

        app.data.reports.push(pendingReport);

        const journeys = app.data.journeys;

        if (journeys.length > 0) {
            journeys[journeys.length - 1].lastReportMonth =
                pendingReport.monthNumber;
        }

        app.save();

        pendingReport = null;

    }


    closeModal(monthlyReportNotificationModal);
    showToast("التقرير اتحفظ في الأرشيف");

});


// ============================================================
// SHOW REPORT
// ============================================================

function showReport(report) {

    currentReport = report;

    reportModalEyebrow.textContent =
        `الشهر ${report.monthNumber}`;

    reportModalTitle.textContent =
        `تقرير ${report.journeyName}`;


    let comparisonHtml = "";


    if (report.previousRate === null) {

        comparisonHtml = `
            <div class="report-comparison same">
                <span class="report-comparison-text">
                    أول شهر في الرحلة
                </span>
                <span class="report-comparison-value">
                    —
                </span>
            </div>
        `;

    } else {

        const diff = report.progressDiff;

        let cls = "same";
        let symbol = "=";

        if (diff > 0) {
            cls = "up";
            symbol = "▲";
        } else if (diff < 0) {
            cls = "down";
            symbol = "▼";
        }


        const sign = diff > 0 ? "+" : "";

        comparisonHtml = `
            <div class="report-comparison ${cls}">
                <span class="report-comparison-text">
                    مقارنة بالشهر السابق (${report.previousRate}%)
                </span>
                <span class="report-comparison-value">
                    ${symbol} ${sign}${diff}%
                </span>
            </div>
        `;

    }


    const tasksHtml = (report.tasksSnapshot || [])
        .map(task => `
            <div class="report-task-row ${task.completed ? "done" : "failed"}">
                <i class="fa-solid ${task.completed
                    ? "fa-circle-check"
                    : "fa-circle-xmark"}"></i>
                <span class="report-task-name">
                    ${escapeHTML(task.taskName)}
                </span>
                <span class="report-task-status">
                    ${task.completed ? "مكتملة" : "فاشلة"}
                </span>
            </div>
        `)
        .join("");


    reportContent.innerHTML = `

        <div class="report-header-card">
            <span>${escapeHTML(report.journeyName)}</span>
            <strong>الشهر ${report.monthNumber}</strong>
            <small>
                ${formatDateAr(report.startDate)}
                —
                ${formatDateAr(report.endDate)}
            </small>
        </div>


        <div class="report-stats-grid">

            <div class="report-stat-card primary">
                <span>نسبة الإنجاز</span>
                <strong>${report.completionRate}%</strong>
            </div>

            <div class="report-stat-card">
                <span>إجمالي المهام</span>
                <strong>${report.totalTasks}</strong>
            </div>

            <div class="report-stat-card success">
                <span>مكتملة</span>
                <strong>${report.completedTasks}</strong>
            </div>

            <div class="report-stat-card danger">
                <span>فاشلة</span>
                <strong>${report.failedTasks}</strong>
            </div>

        </div>


        ${comparisonHtml}


        <div class="report-section">

            <h4>تفاصيل المهام</h4>

            ${tasksHtml || '<p style="color: var(--text-secondary); text-align: center; font-size: 12px;">لا توجد مهام</p>'}

        </div>

    `;


    openModal(reportModal);

}


// ============================================================
// EXPORT REPORT
// ============================================================

exportReportButton.addEventListener("click", () => {

    if (!currentReport) return;


    const success = excel.exportJourneyReport(currentReport);

    if (success) {
        showToast("تم تصدير التقرير ✅");
    }

});


// ============================================================
// OLD REPORTS
// ============================================================

function openOldReportsModal() {

    const reports = app.data.reports;


    if (!reports || reports.length === 0) {

        oldReportsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fa-solid fa-folder-open"></i>
                </div>
                <h3>لا توجد تقارير بعد</h3>
                <p>تقارير الشهور السابقة هتظهر هنا</p>
            </div>
        `;

    } else {

        const sorted = [...reports].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );


        oldReportsList.innerHTML = sorted.map(report => `
            <div class="old-report-card" data-report-id="${report.id}">

                <div class="old-report-header">

                    <span class="old-report-title">
                        ${escapeHTML(report.journeyName)}
                    </span>

                    <span class="old-report-month">
                        الشهر ${report.monthNumber}
                    </span>

                </div>

                <div class="old-report-meta">

                    <span>
                        ${report.completedTasks} / ${report.totalTasks} مهام
                    </span>

                    <span class="old-report-rate">
                        ${report.completionRate}%
                    </span>

                </div>

            </div>
        `).join("");


        oldReportsList.querySelectorAll(".old-report-card")
            .forEach((card) => {

                card.addEventListener("click", () => {

                    const id = Number(card.dataset.reportId);

                    const report = app.data.reports.find(
                        r => r.id === id
                    );

                    if (report) {

                        closeModal(oldReportsModal);

                        setTimeout(() => {
                            showReport(report);
                        }, 250);

                    }

                });

            });

    }


    openModal(oldReportsModal);

}


// ============================================================
// DATE FORMAT (عربي)
// ============================================================

function formatDateAr(date) {

    if (!date) return "";

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) return "";


    return d.toLocaleDateString("ar-SD", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

}


// ============================================================
// INIT
// ============================================================

function initUI() {

    storage.loadAll();

    loadTheme();

    renderTasks();
    renderJourneys();
    renderExpenses();
    renderHome();

    showTab("tasks");
    showPage("home");


    setTimeout(checkMonthlyReport, 1000);

}


if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", initUI);

} else {

    initUI();

}
