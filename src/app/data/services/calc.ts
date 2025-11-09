import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  static getAvailableBoltLengths(stateStandard: string, value: string) {
    const data = boltLengthsByGost[stateStandard]?.lengths?.[value];
    if (!data) return [];

    const [min, max] = data.range;
    const { step } = data;

    // создаём список длин
    const result: string[] = [];
    for (let l = min; l <= max; l += step) {
      result.push(l.toString());
    }
    return result;
  }

  static getAvailableBoltDiameter(value: keyof typeof boltLengthsByGost): string[] {
    if (boltLengthsByGost[value].lengths) {
      return Object.keys(boltLengthsByGost[value].lengths);
    }
    return [];
  }

}




//ШАЙБЫ
// washers-data.ts
export interface WasherSizeData {
  d: number;              // диаметр под болт (мм)
  D: number;              // наружный диаметр шайбы (мм)
  t: number;              // толщина (мм)
  designation?: string;   // наименование, например "Шайба M12 ГОСТ 9065-75"
  steelGrades?: string[];
}

export interface GostWasherData {
  title: string;
  type: 'шайба';
  steelGrades: string[];
  sizes: Record<string, WasherSizeData>; // ключи: 'M6'..'M48'
  gost?: string;
}

export type WashersByGost = Record<string, GostWasherData>;

export const washersByGost: WashersByGost = {
  /** ГОСТ 9065-75 — шайбы плоские для болтов */
  'ГОСТ 9065-75': {
    title: 'Шайбы плоские ГОСТ 9065-75',
    type: 'шайба',
    steelGrades: ['35', '40Х', '45', '09Г2С'],
    sizes: {
      M6:  { d: 6,  D: 12,  t: 1.6, designation: 'Шайба M6 ГОСТ 9065-75' },
      M8:  { d: 8,  D: 16,  t: 2.0, designation: 'Шайба M8 ГОСТ 9065-75' },
      M10: { d: 10, D: 20,  t: 2.5, designation: 'Шайба M10 ГОСТ 9065-75' },
      M12: { d: 12, D: 24,  t: 3.0, designation: 'Шайба M12 ГОСТ 9065-75' },
      M16: { d: 16, D: 30,  t: 3.0, designation: 'Шайба M16 ГОСТ 9065-75' },
      M20: { d: 20, D: 37,  t: 3.5, designation: 'Шайба M20 ГОСТ 9065-75' },
      M24: { d: 24, D: 44,  t: 4.0, designation: 'Шайба M24 ГОСТ 9065-75' },
      M30: { d: 30, D: 55,  t: 4.5, designation: 'Шайба M30 ГОСТ 9065-75' },
      M36: { d: 36, D: 65,  t: 5.0, designation: 'Шайба M36 ГОСТ 9065-75' },
      M42: { d: 42, D: 75,  t: 6.0, designation: 'Шайба M42 ГОСТ 9065-75' },
      M48: { d: 48, D: 90,  t: 6.0, designation: 'Шайба M48 ГОСТ 9065-75' }
    }
  },

  /** ГОСТ 11371-78 — шайбы плоские повышенной прочности */
  'ГОСТ 11371-78': {
    title: 'Шайбы плоские ГОСТ 11371-78',
    type: 'шайба',
    steelGrades: ['40Х', '45', '09Г2С', '12Х18Н10Т'],
    sizes: {
      M6:  { d: 6,  D: 12, t: 2.0, designation: 'Шайба M6 ГОСТ 11371-78' },
      M8:  { d: 8,  D: 16, t: 2.5, designation: 'Шайба M8 ГОСТ 11371-78' },
      M10: { d: 10, D: 20, t: 3.0, designation: 'Шайба M10 ГОСТ 11371-78' },
      M12: { d: 12, D: 24, t: 3.0, designation: 'Шайба M12 ГОСТ 11371-78' },
      M16: { d: 16, D: 30, t: 3.5, designation: 'Шайба M16 ГОСТ 11371-78' },
      M20: { d: 20, D: 37, t: 4.0, designation: 'Шайба M20 ГОСТ 11371-78' },
      M24: { d: 24, D: 44, t: 4.5, designation: 'Шайба M24 ГОСТ 11371-78' },
      M30: { d: 30, D: 55, t: 5.0, designation: 'Шайба M30 ГОСТ 11371-78' },
      M36: { d: 36, D: 65, t: 5.0, designation: 'Шайба M36 ГОСТ 11371-78' },
      M42: { d: 42, D: 75, t: 6.0, designation: 'Шайба M42 ГОСТ 11371-78' },
      M48: { d: 48, D: 90, t: 6.0, designation: 'Шайба M48 ГОСТ 11371-78' }
    }
  }
};




