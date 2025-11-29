// @ts-ignore
import * as fs from 'fs';
// Предполагаемый импорт вашего справочного объекта
// import { boltsByGost, GostBoltData } from './your-gost-bolts-data';

// --- Справочный объект (для самодостаточности примера) ---
const boltsByGost = {
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
            M12: {P: 1.75, S: 18, k: 7.5, designation: 'Болт M12 ГОСТ 7798-70', range: [20, 200], step: 10,},
            M14: {P: 2.0, S: 21, k: 8.8, designation: 'Болт M14 ГОСТ 7798-70', range: [25, 200], step: 10,},
            M16: {P: 2.0, S: 24, k: 10.0, designation: 'Болт M16 ГОСТ 7798-70', range: [30, 250], step: 10,},
            M18: {P: 2.5, S: 27, k: 11.5, designation: 'Болт M18 ГОСТ 7798-70', range: [30, 250], step: 10,},
            M20: {P: 2.5, S: 30, k: 12.5, designation: 'Болт M20 ГОСТ 7798-70', range: [35, 300], step: 10,},
            M22: {P: 2.5, S: 34, k: 14.0, designation: 'Болт M22 ГОСТ 7798-70', range: [40, 300], step: 10,},
            M24: {P: 3.0, S: 36, k: 15.0, designation: 'Болт M24 ГОСТ 7798-70', range: [40, 300], step: 10,},
            M27: {P: 3.0, S: 41, k: 17.0, designation: 'Болт M27 ГОСТ 7798-70', range: [50, 350], step: 10,},
            M30: {P: 3.5, S: 46, k: 18.7, designation: 'Болт M30 ГОСТ 7798-70', range: [50, 400], step: 20,},
            M36: {P: 4.0, S: 55, k: 22.5, designation: 'Болт M36 ГОСТ 7798-70', range: [60, 450], step: 20,},
            M42: {P: 4.5, S: 65, k: 26.0, designation: 'Болт M42 ГОСТ 7798-70', range: [70, 500], step: 20,},
            M48: {P: 5.0, S: 75, k: 30.0, designation: 'Болт M48 ГОСТ 7798-70', range: [80, 500], step: 20,}
        }
    },
    'ГОСТ 7805-70': {
        title: 'Болты с шестигранной головкой, класс точности А',
        type: 'болт',
        headType: 'Шестигранная',
        accuracyClass: 'A',
        thread: 'M',

        // Марки стали идентичны ГОСТ 7798-70, поскольку определяются классом прочности
        steelGrades: [
            'Ст3', '10', '20',
            '35', '40', '35Г2', '20Г2Р',
            '35Х', '40Х', '38ХА',
            '30Х3МФ', '40ХН2МА'
        ],

        gost: 'ГОСТ 7805-70',
        sourceNote: 'Болт повышенной точности. Геометрические параметры соответствуют крупному шагу резьбы.',
        sizes: {
            M6: {P: 1.0, S: 10, k: 4.0, designation: 'Болт M6 ГОСТ 7805-70', range: [10, 100], step: 5,},
            M8: {P: 1.25, S: 13, k: 5.3, designation: 'Болт M8 ГОСТ 7805-70', range: [12, 120], step: 5,},
            M10: {P: 1.5, S: 16, k: 6.4, designation: 'Болт M10 ГОСТ 7805-70', range: [16, 150], step: 5,},
            M12: {P: 1.75, S: 18, k: 7.5, designation: 'Болт M12 ГОСТ 7805-70', range: [20, 200], step: 10,},
            M14: {P: 2.0, S: 21, k: 8.8, designation: 'Болт M14 ГОСТ 7805-70', range: [25, 200], step: 10,},
            M16: {P: 2.0, S: 24, k: 10.0, designation: 'Болт M16 ГОСТ 7805-70', range: [30, 250], step: 10,},
            M18: {P: 2.5, S: 27, k: 11.5, designation: 'Болт M18 ГОСТ 7805-70', range: [30, 250], step: 10,},
            M20: {P: 2.5, S: 30, k: 12.5, designation: 'Болт M20 ГОСТ 7805-70', range: [35, 300], step: 10,},
            M22: {P: 2.5, S: 34, k: 14.0, designation: 'Болт M22 ГОСТ 7805-70', range: [40, 300], step: 10,},
            M24: {P: 3.0, S: 36, k: 15.0, designation: 'Болт M24 ГОСТ 7805-70', range: [40, 300], step: 10,},
            M27: {P: 3.0, S: 41, k: 17.0, designation: 'Болт M27 ГОСТ 7805-70', range: [50, 350], step: 10,},
            M30: {P: 3.5, S: 46, k: 18.7, designation: 'Болт M30 ГОСТ 7805-70', range: [50, 400], step: 20,},
            M36: {P: 4.0, S: 55, k: 22.5, designation: 'Болт M36 ГОСТ 7805-70', range: [60, 450], step: 20,},
            M42: {P: 4.5, S: 65, k: 26.0, designation: 'Болт M42 ГОСТ 7805-70', range: [70, 500], step: 20,},
            M48: {P: 5.0, S: 75, k: 30.0, designation: 'Болт M48 ГОСТ 7805-70', range: [80, 500], step: 20,}
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
export function generateAndSaveAllProducts(gostKey: keyof typeof boltsByGost, outputFilename: string = 'products_gost7798.json'): void {
    const gostData = boltsByGost[gostKey];
    if (!gostData || !gostData.sizes) {
    console.error(`Ошибка: Данные для ГОСТ ${gostKey} не найдены.`);
    return;
}

const allProducts = [];
const standard = gostKey;
const steelGrades = gostData.steelGrades;

// Функция для определения класса прочности (для более информативного описания)
const getStrengthClass = (steelGrade: string): string => {
    if (['Ст3', '10', '20'].includes(steelGrade)) return '5.8';
    if (['35', '40', '35Г2', '20Г2Р'].includes(steelGrade)) return '8.8';
    if (['35Х', '40Х', '38ХА'].includes(steelGrade)) return '10.9';
    if (['30Х3МФ', '40ХН2МА'].includes(steelGrade)) return '12.9';
    return '';
};

// 1. Итерация по всем диаметрам (ключам 'M6', 'M12', 'M20', ...)
    for (const diameterKey of Object.keys(gostData.sizes)) {
        // Явно приводим тип diameterKey к ключам объекта sizes:
        const key = diameterKey as keyof typeof gostData.sizes;

        // Теперь TypeScript знает, что key безопасен для индексации
        const sizeSpec = gostData.sizes[key];
    const [minL, maxL] = sizeSpec.range;
    const { step, P, S, k } = sizeSpec;

    // 2. Итерация по всем маркам стали
    for (const steelGrade of steelGrades) {
        const strengthClass = getStrengthClass(steelGrade);

        // 3. Итерация по всем доступным длинам
        for (let length = minL; length <= maxL; length += step) {

            const id = `metiz-bolt-${standard}-${diameterKey}-${steelGrade}-L${length}`;
            const name = `Болт ${diameterKey}x${length} ${standard}`;
            const description = `Болт ${strengthClass ? `класса прочности ${strengthClass}` : ''}. Класс точности ${gostData.accuracyClass}. Сталь ${steelGrade}.`;

            allProducts.push({
                "id": id,
                "name": name,
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
                "length": `${length}mm`,
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
    const jsonString = JSON.stringify(allProducts, null, 2);
    fs.writeFileSync(outputFilename, jsonString, 'utf-8');
    console.log(`✅ Успешно сгенерировано ${allProducts.length} товаров и записано в файл: ${outputFilename}`);
} catch (error) {
    console.error(`❌ Ошибка при записи в файл:`, error);
}
}

// Запуск функции

// generateAndSaveAllProducts('ГОСТ 7805-70');
// generateAndSaveAllProducts('ГОСТ 7798-70');
// компиляция
// tsc src/app/ddd.ts --target es2020 --outDir dist