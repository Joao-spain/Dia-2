import { Estudiante } from './estudiante.js';
import {
    promedio,
    aprobados,
    nombres,
    promedioGeneral
} from './funciones.js';

// Array de estudiantes
const estudiantes = [
    new Estudiante('Juan', 'Ingeniería', 20, [8, 9, 7]),
    new Estudiante('Maria', 'Medicina', 22, [6, 5, 7]),
    new Estudiante('Pedro', 'Administración', 21, [9, 8, 10]),
    new Estudiante('Ana', 'Diseño', 19, [4, 5, 6])
];

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ DOM cargado completamente');
    
    const salida = document.getElementById('salida');
    const btnProcesar = document.getElementById('btnProcesar');
    
    // Validaciones
    if (!salida) {
        console.error('❌ ERROR: Elemento "salida" no encontrado');
        return;
    }
    
    if (!btnProcesar) {
        console.error('❌ ERROR: Botón "btnProcesar" no encontrado');
        return;
    }
    
    console.log('✓ Elementos DOM encontrados');
    console.log('✓ Total de estudiantes:', estudiantes.length);
    
    // Event listener del botón
    btnProcesar.addEventListener('click', () => {
        console.log('>>> PROCESANDO DATOS DE ESTUDIANTES <<<');
        
        try {
            // Cálculos y datos
            const aprobadosList = aprobados(estudiantes);
            const nombresList = nombres(estudiantes);
            const promGeneral = promedioGeneral(estudiantes);
            
            // Construir HTML con formato mejorado
            let texto = `
╔══════════════════════════════════════════╗
║      GESTIÓN DE ESTUDIANTES - REPORTE    ║
╚══════════════════════════════════════════╝

📊 DATOS GENERALES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Total de Estudiantes: ${estudiantes.length}
• Estudiantes Aprobados: ${aprobadosList.length}
• Estudiantes Reprobados: ${estudiantes.length - aprobadosList.length}
• Promedio General: ${promGeneral.toFixed(2)}

📋 LISTADO COMPLETO DE ESTUDIANTES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
            
            estudiantes.forEach((est, index) => {
                const prom = promedio(est.notas);
                const estado = prom >= 7 ? '✓ APROBADO' : '✗ REPROBADO';
                texto += `
${index + 1}. ${est.nombre.toUpperCase()}
   Carrera: ${est.carrera}
   Edad: ${est.edad} años
   Notas: [${est.notas.join(', ')}]
   Promedio: ${prom.toFixed(2)} - ${estado}
`;
            });
            
            texto += `
📝 ESTUDIANTES APROBADOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
            
            aprobadosList.forEach((est, index) => {
                texto += `${index + 1}. ${est.nombre} (${est.carrera}) - Promedio: ${promedio(est.notas).toFixed(2)}
`;
            });
            
            texto += `
👥 TODOS LOS ESTUDIANTES:
${nombresList.join(' • ')}

📈 ANÁLISIS ESTADÍSTICO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Promedio General: ${promGeneral.toFixed(2)}
Tasa de Aprobación: ${((aprobadosList.length / estudiantes.length) * 100).toFixed(1)}%
`;

            salida.textContent = texto;
            salida.style.whiteSpace = 'pre-wrap';
            
            // Logs en consola
            console.log('✓ Datos procesados exitosamente');
            console.table(estudiantes.map(est => ({
                Nombre: est.nombre,
                Carrera: est.carrera,
                Edad: est.edad,
                Promedio: promedio(est.notas).toFixed(2),
                Estado: promedio(est.notas) >= 7 ? 'Aprobado' : 'Reprobado'
            })));
            console.log('Aprobados:', aprobadosList);
            console.log('Promedio General:', promGeneral.toFixed(2));
            
        } catch (error) {
            console.error('❌ ERROR AL PROCESAR DATOS:', error);
            salida.textContent = `ERROR: ${error.message}`;
        }
    });
    
    console.log('✓ Sistema listo. Presiona "Procesar" para ejecutar');
});

