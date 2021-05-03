/**
 * Manage paste action of Input element inside a table with input clipboard string is a excel table format. 
 * Author: Khoa, Dang Toan
 * Created date: 2019-Mar-27
 * ---------------------------------------
 * Change sets
 * 2019-Mar-27: Support pasted excel table formatted string to html table.
 */
class PastedInputElementExcelFormat extends GridInputElement
{
    /**
     * Create table input element.
     * @param {input} inputElement - The the html element inside a td type input tag.   
     */
    constructor(inputElement)
    {
        super(inputElement)
    }
    
    /**
     * Parsed clipboard data as Excel format (Line seperated by '\n' and Column seperated by '\t')
     * @param {string} clipboardData - The formated string data from clipboard.
     * @returns {Array} DataTable (2 dimensional array)
     */
    parseData(clipboardData)
    {
        const ROW_SEPERATOR = '\n';
        const COLUMN_SEPERATOR = '\t';

        let excelTable = [[]];
        if (clipboardData != null) 
        {
            // Split clipboard line by line
            let rows = clipboardData.split(ROW_SEPERATOR);
            if (rows != null) 
            {
                // Split each row's columns
                for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) 
                {
                    if (rows[rowIndex] != null && rows[rowIndex] != '') {
                        excelTable[rowIndex] = rows[rowIndex].split(COLUMN_SEPERATOR);
                    }                    
                }
            }
        }

        return excelTable;
    }    
}