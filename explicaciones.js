/**
 * ============================================
 * DATOS DE EXPLICACIONES DETALLADAS
 * Contenido para la sección 'EXPLICACIÓN'
 * ============================================
 */

export const EXPLANATIONS_DATA = [
    {
        id: 'matematicas-ecuaciones',
        title: 'Ecuaciones Cuadráticas',
        subtitle: 'Álgebra, Cálculo y Ecuaciones.',
        subject: 'Matemáticas',
        icon: '📐',
        description: 'Dominio de la fórmula cuadrática para encontrar las raíces de ecuaciones de la forma $ax^2 + bx + c = 0$. Es fundamental para la física y la ingeniería.',
        process: `
            Paso 1: Identificación de variables (a, b, c).
            Paso 2: Sustitución de valores en la fórmula general cuadrática.
            Paso 3: Desarrollo matemático hasta encontrar las dos raíces (soluciones).
        `,
        example: `
            Problema: Resuelve la ecuación $2x^2 + 5x - 3 = 0$.
            Solución: $x = 0.5$ y $x = -3.0$.
        `
    },
    {
        id: 'fisica-newton',
        title: 'Leyes de Newton',
        subtitle: 'Cinemática y Dinámica.',
        subject: 'Física',
        icon: '⚛️',
        description: 'Introducción a la Primera, Segunda y Tercera Ley de Newton, fundamentales para entender la dinámica de los objetos y sus interacciones.',
        process: `
            Primera Ley (Inercia): Un objeto permanece en reposo o en movimiento uniforme a menos que una fuerza externa actúe sobre él.
            Segunda Ley ($F=ma$): La fuerza neta aplicada sobre un objeto es directamente proporcional a la aceleración que adquiere.
        `,
        example: `
            Problema: Calcular la aceleración de un objeto de 10 kg al que se le aplica una fuerza de 50 N.
            Solución: $a = 5 m/s^2$.
        `
    },
    {
        id: 'guia-interes',
        title: 'Problemas de Interés Compuesto',
        subtitle: 'Cómo resolver problemas comunes.',
        subject: 'Finanzas/Matemáticas',
        icon: '💡',
        description: 'Guía paso a paso para calcular el interés compuesto, clave en finanzas personales y economía.',
        process: `
            Fórmula base: $M = C(1 + i)^n$
            Paso 1: Identificar capital inicial (C), tasa de interés (i) y tiempo (n).
            Paso 2: Calcular el factor de crecimiento.
            Paso 3: Obtener el monto final (M).
        `,
        example: `
            Problema: Inviertes $1000 a 5% anual por 3 años. ¿Cuánto obtienes?
            Monto Final: $1157.63
        `
    },
    {
        id: 'ejemplo-parabolico',
        title: 'Movimiento Parabólico',
        subtitle: 'La sección ¿Cómo se hizo? detallada.',
        subject: 'Física',
        icon: '📘',
        description: 'Análisis completo del movimiento de un proyectil bajo la influencia de la gravedad, combinando cinemática horizontal y vertical.',
        process: `
            Componentes Clave:
            Velocidad horizontal ($v_x$) es constante. Velocidad vertical ($v_y$) es afectada por la gravedad (g).
            Se calcula el tiempo de vuelo y la altura máxima por separado.
        `,
        example: `
            Problema: Un cañón dispara una bola a 30° con una velocidad de 50 m/s. ¿Cuál es el alcance horizontal?
            Alcance: $\approx 220.9$ metros.
        `
    }
];

// Función auxiliar para obtener datos por ID
export const getExplanationById = (id) => {
    return EXPLANATIONS_DATA.find(exp => exp.id === id);
};
