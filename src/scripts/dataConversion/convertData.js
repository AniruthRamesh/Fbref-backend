// @ts-check
/**
 * See {@link csvParser}
 */
import csvParser from "./csv-parser.js";

/**
 * A factory function that returns a parser function based on the given source type.
 * Currently, it supports "csv" but is designed to be extended to support additional data types.
 * 
 * In the future, all parsers returned by this factory will be expected to follow the same
 * signature and return type as `csvParser`, ensuring uniformity across different data sources.
 * 
 * @module DataConversionFactory
 * @param {string} dataSourceType - Specifies the source type. Currently supports "csv".
 * @returns {Function} Returns the corresponding parser function for the source type.
 * For "csv", returns the csvParser function. For any other type, returns a no-op function.
 * 
 */
const convertData = (dataSourceType) => {
  switch(dataSourceType){
    case "csv":
      return csvParser;
    default :
      return () => {};
  }
}

export default convertData;