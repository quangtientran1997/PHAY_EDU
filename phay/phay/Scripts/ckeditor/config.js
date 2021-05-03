/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
CKEDITOR.plugins.addExternal('ckeditor_wiris', '/Scripts/ckeditor/wiris/mathtype-ckeditor4/plugin.js');
CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';
    var path = CKEDITOR.basePath.replace('/ckeditor', '');
    config.language = 'vi';
    //config.filebrowserBrowseUrl = path + 'ckfinder/ckfinder.html';
    //config.filebrowserImageBrowseUrl = path + 'ckfinder/ckfinder.html?type=Images';
    //config.filebrowserFlashBrowseUrl = path + 'ckfinder/ckfinder.html?type=Flash';
    //config.filebrowserUploadUrl = path + 'ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files';
    //config.filebrowserImageUploadUrl = path + 'ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images';
    //config.filebrowserFlashUploadUrl = path + 'ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash';
    // config.uiColor = '#AADC6E';
    config.skin = 'office2013';
    config.extraPlugins = 'cmsselect';
    config.toolbar_Custom = [

        //['Undo', 'Redo'], ['Paste', 'PasteText', 'PasteFromWord'], ['Blockquote', 'Smiley', 'Scayt'],
        ['Bold', 'Italic', 'Underline', 'Strike'],
        ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'BidiLtr', 'BidiRtl'],
        ['TextColor', 'BGColor'],
        ['NumberedList', 'BulletedList'],
        ["cmsimages", 'cmsyoutube', 'cmsvideos', 'cmsoffices', 'Table','Table2'],
        //['cmsyoutube', 'Table'],
        ['Link', 'Unlink', 'Anchor'],
        ['Styles', 'Format', 'Font', 'FontSize'],
        ['Maximize', 'RemoveFormat'], ['Source']
    ];
        coreStyles_bold: { element : 'b' };
    config.toolbar = 'Custom';


    config.toolbarGroups = [
        { name: 'document', groups: ['mode'] },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] }, { name: 'align' },
        
        { name: 'paragraph', groups: ['list', 'indent'] },
        //{ name: 'clipboard', groups: ['clipboard', 'undo'] },
        //{ name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
        { name: 'insert', groups: ['blocks'] },
        { name: 'links' },
        //{ name: 'document', groups: ['mode', 'document', 'doctools'] },
        '/',
        { name: 'styles' },
        { name: 'colors' },
        { name: 'tools' },
        { name: 'others' },        
    ];

    config.removeButtons = 'Save,NewPage,Preview,Print,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Blockquote,CreateDiv';
    config.removePlugins = 'flashupload,basket';
    config.allowedContent = true;
    config.protectedSource.push(/<i[^>]*><\/i>/g);
};