//ГАЙКА
// nuts-data.ts
// import { StudsByGost } from './types';



export interface NutSizeData {
  P: number;              // шаг резьбы (мм)
  m: number;              // высота гайки (мм)
  designation?: string;   // "Гайка M12 ГОСТ 5915-70"
  steelGrades?: string[]; // марки стали
}

export interface GostNutData {
  title: string;
  type: 'гайка';
  thread: 'M';
  steelGrades: string[];
  sizes: Record<string, NutSizeData>; // ключи: 'M6'..'M48'
  gost?: string;
  sourceNote?: string;
}

export type NutsByGost = Record<string, GostNutData>;

export const nutsByGost: NutsByGost = {
  /** ГОСТ 5915-70 — шестигранные гайки */
  'ГОСТ 5915-70': {
    title: 'Гайки шестигранные, ГОСТ 5915-70',
    type: 'гайка',
    thread: 'M',
    steelGrades: ['35', '40Х', '45', '09Г2С'],
    sizes: {
      // M6:  { P: 1.0,  m: 5,  designation: 'Гайка M6 ГОСТ 5915-70' },
      // M8:  { P: 1.25, m: 6.5, designation: 'Гайка M8 ГОСТ 5915-70' },
      // M10: { P: 1.5,  m: 8,  designation: 'Гайка M10 ГОСТ 5915-70' },
      M12: { P: 1.75, m: 10, designation: 'Гайка M12 ГОСТ 5915-70' },
      M16: { P: 2.0,  m: 13, designation: 'Гайка M16 ГОСТ 5915-70' },
      M20: { P: 2.5,  m: 16, designation: 'Гайка M20 ГОСТ 5915-70' },
      M24: { P: 3.0,  m: 19, designation: 'Гайка M24 ГОСТ 5915-70' },
      M30: { P: 3.5,  m: 24, designation: 'Гайка M30 ГОСТ 5915-70' },
      M36: { P: 4.0,  m: 29, designation: 'Гайка M36 ГОСТ 5915-70' },
      M42: { P: 4.5,  m: 34, designation: 'Гайка M42 ГОСТ 5915-70' },
      M48: { P: 5.0,  m: 39, designation: 'Гайка M48 ГОСТ 5915-70' },
    }
  },

  /** ГОСТ 9064-75 — гайки прочие (обычно более высокие для болтов высокой прочности) */
  'ГОСТ 9064-75': {
    title: 'Гайки высокопрочные, ГОСТ 9064-75',
    type: 'гайка',
    thread: 'M',
    steelGrades: ['40Х', '45', '09Г2С', '12Х18Н10Т'],
    sizes: {
      // M6:  { P: 1.0,  m: 6,  designation: 'Гайка M6 ГОСТ 9064-75' },
      // M8:  { P: 1.25, m: 8,  designation: 'Гайка M8 ГОСТ 9064-75' },
      // M10: { P: 1.5,  m: 10, designation: 'Гайка M10 ГОСТ 9064-75' },
      M12: { P: 1.75, m: 12, designation: 'Гайка M12 ГОСТ 9064-75' },
      M16: { P: 2.0,  m: 16, designation: 'Гайка M16 ГОСТ 9064-75' },
      M20: { P: 2.5,  m: 20, designation: 'Гайка M20 ГОСТ 9064-75' },
      M24: { P: 3.0,  m: 24, designation: 'Гайка M24 ГОСТ 9064-75' },
      M30: { P: 3.5,  m: 30, designation: 'Гайка M30 ГОСТ 9064-75' },
      M36: { P: 4.0,  m: 36, designation: 'Гайка M36 ГОСТ 9064-75' },
      M42: { P: 4.5,  m: 42, designation: 'Гайка M42 ГОСТ 9064-75' },
      M48: { P: 5.0,  m: 48, designation: 'Гайка M48 ГОСТ 9064-75' },
    }
  }
};




