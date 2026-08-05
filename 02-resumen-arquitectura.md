# Resumen de Arquitectura — Sustento de Estimación

Microservicios, endpoints e integraciones que sustentan las horas de desarrollo del Gantt.

| Microservicio | Responsabilidad | Endpoints | Integraciones | Requerimientos |
| --- | --- | --- | --- | --- |
| auth-service | Autenticación, sesiones, 9 roles y permisos | 11 | Cognito | REQ-01 |
| leads-service | Recepción, creación, gestión de leads, estados, cartera | 22 | CRM Dynamics, NewCon | REQ-02 a REQ-10 |
| identity-service | Validación multi-documento, autocompletado | 4 | S-02 (RENIEC/SUNAT) | REQ-11 a REQ-13 |
| document-service | Captura DNI, documentos normativos, WORM | 5 | AWS S3 Object Lock | REQ-14, 21, 26 |
| risk-service | Orquestación PLAFT→Equifax, DDJJ, co-titular | 11 | PLAFT-Inspektor, Equifax | REQ-15 a REQ-17 |
| selection-service | Cascada programa/grupo/certificado, vacantes | 5 | NewCon (tiempo real) | REQ-18 |
| proforma-service | Proforma Cuota 1 + CIA, PDF, OTP | 5 | NewCon, End User Messaging | REQ-19, REQ-20 |
| payment-service | Orden de pago Kashio, parciales, 48h, webhook | 6 | Kashio | REQ-22 |
| signature-service | Firma biométrica, co-titulares, devolución | 4 | Keynua (S-01) | REQ-23 |
| contract-service | N° contrato, vacante, expediente, bienvenida | 6 | NewCon, End User Messaging | REQ-24, 25, 27 |
| reporting-service | 4 dashboards, KPIs, datasets QuickSight | 5 | QuickSight | REQ-28 |
| notification-service | Notificaciones proactivas multicanal | 3 | End User Messaging | Transversal |
| admin-service | BackOffice: usuarios, roles, parámetros, catálogos | 9 | Cognito, NewCon | REQ-29 |
| integration-service | Orquestación APIs externas + colas SQS | 0 | Todas las externas | DEV-INTEG |
| **TOTAL** | **14 microservicios** | **96 endpoints** |  |  |

## Resumen de horas de desarrollo (del Gantt)

| Partida | Frontend | Backend | Total |
| --- | --- | --- | --- |
| Desarrollo de módulos funcionales (REQ-01 a REQ-29) | 421 h | 787 h | 1,208 h |
| Integraciones / colas / logs (técnico transversal) | 60 h | 44 h | 104 h |
| **TOTAL DESARROLLO DE SOFTWARE** | **481 h** | **831 h** | **1,312 h** |
