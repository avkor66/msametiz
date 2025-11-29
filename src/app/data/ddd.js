"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var fs = require("fs");
// Предполагаемый импорт вашего справочного объекта
// import { boltsByGost, GostBoltData } from './your-gost-bolts-data';
// --- Справочный объект (для самодостаточности примера) ---
var boltsByGost = {
    'ГОСТ 7798-70': {
        title: 'Болты с шестигранной головкой, класс точности В',
        type: 'болт',
        headType: 'Шестигранная',
        accuracyClass: 'B',
        thread: 'M',
        steelGrades: ['Ст3', '10', '20', '35', '40', '35Х', '30Х3МФ'], // Сокращенный список для примера
        gost: 'ГОСТ 7798-70',
        sourceNote: 'Стандартный болт общего назначения.',
        sizes: {
            M12: { P: 1.75, S: 18, k: 7.5, designation: 'Болт M12 ГОСТ 7798-70', range: [20, 200], step: 10, },
            M14: { P: 2.0, S: 21, k: 8.8, designation: 'Болт M14 ГОСТ 7798-70', range: [25, 200], step: 10, },
            M16: { P: 2.0, S: 24, k: 10.0, designation: 'Болт M16 ГОСТ 7798-70', range: [30, 250], step: 10, },
            M18: { P: 2.5, S: 27, k: 11.5, designation: 'Болт M18 ГОСТ 7798-70', range: [30, 250], step: 10, },
            M20: { P: 2.5, S: 30, k: 12.5, designation: 'Болт M20 ГОСТ 7798-70', range: [35, 300], step: 10, },
            M22: { P: 2.5, S: 34, k: 14.0, designation: 'Болт M22 ГОСТ 7798-70', range: [40, 300], step: 10, },
            M24: { P: 3.0, S: 36, k: 15.0, designation: 'Болт M24 ГОСТ 7798-70', range: [40, 300], step: 10, },
            M27: { P: 3.0, S: 41, k: 17.0, designation: 'Болт M27 ГОСТ 7798-70', range: [50, 350], step: 10, },
            M30: { P: 3.5, S: 46, k: 18.7, designation: 'Болт M30 ГОСТ 7798-70', range: [50, 400], step: 20, },
            M36: { P: 4.0, S: 55, k: 22.5, designation: 'Болт M36 ГОСТ 7798-70', range: [60, 450], step: 20, },
            M42: { P: 4.5, S: 65, k: 26.0, designation: 'Болт M42 ГОСТ 7798-70', range: [70, 500], step: 20, },
            M48: { P: 5.0, S: 75, k: 30.0, designation: 'Болт M48 ГОСТ 7798-70', range: [80, 500], step: 20, }
        }
    }
};
// ----------------------------------------------------------------------
/**
 * Генерирует полный массив объектов-товаров для заданного ГОСТа,
 * перебирая все диаметры, длины и марки стали, и записывает результат в файл.
 * * @param gostKey Ключ ГОСТа (например, 'ГОСТ 7798-70').
 * @param gostKey
 * @param outputFilename Имя файла для сохранения JSON.
 */
function generateAndSaveAllProducts(gostKey, outputFilename) {
    if (outputFilename === void 0) { outputFilename = 'products_gost7798.json'; }
    var gostData = boltsByGost[gostKey];
    if (!gostData || !gostData.sizes) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430: \u0414\u0430\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u0413\u041E\u0421\u0422 ".concat(gostKey, " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B."));
        return;
    }
    var allProducts = [];
    var standard = gostKey;
    var steelGrades = gostData.steelGrades;
    // Функция для определения класса прочности (для более информативного описания)
    var getStrengthClass = function (steelGrade) {
        if (['Ст3', '10', '20'].includes(steelGrade))
            return '5.8';
        if (['35', '40', '35Г2', '20Г2Р'].includes(steelGrade))
            return '8.8';
        if (['35Х', '40Х', '38ХА'].includes(steelGrade))
            return '10.9';
        if (['30Х3МФ', '40ХН2МА'].includes(steelGrade))
            return '12.9';
        return '';
    };
    // 1. Итерация по всем диаметрам (ключам 'M6', 'M12', 'M20', ...)
    for (var _i = 0, _a = Object.keys(gostData.sizes); _i < _a.length; _i++) {
        var diameterKey = _a[_i];
        // Явно приводим тип diameterKey к ключам объекта sizes:
        var key = diameterKey;
        // Теперь TypeScript знает, что key безопасен для индексации
        var sizeSpec = gostData.sizes[key];
        var _b = sizeSpec.range, minL = _b[0], maxL = _b[1];
        var step = sizeSpec.step, P = sizeSpec.P, S = sizeSpec.S, k = sizeSpec.k;
        // 2. Итерация по всем маркам стали
        for (var _c = 0, steelGrades_1 = steelGrades; _c < steelGrades_1.length; _c++) {
            var steelGrade = steelGrades_1[_c];
            var strengthClass = getStrengthClass(steelGrade);
            // 3. Итерация по всем доступным длинам
            for (var length_1 = minL; length_1 <= maxL; length_1 += step) {
                var id = "metiz-bolt-".concat(standard, "-").concat(diameterKey, "-").concat(steelGrade, "-L").concat(length_1);
                var name_1 = "\u0411\u043E\u043B\u0442 ".concat(diameterKey, "x").concat(length_1, " ").concat(standard);
                var description = "\u0411\u043E\u043B\u0442 ".concat(strengthClass ? "\u043A\u043B\u0430\u0441\u0441\u0430 \u043F\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u0438 ".concat(strengthClass) : '', ". \u041A\u043B\u0430\u0441\u0441 \u0442\u043E\u0447\u043D\u043E\u0441\u0442\u0438 ").concat(gostData.accuracyClass, ". \u0421\u0442\u0430\u043B\u044C ").concat(steelGrade, ".");
                allProducts.push({
                    "id": id,
                    "name": name_1,
                    "description": description,
                    "price": 0.0,
                    "imageUrl": "assets/products/bolt.png",
                    "stateStandard": standard,
                    "diameter": diameterKey,
                    "steelGrade": steelGrade,
                    "height": k,
                    "outerDiameter": 0,
                    "innerDiameter": 0,
                    "species": "болт",
                    "length": "".concat(length_1, "mm"),
                    "threadLength": "",
                    "threadPitch": P,
                    "spannerSize": S,
                    "weightKg": 0,
                    "plateDimensions": "",
                    "anchorSpecifications": ""
                });
            }
        }
    }
    // Запись массива в файл
    try {
        var jsonString = JSON.stringify(allProducts, null, 2);
        fs.writeFileSync(outputFilename, jsonString, 'utf-8');
        console.log("\u2705 \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043E ".concat(allProducts.length, " \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u0438 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u043E \u0432 \u0444\u0430\u0439\u043B: ").concat(outputFilename));
    }
    catch (error) {
        console.error("\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u043F\u0438\u0441\u0438 \u0432 \u0444\u0430\u0439\u043B:", error);
    }
}
// Запуск функции
generateAndSaveAllProducts('ГОСТ 7798-70');
