/**
 * Enum for allow datatype on clipboard.
 * @readonly
 * @enum {string} data type name.
 */
const AllowDataType = Object.freeze({
    FreeText: "FreeText",
    Numeric: "Numeric",
    Integer: "Integer"
});

/**
 * Parsing clipboard from formated text to target.
 * Author: Khoa, Dang Toan
 * Created date: 2019-Mar-28
 * ---------------------------------------
 * Change sets
 * 2019-Mar-28: Support parsing data as plain text.
 */
class ClipboardParsingRequest
{
    constructor()
    {
        /**
         * Value get from clipboard
         * @param clipboard
        */
        this._clipboard = null;

        /**
         * Allow Data Type accepted for filtering.
         * By default is 'Free Text'
         * @param {AllowDataType} clipboard
         */
        this._allowDataType = AllowDataType.FreeText;

        /**
         * The default value in case parsing value not matched expected type.
         * @param clipboard
         */
        this._defaultValue = "";
    }

    /**
     * Set clipboard value
     * @param {string} clipboard - The formated string data from clipboard.
     */
    set clipboard(clipboard)
    {
        this._clipboard = clipboard;
    }

    /**
     * Get clipboard value
     * @returns {string} clipboard value in formated text
     */
    get clipboard()
    {
        return this._clipboard;
    }

    /**
     * Set AllowDataType be used value
     * @param {AllowDataType} allowDataType - DataType allow to use in filter, by default is FreeText.
     */
    set allowDataType(allowDataType)
    {
        this._allowDataType = allowDataType;
    }

    /**
    * Get allowDataType value
    * @returns {AllowDataType} current allow data type
    */
    get allowDataType()
    {
        return this._allowDataType;
    }

    /**
     * Set defaultValue be used value
     * @param {string} defaultValue - Default value in case parsing value not matched expected type.
     */
    set defaultValue(defaultValue)
    {
        this._defaultValue = defaultValue;
    }

    /**
     * Get defaultValue value
     * @returns {defaultValue} current default value.
     */
    get defaultValue()
    {
        return this._defaultValue;
    }
}
