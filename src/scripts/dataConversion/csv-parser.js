// @ts-check
import fs from 'fs';
import csv from 'csv-parser';

/**
 * Parses a CSV file and returns its contents as an array of objects.
 * Each object represents a row in the CSV, with key-value pairs corresponding
 * to column headers and their values.
 * 
 * @memberof module:DataConversionFactory
 * 
 * @async
 * @function csvParser
 * @param {string} filePath - The path to the CSV file to be parsed.
 * @returns {Promise<Object[]>} A promise that resolves with an array of objects,
 * each representing a row from the CSV. The promise is rejected if there is an
 * error reading or parsing the file. 
 * 
 */
const csvParser = async (filePath) => {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => rows.push(data))
      .on('end', () => {
        resolve(rows);
      })
      .on('error', (error) => reject(error));
  });
}

export default csvParser;