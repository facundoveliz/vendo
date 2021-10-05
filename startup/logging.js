// const winston = require("winston");
// require("winston-mongodb");

// module.exports = function () {
//   // logs errors, uncaught exceptions and promise rejections to the console
//   const consoleLogger = winston.createLogger({
//     format: winston.format.combine(
//       winston.format.label({ label: "[LOGGER]" }),
//       winston.format.timestamp(),
//       winston.format.colorize({ all: true }),
//       winston.format.simple()
//     ),
//     transports: [new winston.transports.Console()],

//     exceptionHandlers: [new winston.transports.Console()],

//     rejectionHandlers: [new winston.transports.Console()],
//   });
  
//   // logs errors, uncaught exceptions and promise rejections to the db
//   const dbLogger = winston.createLogger({
//     format: winston.format.combine(
//       winston.format.label({ label: "label" }),
//       winston.format.timestamp(),
//       winston.format.prettyPrint()
//     ),
//     transports: [
//       // logs errors
//       new winston.transports.File({
//         level: "error",
//         filename: "logs/error.log",
//       }),
//       new winston.transports.MongoDB({
//         level: "error",
//         db: process.env.DATABASE_URI_LOGS,
//         options: {
//           useUnifiedTopology: true,
//         },
//         collection: "errors",
//         name: "test",
//       }),
//     ],

//     // logs uncaught exceptions
//     exceptionHandlers: [
//       new winston.transports.File({ filename: "logs/exceptions.log" }),
//       new winston.transports.MongoDB({
//         level: "error",
//         db: process.env.DATABASE_URI_LOGS,
//         options: {
//           useUnifiedTopology: true,
//         },
//         collection: "unhandled-exceptions",
//       }),
//     ],

//     // logs promise rejections
//     rejectionHandlers: [
//       new winston.transports.File({ filename: "logs/rejections.log" }),
//       new winston.transports.MongoDB({
//         level: "error",
//         db: process.env.DATABASE_URI_LOGS,
//         options: {
//           useUnifiedTopology: true,
//         },
//         collection: "promise-rejections",
//       }),
//     ],
//   });
// };
