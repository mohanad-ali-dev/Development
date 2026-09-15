// ============================================================
// Development — تطور
// excel.js
// Excel Export — تصدير Excel
// ============================================================

// ============================================================
// ملاحظة مهمة:
// نستخدم SheetJS من CDN
// لازم نضيفه في index.html:
// <script src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>
// ============================================================


// ============================================================
// فحص إن SheetJS محمّل
// ============================================================

function isXLSXLoaded() {

    return typeof window.XLSX !== "undefined";

}


// ============================================================
// تحويل التاريخ لصيغة مقروءة
// ============================================================

function formatDate(date) {

    if (!date) return "";

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) return "";

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;

}


// ============================================================
// تصدير المصروفات
// ============================================================

function exportExpenses(expenses, filename = "expenses") {

    if (!isXLSXLoaded()) {

        alert("مكتبة Excel لم تُحمّل. تأكد من الإنترنت.");

        return false;

    }


    if (!expenses || expenses.length === 0) {

        alert("لا توجد مصروفات للتصدير");

        return false;

    }


    // ترتيب من الأحدث للأقدم
    const sorted = [...expenses].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );


    // تجهيز الصفوف
    const rows = sorted.map((expense) => ({

        "التاريخ": formatDate(expense.date),

        "نوع المصروف": getExpenseNameAr(expense.expenseName),

        "المبلغ (جنيه)": Number(expense.amount || 0)

    }));


    // إنشاء Sheet
    const worksheet = window.XLSX.utils.json_to_sheet(rows);


    // ضبط عرض الأعمدة
    worksheet["!cols"] = [
        { wch: 20 },   // التاريخ
        { wch: 20 },   // النوع
        { wch: 15 }    // المبلغ
    ];


    // إنشاء Workbook
    const workbook = window.XLSX.utils.book_new();

    window.XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "المصروفات"
    );


    // اسم الملف مع التاريخ
    const dateStr = new Date()
        .toISOString()
        .split("T")[0];

    const fullName = `${filename}_${dateStr}.xlsx`;


    // تنزيل
    window.XLSX.writeFile(workbook, fullName);

    return true;

}


// ============================================================
// تصدير تقرير الرحلة الشهري
// ============================================================

function exportJourneyReport(report) {

    if (!isXLSXLoaded()) {

        alert("مكتبة Excel لم تُحمّل. تأكد من الإنترنت.");

        return false;

    }


    if (!report) {

        alert("لا يوجد تقرير للتصدير");

        return false;

    }


    const workbook = window.XLSX.utils.book_new();


    // ============================================================
    // Sheet 1: الملخص
    // ============================================================

    const summaryRows = [

        ["تقرير رحلة", report.journeyName],

        ["الشهر", `الشهر ${report.monthNumber}`],

        ["من", formatDate(report.startDate)],

        ["إلى", formatDate(report.endDate)],

        ["", ""],

        ["إجمالي المهام", report.totalTasks],

        ["المهام المكتملة", report.completedTasks],

        ["المهام الفاشلة", report.failedTasks],

        ["نسبة الإنجاز", `${report.completionRate}%`],

        ["", ""],

        ["نسبة الشهر السابق",
            report.previousRate !== null
                ? `${report.previousRate}%`
                : "الشهر الأول"],

        ["التطور",
            report.progressDiff !== null
                ? `${report.progressDiff > 0 ? "+" : ""}${report.progressDiff}%`
                : "—"]

    ];


    const summarySheet =
        window.XLSX.utils.aoa_to_sheet(summaryRows);

    summarySheet["!cols"] = [
        { wch: 25 },
        { wch: 25 }
    ];


    window.XLSX.utils.book_append_sheet(
        workbook,
        summarySheet,
        "الملخص"
    );


    // ============================================================
    // Sheet 2: المهام
    // ============================================================

    const tasksRows = (report.tasksSnapshot || []).map(
        (task, index) => ({

            "الرقم": index + 1,

            "اسم المهمة": task.taskName,

            "التصنيف": getClassificationAr(task.classification),

            "المدة (أيام)": task.completionTime || "—",

            "الحالة": task.completed ? "مكتملة" : "فاشلة"

        })
    );


    const tasksSheet =
        window.XLSX.utils.json_to_sheet(tasksRows);


    tasksSheet["!cols"] = [
        { wch: 8 },
        { wch: 30 },
        { wch: 12 },
        { wch: 12 },
        { wch: 12 }
    ];


    window.XLSX.utils.book_append_sheet(
        workbook,
        tasksSheet,
        "المهام"
    );


    // ============================================================
    // حفظ الملف
    // ============================================================

    const safeName = report.journeyName
        .replace(/[^\w\u0600-\u06FF\s-]/g, "")
        .trim()
        .replace(/\s+/g, "_");


    const fileName =
        `${safeName}_الشهر${report.monthNumber}.xlsx`;


    window.XLSX.writeFile(workbook, fileName);

    return true;

}


// ============================================================
// دوال مساعدة
// ============================================================

function getExpenseNameAr(name) {

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


function getClassificationAr(classification) {

    const names = {

        normal: "عادية",
        priority: "أولوية",
        special: "خاصة"

    };


    return names[classification] || classification || "عادية";

}


// ============================================================
// تصدير
// ============================================================

export const excel = {
    exportExpenses,
    exportJourneyReport
};
