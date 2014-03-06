/**
 * @file Plugin for inserting text with an attribute "lang" of the a selected
 * language.
 */
(function() {

  CKEDITOR.plugins.add('ckeditorLang',
  {
    icons: 'ckeditorLang',
    init : function(editor)
    {

      editor.addCommand('ckeditorLangDialog', new CKEDITOR.dialogCommand('ckeditorLangDialog', {
        allowedContent: 'span[lang]',
        requiredContent: 'span[lang]'
      }));

      editor.ui.addButton('ckeditorLang', {
        label : Drupal.t( 'Insert text in a specific language' ),
        command : 'ckeditorLangDialog',
        toolbar: 'insert'
      });

      CKEDITOR.dialog.add('ckeditorLangDialog', this.path + 'dialogs/ckeditorLang.js');

      if (editor.contextMenu) {

        editor.addMenuGroup('ckeditorLangGroup');
        editor.addMenuItem('ckeditorLangItem', {
          label: Drupal.t('Edit translation'),
          icon: this.path + 'icons/ckeditorLang.png',
          command: 'ckeditorLangDialog',
          group: 'ckeditorLangGroup'
        });

        editor.contextMenu.addListener(function(element) {
          if (element.getAscendant('span', true)) {
            return {
              ckeditorLangItem: CKEDITOR.TRISTATE_OFF
            };
          }
        });
      }
    },
  });
} )();