type LengthData = { range: [number, number]; step: number };
type GostBoltData = {
  description?: string;
  lengths?: Record<string, LengthData>;
  executionTypes?: Record<string, LengthData>;
}
//БОЛТЫ
const boltLengthsByGost: Record<string, GostBoltData> = {
  //БОЛТЫ
  "ГОСТ 7798-70": {
    description: "Болты с шестигранной головкой класса точности В",
    lengths: {
      // M6: { range: [25, 300], step: 5 },
      // M8: { range: [25, 300], step: 5 },
      // M10: { range: [25, 300], step: 5 },
      M12: { range: [25, 300], step: 10 },
      M14: { range: [30, 300], step: 10 },
      M16: { range: [35, 300], step: 10 },
      M18: { range: [40, 300], step: 10 },
      M20: { range: [45, 300], step: 10 },
      M22: { range: [50, 300], step: 10 },
      M24: { range: [55, 300], step: 10 },
      M27: { range: [60, 300], step: 10 },
      M30: { range: [65, 300], step: 10 },
      M33: { range: [70, 300], step: 10 },
      M36: { range: [75, 300], step: 10 },
      M39: { range: [80, 300], step: 10 },
      M42: { range: [85, 300], step: 10 },
      M45: { range: [90, 300], step: 10 },
      M48: { range: [95, 300], step: 10 }
    }
  },

  // "ГОСТ 1759.0-87": {
  //   description: "Болты, винты, шпильки и гайки с метрической резьбой",
  //   lengths: {
  //     M1: { range: [3, 20], step: 1 },
  //     M2: { range: [4, 25], step: 1 },
  //     M3: { range: [5, 30], step: 1 },
  //     M4: { range: [6, 35], step: 1 },
  //     M5: { range: [8, 40], step: 1 },
  //     M6: { range: [10, 45], step: 2 },
  //     M8: { range: [12, 50], step: 2 },
  //     M10: { range: [15, 60], step: 2 },
  //     M12: { range: [20, 70], step: 2 },
  //     M14: { range: [25, 80], step: 2 },
  //     M16: { range: [30, 90], step: 2 },
  //     M18: { range: [35, 100], step: 2 },
  //     M20: { range: [40, 110], step: 2 },
  //     M22: { range: [45, 120], step: 2 },
  //     M24: { range: [50, 130], step: 2 },
  //     M27: { range: [55, 140], step: 2 },
  //     M30: { range: [60, 150], step: 2 },
  //     M33: { range: [65, 160], step: 2 },
  //     M36: { range: [70, 170], step: 2 },
  //     M39: { range: [75, 180], step: 2 },
  //     M42: { range: [80, 190], step: 2 },
  //     M45: { range: [85, 200], step: 2 },
  //     M48: { range: [90, 210], step: 2 }
  //   }
  // },

  "ГОСТ 24379.1-2012": {
    description: "Фундаментные болты диаметром резьбы от 12 до 140 мм",
    lengths: {
      M12: { range: [80, 250], step: 10 },
      M16: { range: [90, 300], step: 10 },
      M20: { range: [100, 350], step: 10 },
      M24: { range: [110, 400], step: 10 },
      M30: { range: [120, 450], step: 10 },
      M36: { range: [130, 500], step: 10 },
      M42: { range: [140, 550], step: 10 },
      M48: { range: [150, 600], step: 10 },
      M56: { range: [160, 650], step: 10 },
      M64: { range: [170, 700], step: 10 },
      M72: { range: [180, 750], step: 10 },
      M80: { range: [190, 800], step: 10 },
      M90: { range: [200, 850], step: 10 },
      M100: { range: [210, 900], step: 10 },
      M110: { range: [220, 950], step: 10 },
      M120: { range: [230, 1000], step: 10 },
      M130: { range: [240, 1050], step: 10 },
      M140: { range: [250, 1100], step: 10 }
    }
  },
  // "ГОСТ 24379.1-80": {
  //   description: "Фундаментные болты диаметром резьбы от 12 до 140 мм",
  //   lengths: {
  //     M12: { range: [80, 250], step: 10 },
  //     M16: { range: [90, 300], step: 10 },
  //     M20: { range: [100, 350], step: 10 },
  //     M24: { range: [110, 400], step: 10 },
  //     M30: { range: [120, 450], step: 10 },
  //     M36: { range: [130, 500], step: 10 },
  //     M42: { range: [140, 550], step: 10 },
  //     M48: { range: [150, 600], step: 10 },
  //     M56: { range: [160, 650], step: 10 },
  //     M64: { range: [170, 700], step: 10 },
  //     M72: { range: [180, 750], step: 10 },
  //     M80: { range: [190, 800], step: 10 },
  //     M90: { range: [200, 850], step: 10 },
  //     M100: { range: [210, 900], step: 10 },
  //     M110: { range: [220, 950], step: 10 },
  //     M120: { range: [230, 1000], step: 10 },
  //     M130: { range: [240, 1050], step: 10 },
  //     M140: { range: [250, 1100], step: 10 }
  //   }
  // },

  "ГОСТ 28778-90": {
    description: "Болты самоанкерующиеся распорные (БСР)",
    lengths: {
      // M6: { range: [65, 300], step: 5 },
      // M8: { range: [85, 300], step: 5 },
      // M10: { range: [100, 300], step: 5 },
      M12: { range: [110, 300], step: 10 },
      M14: { range: [120, 300], step: 10 },
      M16: { range: [150, 300], step: 10 },
      M18: { range: [160, 300], step: 10 },
      M20: { range: [170, 300], step: 10 },
      M22: { range: [180, 300], step: 10 },
      M24: { range: [190, 300], step: 10 }
    }
  },
  //
  //
  // "ГОСТ 10605-94": {
  //   description: "Гайки шестигранные с диаметром резьбы свыше 48 мм класса точности B",
  //   lengths: {
  //     M52: { range: [30, 150], step: 5 },
  //     M56: { range: [35, 160], step: 5 },
  //     M60: { range: [40, 170], step: 5 },
  //     M64: { range: [45, 180], step: 5 },
  //     M68: { range: [50, 190], step: 5 },
  //     M72: { range: [55, 200], step: 5 },
  //     M76: { range: [60, 210], step: 5 },
  //     M80: { range: [65, 220], step: 5 },
  //     M84: { range: [70, 230], step: 5 },
  //     M88: { range: [75, 240], step: 5 },
  //     M92: { range: [80, 250], step: 5 },
  //     M96: { range: [85, 260], step: 5 },
  //     M100: { range: [90, 270], step: 5 },
  //     M104: { range: [95, 280], step: 5 },
  //     M108: { range: [100, 290], step: 5 },
  //     M112: { range: [105, 300], step: 5 }
  //   }
  // },
  // "ГОСТ 10607-94": {
  //   description: "Гайки шестигранные низкие (с фаской) с диаметром резьбы свыше 48 мм класса точности B",
  //   lengths: {
  //     M52: { range: [25, 130], step: 5 },
  //     M56: { range: [30, 140], step: 5 },
  //     M60: { range: [35, 150], step: 5 },
  //     M64: { range: [40, 160], step: 5 },
  //     M68: { range: [45, 170], step: 5 },
  //     M72: { range: [50, 180], step: 5 },
  //     M76: { range: [55, 190], step: 5 },
  //     M80: { range: [60, 200], step: 5 },
  //     M84: { range: [65, 210], step: 5 },
  //     M88: { range: [70, 220], step: 5 },
  //     M92: { range: [75, 230], step: 5 },
  //     M96: { range: [80, 240], step: 5 },
  //     M100: { range: [85, 250], step: 5 },
  //     M104: { range: [90, 260], step: 5 },
  //     M108: { range: [95, 270], step: 5 },
  //     M112: { range: [100, 280], step: 5 }
  //   }
  // },
  // "ГОСТ 15522-70": {
  //   description: "Гайки шестигранные низкие с уменьшенным размером 'под ключ' класса точности B",
  //   lengths: {
  //     M6: { range: [4, 25], step: 1 },
  //     M8: { range: [5, 30], step: 1 },
  //     M10: { range: [6, 35], step: 1 },
  //     M12: { range: [7, 40], step: 1 },
  //     M14: { range: [8, 45], step: 1 },
  //     M16: { range: [9, 50], step: 1 },
  //     M18: { range: [10, 55], step: 1 },
  //     M20: { range: [11, 60], step: 1 },
  //     M22: { range: [12, 65], step: 1 },
  //     M24: { range: [13, 70], step: 1 },
  //     M27: { range: [14, 75], step: 1 },
  //     M30: { range: [15, 80], step: 1 },
  //     M33: { range: [16, 85], step: 1 },
  //     M36: { range: [17, 90], step: 1 },
  //     M39: { range: [18, 95], step: 1 },
  //     M42: { range: [19, 100], step: 1 },
  //     M45: { range: [20, 105], step: 1 },
  //     M48: { range: [21, 110], step: 1 }
  //   }
  // },
  // "ГОСТ 15523-70": {
  //   description: "Гайки шестигранные высокие класса точности B",
  //   lengths: {
  //     M6: { range: [5, 30], step: 1 },
  //     M8: { range: [6, 35], step: 1 },
  //     M10: { range: [7, 40], step: 1 },
  //     M12: { range: [8, 45], step: 1 },
  //     M14: { range: [9, 50], step: 1 },
  //     M16: { range: [10, 55], step: 1 },
  //     M18: { range: [11, 60], step: 1 },
  //     M20: { range: [12, 65], step: 1 },
  //     M22: { range: [13, 70], step: 1 },
  //     M24: { range: [14, 75], step: 1 },
  //     M27: { range: [15, 80], step: 1 },
  //     M30: { range: [16, 85], step: 1 },
  //     M33: { range: [17, 90], step: 1 },
  //     M36: { range: [18, 95], step: 1 },
  //     M39: { range: [19, 100], step: 1 },
  //     M42: { range: [20, 105], step: 1 },
  //     M45: { range: [21, 110], step: 1 },
  //     M48: { range: [22, 115], step: 1 }
  //   }
  // },
  // "ОСТ 26-2041-96": {
  //   description: "Болты специальные, высокопрочные, метрическая резьба",
  //   lengths: {
  //     M12: { range: [50, 300], step: 5 },
  //     M16: { range: [60, 350], step: 5 },
  //     M20: { range: [70, 400], step: 5 },
  //     M24: { range: [80, 450], step: 5 },
  //     M30: { range: [90, 500], step: 5 },
  //     M36: { range: [100, 550], step: 5 }
  //   }
  // },
  // "ГОСТ Р 52645-2006": {
  //   description: "Болты с контролируемой прочностью для конструкций",
  //   lengths: {
  //     M12: { range: [60, 300], step: 5 },
  //     M16: { range: [70, 350], step: 5 },
  //     M20: { range: [80, 400], step: 5 },
  //     M24: { range: [90, 450], step: 5 },
  //     M30: { range: [100, 500], step: 5 },
  //     M36: { range: [110, 550], step: 5 }
  //   }
  // },
  // "ГОСТ 5916-70": {
  //   description: "Гайки высокопрочные шестигранные",
  //   lengths: {
  //     M6: { range: [5, 30], step: 1 },
  //     M8: { range: [6, 35], step: 1 },
  //     M10: { range: [7, 40], step: 1 },
  //     M12: { range: [8, 45], step: 1 },
  //     M14: { range: [9, 50], step: 1 }
  //   }
  // },
  // "ГОСТ 5918-73": {
  //   description: "Гайки с высокой прочностью и увеличенным размером под ключ",
  //   lengths: {
  //     M16: { range: [10, 60], step: 2 },
  //     M18: { range: [12, 65], step: 2 },
  //     M20: { range: [14, 70], step: 2 }
  //   }
  // },
  // "ГОСТ 5927-70": {
  //   description: "Гайки самоконтрящиеся для болтов",
  //   lengths: {
  //     M6: { range: [5, 25], step: 1 },
  //     M8: { range: [6, 30], step: 1 },
  //     M10: { range: [8, 35], step: 1 },
  //     M12: { range: [10, 40], step: 1 }
  //   }
  // },
  // "ОСТ 26-2038-96": {
  //   description: "Болты специального назначения",
  //   lengths: {
  //     M16: { range: [60, 350], step: 5 },
  //     M20: { range: [70, 400], step: 5 },
  //     M24: { range: [80, 450], step: 5 },
  //     M30: { range: [90, 500], step: 5 }
  //   }
  // },
  // "ГОСТ 22354-77": {
  //   description: "Болты для строительных конструкций",
  //   lengths: {
  //     M12: { range: [50, 300], step: 5 },
  //     M16: { range: [60, 350], step: 5 },
  //     M20: { range: [70, 400], step: 5 },
  //     M24: { range: [80, 450], step: 5 },
  //     M30: { range: [90, 500], step: 5 }
  //   }
  // },
  // "ГОСТ 9065-75": {
  //   description: "Гайки с метрической резьбой для болтов и шпилек",
  //   lengths: {
  //     M6: { range: [4, 30], step: 1 },
  //     M8: { range: [5, 35], step: 1 },
  //     M10: { range: [6, 40], step: 1 },
  //     M12: { range: [7, 45], step: 1 },
  //     M16: { range: [8, 60], step: 2 },
  //     M20: { range: [10, 70], step: 2 },
  //     M24: { range: [12, 80], step: 2 }
  //   }
  // },
  // "ГОСТ 10450-78": {
  //   description: "Шайбы плоские для болтов и винтов",
  //   lengths: {
  //     M6: { range: [1, 3], step: 1 },
  //     M8: { range: [1, 4], step: 1 },
  //     M10: { range: [1, 5], step: 1 },
  //     M12: { range: [1, 6], step: 1 },
  //     M16: { range: [1, 8], step: 1 }
  //   }
  // },
  // "ГОСТ 11371-78": {
  //   description: "Гроверные шайбы и пружинные шайбы для метрической резьбы",
  //   lengths: {
  //     M6: { range: [1, 3], step: 1 },
  //     M8: { range: [1, 4], step: 1 },
  //     M10: { range: [1, 5], step: 1 },
  //     M12: { range: [1, 6], step: 1 }
  //   }
  // },
  // "ГОСТ 24379.1_2012": {
  //   description: "Фундаментные болты диаметром резьбы от 12 до 140 мм",
  //   lengths: {
  //     M12: { range: [80, 250], step: 10 },
  //     M16: { range: [90, 300], step: 10 },
  //     M20: { range: [100, 350], step: 10 },
  //     M24: { range: [110, 400], step: 10 },
  //     M30: { range: [120, 450], step: 10 },
  //     M36: { range: [130, 500], step: 10 },
  //     M42: { range: [140, 550], step: 10 },
  //     M48: { range: [150, 600], step: 10 },
  //     M56: { range: [160, 650], step: 10 },
  //     M64: { range: [170, 700], step: 10 },
  //     M72: { range: [180, 750], step: 10 },
  //     M80: { range: [190, 800], step: 10 },
  //     M90: { range: [200, 850], step: 10 },
  //     M100: { range: [210, 900], step: 10 },
  //     M110: { range: [220, 950], step: 10 },
  //     M120: { range: [230, 1000], step: 10 },
  //     M130: { range: [240, 1050], step: 10 },
  //     M140: { range: [250, 1100], step: 10 }
  //   }
  // },
  // "ГОСТ 28848-90": {
  //   description: "Болты высокопрочные для ответственных соединений",
  //   lengths: {
  //     M12: { range: [50, 300], step: 5 },
  //     M16: { range: [60, 350], step: 5 },
  //     M20: { range: [70, 400], step: 5 },
  //     M24: { range: [80, 450], step: 5 },
  //     M30: { range: [90, 500], step: 5 },
  //     M36: { range: [100, 550], step: 5 }
  //   }
  // },
  // "ГОСТ Р 52646-2006": {
  //   description: "Болты с контролируемой прочностью и резьбой высокого качества",
  //   lengths: {
  //     M12: { range: [60, 300], step: 5 },
  //     M16: { range: [70, 350], step: 5 },
  //     M20: { range: [80, 400], step: 5 },
  //     M24: { range: [90, 450], step: 5 },
  //     M30: { range: [100, 500], step: 5 },
  //     M36: { range: [110, 550], step: 5 }
  //   }
  // },
  // "ГОСТ 6402-70": {
  //   description: "Шпильки резьбовые с метрической резьбой",
  //   lengths: {
  //     M6: { range: [30, 150], step: 5 },
  //     M8: { range: [35, 160], step: 5 },
  //     M10: { range: [40, 170], step: 5 },
  //     M12: { range: [45, 180], step: 5 },
  //     M16: { range: [50, 200], step: 5 },
  //     M20: { range: [55, 220], step: 5 }
  //   }
  // },
  // "ГОСТ 6958-78": {
  //   description: "Болты высокопрочные с шестигранной головкой",
  //   lengths: {
  //     M12: { range: [50, 300], step: 5 },
  //     M16: { range: [60, 350], step: 5 },
  //     M20: { range: [70, 400], step: 5 },
  //     M24: { range: [80, 450], step: 5 },
  //     M30: { range: [90, 500], step: 5 }
  //   }
  // },
  // "ОСТ 26-2042-96": {
  //   description: "Болты специальные для металлических конструкций",
  //   lengths: {
  //     M16: { range: [60, 350], step: 5 },
  //     M20: { range: [70, 400], step: 5 },
  //     M24: { range: [80, 450], step: 5 },
  //     M30: { range: [90, 500], step: 5 }
  //   }
  // },
  // "ГОСТ 9649-78": {
  //   description: "Шайбы плоские увеличенные для болтов",
  //   lengths: {
  //     M6: { range: [1, 3], step: 1 },
  //     M8: { range: [1, 4], step: 1 },
  //     M10: { range: [1, 5], step: 1 },
  //     M12: { range: [1, 6], step: 1 },
  //     M16: { range: [1, 8], step: 1 }
  //   }
  // }
};





