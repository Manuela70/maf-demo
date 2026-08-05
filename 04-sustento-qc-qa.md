# Sustento de Horas — Fases de Pruebas QC y QA

Distribución y sustento de las horas de aseguramiento de calidad del Gantt (PDT).

## Fase 1 — QC (Quality Control propio, en DEV, previo a QA formal)

| Actividad | Horas | Recurso | Sustento técnico |
| --- | --- | --- | --- |
| Revisión e Integración de Módulos | 80 | Backend/Frontend Dev | Integración de módulos desarrollados en paralelo contra mocks; resolución de incompatibilidades entre contratos. Primer punto de conexión real entre módulos. |
| Corrección de defectos dev-cycle (backend) | 24 | AWS Backend Developer | Corrección de bugs de backend detectados en la integración. |
| Corrección de defectos dev-cycle (frontend) | 24 | AWS Frontend Developer | Corrección de bugs de frontend detectados en la integración. |
| QC — Pruebas de integración de APIs | 32 | Quality Engineer | Validación de contratos entre microservicios y con APIs externas en sandbox (PLAFT, Equifax, Kashio, Keynua, NewCon). |
| QC — Revisiones de código y ajustes técnicos | 32 | Backend/Frontend Dev | Code review de calidad, estándares y deuda técnica antes del cierre de desarrollo. |
| QC — Corrección de defectos en DEV | 160 | AWS Backend Developer | Grueso del retrabajo: corrección de defectos detectados por el QA propio sobre los 11 módulos integrados. Trabajo de desarrollo gatillado por QC. |
| QC — Pruebas de performance y carga | 32 | Quality Engineer | Validación temprana de rendimiento en DEV. |
| **SUBTOTAL QC (incluye integración y dev-cycle)** | **384** |  |  |

## Fase 2 — QA (etapa de pruebas formal, ambiente QA, post-desarrollo)

| Actividad | Horas | Recurso | Sustento técnico |
| --- | --- | --- | --- |
| Definición de estrategia y plan de pruebas QA | 4 | Líder Técnico / QE | Plan formal: alcance, escenarios positivos/negativos, criterios de aceptación, matriz de cobertura. |
| Ejecución de pruebas de performance, carga y estrés | 20 | Quality Engineer | 43 concurrentes, ~650 leads/día, SLA (Equifax<2min, PLAFT<60s, dashboard<3s), punto de quiebre. |
| Ejecución de pruebas funcionales en ambiente QA | 60 | Quality Engineer | Suite funcional completa de los 11 módulos + integración E2E lead→evaluación→venta→pago→firma→cierre. Cubre escenarios de las 29 HU. |
| Corrección de defectos críticos y altos por desarrollo | 32 | Backend Developer | Corrección de defectos severos detectados en QA formal, priorizados por criticidad. |
| Capacitación a usuarios y soporte a UAT con stakeholders | 32 | Quality Engineer / Líder | Acompañamiento del UAT con MAF; su aprobación es condición para el pase a producción. |
| **SUBTOTAL QA formal** | **148** |  |  |

**TOTAL ASEGURAMIENTO DE CALIDAD (QC + QA): 532 horas**
