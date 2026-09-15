// ============================================================
// Development — تطور
// storage.js
// Storage Layer — طبقة التخزين
// ============================================================

import { developmentData } from "./data.js";


// ============================================================
// مفتاح التخزين
// ============================================================

const STORAGE_KEY = "tatawor_data_v1";


// ============================================================
// فحص دعم localStorage
// ============================================================

function isAvailable() {

    try {

        const test = "__test__";

        localStorage.setItem(test, test);
        localStorage.removeItem(test);

        return true;

    } catch (error) {

        console.warn("localStorage غير متاح:", error);

        return false;

    }

}


// ============================================================
// حفظ كل البيانات
// ============================================================

function saveAll() {

    if (!isAvailable()) return false;


    try {

        const json = JSON.stringify(developmentData);

        localStorage.setItem(STORAGE_KEY, json);

        return true;

    } catch (error) {

        console.error("خطأ في الحفظ:", error);

        return false;

    }

}


// ============================================================
// تحميل كل البيانات
// ============================================================

function loadAll() {

    if (!isAvailable()) return false;


    try {

        const json = localStorage.getItem(STORAGE_KEY);

        if (!json) return false;


        const data = JSON.parse(json);


        // ندمج البيانات المحمّلة مع الهيكل الأساسي
        // (عشان لو في حقول جديدة ما تختفيش)

        if (data.settings) {
            Object.assign(
                developmentData.settings,
                data.settings
            );
        }

        if (Array.isArray(data.tasks)) {
            developmentData.tasks = data.tasks;
        }

        if (Array.isArray(data.journeys)) {
            developmentData.journeys = data.journeys;
        }

        if (Array.isArray(data.reports)) {
            developmentData.reports = data.reports;
        }

        if (Array.isArray(data.expenses)) {
            developmentData.expenses = data.expenses;
        }


        return true;

    } catch (error) {

        console.error("خطأ في التحميل:", error);

        return false;

    }

}


// ============================================================
// حذف كل البيانات
// ============================================================

function clearAll() {

    if (!isAvailable()) return false;


    try {

        localStorage.removeItem(STORAGE_KEY);

        return true;

    } catch (error) {

        console.error("خطأ في الحذف:", error);

        return false;

    }

}


// ============================================================
// هل في بيانات محفوظة؟
// ============================================================

function hasData() {

    if (!isAvailable()) return false;

    return localStorage.getItem(STORAGE_KEY) !== null;

}


// ============================================================
// حجم البيانات المحفوظة (KB)
// ============================================================

function getSize() {

    if (!isAvailable()) return 0;


    const json = localStorage.getItem(STORAGE_KEY);

    if (!json) return 0;


    const bytes = new Blob([json]).size;

    return Math.round((bytes / 1024) * 100) / 100;

}


// ============================================================
// تصدير
// ============================================================

export const storage = {
    saveAll,
    loadAll,
    clearAll,
    hasData,
    getSize,
    STORAGE_KEY
};

