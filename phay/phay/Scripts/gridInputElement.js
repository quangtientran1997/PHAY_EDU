/**
 * Manage action of Input element inside a table. 
 * Author: Khoa, Dang Toan
 * Created date: 2019-Mar-27
 * ---------------------------------------
 * Change sets
 * 2019-Mar-27: Support change focus from current input element to left or right.
 * 2019-Mar-27: Support parsing clipboard data and filling in data grid on Paste event
 * 2019-Mar-28: Implement data type value filter on 2 array dimension - Support data type: FreeText, Numeric and Integer
 */
class GridInputElement
{
    /**
     * Create table input element.
     * @param {input} inputElement - The the html element inside a td type input tag.   
     */
    constructor(inputElement)
    {
        this.currentElement = inputElement;
        this.currentElementCaretIndex = this.getCaretPos(this.currentElement);
        this.currentRow = $(this.currentElement).closest('tr');
    }

    /**
     * Move to previous right input element
     * Just move to next right element when cursor at the begin of input.
     * @return {void} No return value.
    */
    moveLeft()
    {
        if (this.currentRow != null)
        {
            let inputs = $(this.currentRow).find("td").find("input").not('input[style*="display: none;"]');
            let currentIndex = $(inputs).index(this.currentElement);
            if (inputs != null && currentIndex < inputs.length && currentIndex > 0)
            {
                setTimeout(function ()
                {
                    inputs[currentIndex - 1].focus();
                    inputs[currentIndex - 1].select();
                });
            }
        }
    }

    /**
     * Move to previous right input element
     * Just move to next right element when cursor at the end of input.
     * @return {void} No return value.
     */
    moveRight()
    {
        if (this.currentRow != null)
        {
            let inputs = $(this.currentRow).find("td").find("input").not('input[style*="display: none;"]');
            let currentIndex = $(inputs).index(this.currentElement);
            if (inputs != null && currentIndex < inputs.length)
            {
                setTimeout(function ()
                {
                    inputs[currentIndex + 1].focus();
                    inputs[currentIndex + 1].select();
                });
            }
        }
    }

    /**
     * Paste clipboard value (From copy & paste) -> Parse to datatable format and fill to current HTML table     
     * @param {ClipboardParsingRequest} clipboardParsingRequest - The parsing clipboard data request which contain pasted.
     */
    paste(clipboardParsingRequest)
    {
        if (this.parseData === undefined)
        {
            // or maybe test typeof this.method === "function"
            throw new TypeError("Must implemented parse data function.");
        }

        if (clipboardParsingRequest == null || !(clipboardParsingRequest instanceof ClipboardParsingRequest))
        {
            throw new TypeError("Input parameter must not null and must be ClipboardParsingRequest object.");
        }

        let clipboardData = clipboardParsingRequest.clipboardData;
        let excelTable = this.parseData(clipboardData);
        this.filterDataTableByDataType(excelTable, clipboardParsingRequest);
        this.fillToGrid(this.currentElement, excelTable);
    }

    /**
     * Filter inputed DataTable to validate each value is match expected allow value.
     * If not, replaced by default value.
     * @param {[[]]} dataTable - Two dimensional array
     * @param {ClipboardParsingRequest} clipboarParsingRequest - Clipboard parsing requet
     */
    filterDataTableByDataType(dataTable, clipboarParsingRequest)
    {
        let allowDataType = clipboarParsingRequest.allowDataType;
        let defaultValue = clipboarParsingRequest.defaultValue;

        // Traverse each row and each column.
        // Check current field value is match allow type or not, if not --> mark as default value.
        for (let rowIndex = 0; rowIndex < dataTable.length; rowIndex++) 
        {
            let columns = dataTable[rowIndex];
            for (let columnIndex = 0; columnIndex < columns.length; columnIndex++)
            {
                let currentValue = columns[columnIndex];
                columns[columnIndex] = this.getValueByDataType(currentValue, allowDataType, defaultValue);
            }
        }
    }

    /**
     * Validate if this input value is match expected datatype or not, if not, return default value.
     * @param {string} value - Validating value
     * @param {AllowDataType} dataType - Checking data type of the input value
     * @param {string} defaultValue - Default value, by default is empty string
     * @returns {string} value after check format
     */
    getValueByDataType(value, dataType, defaultValue = "")
    {
        let returnValue = defaultValue;
        switch (dataType)
        {
            case AllowDataType.FreeText:
                returnValue = value;
                break;
            case AllowDataType.Numeric:
                returnValue = isNaN(value) ? defaultValue : value;
                break;
            case AllowDataType.Integer:
                let integerPattern = "/^-?[0-9]+$/";
                returnValue = integerPattern.check(value) ? value : defaultValue;
                break;
        }
        return returnValue;
    }

     /**
     * Fill data table (2 dimensional array) to current HTML table.
     * The started row and column from current selected input element.
     * @return {void} No return value.
     */
    fillToGrid(targetElement, dataTable)
    {
        if (targetElement != null && dataTable != null)
        {
            let currentRow = $(targetElement).closest('tr');
            let currentIndex;
            if (currentRow)
            {
                let inputs = $(currentRow).find("td>input:not([type='checkbox'])");
                currentIndex = $(inputs).index(targetElement);
            }

            // Traverse each row and each column to current  element.
            // Row --> From current element's tr
            // Columns -> Start from current element's td
            for (let rowIndex = 0; rowIndex < dataTable.length; rowIndex++) 
            {
                if (currentRow != null)
                {
                    let columns = dataTable[rowIndex];
                    let inputs = $(currentRow).find("td>input:not([type='checkbox'])");
                    for (let columnIndex = 0; columnIndex < columns.length; columnIndex++)
                    {
                        $(inputs[currentIndex + columnIndex]).val(columns[columnIndex]);
                        $(inputs[currentIndex + columnIndex]).change();
                    }
                    currentRow = $(currentRow).next();
                }
            }
        }
    }

    // Get current caret index of selected input element
    // Return: index of current index - integer
    getCaretPos(input)
    {
        let caret_pos = 0;
        // Internet Explorer Caret Position (TextArea)
        if (document.selection && document.selection.createRange)
        {
            let range = document.selection.createRange();
            let bookmark = range.getBookmark();
            caret_pos = bookmark.charCodeAt(2) - 2;
        } else
        {
            // Firefox Caret Position (TextArea)
            if (input.setSelectionRange)
            {
                caret_pos = input.selectionStart;
            }
        }
        return caret_pos;
    }
}