//ШПИЛЬКИ
// types.ts
// Общие типы для справочника шпилек (studs) — TypeScript

/** Тип резьбы: метрическая */
export type ThreadMetric = 'M';

/** Исполнение шпильки (обычно в ГОСТах обозначается номер исполнения 1..12) */
export type Execution = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

/**
 * Описание размеров для конкретного диаметра в рамках ГОСТа.
 *
 * - P: шаг резьбы (мм)
 * - l1: длина ввинчиваемого конца (мм) — опционально (различается по исполнению)
 * - l2: длина свободного конца (мм) — опционально (для исполнения с двухсторонней резьбой)
 * - b: длина резьбы (иногда указывают одну величину для стандартных исполнений)
 * - L: массив допустимых типовых общих длин шпильки (мм)
 * - designation: удобная строка-название, напр. "Шпилька M12x100 ГОСТ 22032-76"
 * - notes: дополнительная информация (опционально)
 */
export interface StudSizeData {
  P: number;
  l1?: number;
  l2?: number;
  b?: number;
  L: number[];               // list of available total lengths (мм)
  designation?: string;
  notes?: string;
  // можно добавить дополнительные стандартные поля (steelGrade, coating) в конкретных данных
}

/**
 * Данные одного ГОСТа по шпилькам.
 * - title: человекочитаемое название ГОСТа / исполнения
 * - execution: исполнение (строка '1'..'12')
 * - type: фиксированный literal 'шпилька' (удобно для фильтрации)
 * - steelGrades: рекомендуемые марки стали (массив строк)
 * - thread: 'M' (метрическая)
 * - sizes: карта диаметра -> StudSizeData, где ключи 'M6'..'M48'
 */
export interface GostStudData {
  title: string;
  execution: Execution;
  type: 'шпилька';
  steelGrades: string[];
  thread: ThreadMetric;
  sizes: Record<string, StudSizeData>; // keys: 'M6', 'M8', ... 'M48'
  // optional meta
  gost?: string;           // например "ГОСТ 22032-76"
  sourceNote?: string;     // примечание о таблице/источнике
}

/**
 * Общий тип коллекции всех ГОСТов шпилек.
 * Ключ — строка с названием ГОСТа, значение — данные ГОСТа.
 */
export type StudsByGost = Record<string, GostStudData>;

/**
 * Утилиты (типовые подписи) — можно расширять при необходимости.
 */
export const isMetricThread = (t: ThreadMetric) => t === 'M';

export const supportedExecutions: Execution[] = ['1','2','3','4','5','6','7','8','9','10','11','12'];




// studs-data.ts
// import { StudsByGost } from './types';

export const studsByGost: StudsByGost = {
  /** ГОСТ 9066-75 — шпильки с ввинчиваемым концом */
  'ГОСТ 9066-75': {
    title: 'Шпильки с ввинчиваемым концом',
    gost: 'ГОСТ 9066-75',
    type: 'шпилька',
    execution: '1',
    thread: 'M',
    steelGrades: ['35', '40Х', '45', '09Г2С'],
    sizes: {
      M12: { P: 1.75, L: [35,40,45,50,55,60,65,70,80,90,100,110,120,130,140,150] },
      M16: { P: 2.0, L: [40,45,50,55,60,65,70,80,90,100,110,120,130,140,150] },
      M20: { P: 2.5, L: [50,55,60,65,70,80,90,100,110,120,130,140,150,160] },
      M24: { P: 3.0, L: [60,70,80,90,100,110,120,130,140,150,160,170,180,200] },
      M30: { P: 3.5, L: [80,90,100,110,120,130,140,150,160,170,180,200,220] },
      M36: { P: 4.0, L: [100,110,120,130,140,150,160,170,180,200,220,240] },
      M42: { P: 4.5, L: [120,130,140,150,160,170,180,200,220,240,260] },
      M48: { P: 5.0, L: [140,150,160,170,180,200,220,240,260,280,300] }
    }
  },

  /** ГОСТ 22032-76 — исполнение 1 */
  'ГОСТ 22032-76': {
    title: 'Шпильки с ввинчиваемым концом, исполнение 1',
    gost: 'ГОСТ 22032-76',
    type: 'шпилька',
    execution: '1',
    thread: 'M',
    steelGrades: ['35', '40Х', '45', '09Г2С'],
    sizes: {
      M12: { P: 1.75, l1: 12, b: 24, L: [35,40,45,50,55,60,65,70,80,90,100,110,120] },
      M16: { P: 2.0,  l1: 16, b: 32, L: [40,45,50,55,60,65,70,80,90,100,110,120,130] },
      M20: { P: 2.5,  l1: 20, b: 40, L: [50,55,60,65,70,80,90,100,110,120,130,140,150] },
      M24: { P: 3.0,  l1: 24, b: 48, L: [60,70,80,90,100,110,120,130,140,150,160,170,180] },
      M30: { P: 3.5,  l1: 30, b: 60, L: [80,90,100,110,120,130,140,150,160,170,180,200,220] },
      M36: { P: 4.0,  l1: 36, b: 72, L: [100,110,120,130,140,150,160,170,180,200,220,240] },
      M42: { P: 4.5,  l1: 42, b: 84, L: [120,130,140,150,160,170,180,200,220,240,260] },
      M48: { P: 5.0,  l1: 48, b: 96, L: [140,150,160,170,180,200,220,240,260,280] }
    }
  }

  // 👉 Аналогично добавляются ГОСТ 22033-76 (исп. 2), 22034-76 (исп. 3) … до 22043-76 (исп. 12)
};


const templateSelectOptions = {
  series: {
    options: 'series',
    controlName: 'series',
    selectName: 'Серия'
  },
  species: {
    options: 'species',
    controlName: 'species',
    selectName: 'Вид'
  },
  subspecies: {
    options: 'subspecies',
    controlName: 'subspecies',
    selectName: 'Подвид'
  },
  stateStandard: {
    options: 'stateStandard',
    controlName: 'stateStandard',
    selectName: 'ГОСТ'
  },
  diameters: {
    options: 'diameters',
    controlName: 'diameters',
    selectName: 'Диаметр'
  },
  length: {
    options: 'length',
    controlName: 'length',
    selectName: 'Длина'
  },
  threadLength: {
    options: 'threadLength',
    controlName: 'threadLength',
    selectName: 'Длина резьбы'
  },
  steelGrades: {
    options: 'steelGrades',
    controlName: 'steelGrades',
    selectName: 'Сталь'
  },
  execution: {
    options: 'execution',
    controlName: 'execution',
    selectName: 'Тип исполнения'
  }
}
