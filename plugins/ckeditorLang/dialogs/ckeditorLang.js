(function() {

  CKEDITOR.dialog.add('ckeditorLangDialog', function (editor) {
    return {
      title: Drupal.t('Specific language text'),
      minWidth: 400,
      minHeight: 200,

      contents: [
        {
          id: 'tab',
          label: Drupal.t('Specific language text'),
          elements: [
            {
              type: 'select',
              id: 'language',
              label: Drupal.t('Language'),
              items: Drupal.settings.ckeditor_lang.language_options,
              setup: function(element) {
                this.setValue(element.getAttribute("lang"));
              },
              commit: function(element) {
                element.setAttribute("lang", this.getValue());
              }
            },
            {
              type: 'textarea',
              id: 'text',
              label: Drupal.t('Text'),
              validate : CKEDITOR.dialog.validate.notEmpty(Drupal.t('Text field cannot be empty')),
              setup: function(element) {
                this.setValue(element.getText());
              },
              commit: function(element) {
                element.setText(this.getValue());
              }
            }
          ]
        }
      ],
      onShow: function() {

        var selection = editor.getSelection(),
            element = selection.getStartElement();

        if (element) {
          element = element.getAscendant('span', true);
        }

        if (!element || element.getName() !== 'span') {
          element = editor.document.createElement('span');
          this.insertMode = true;
        }
        else {
          this.insertMode = false;
        }

        this.element = element;

        if (!this.insertMode) {
          this.setupContent(element);
        }
      },
      onOk: function() {

        var dialog = this,
            span = this.element;

        dialog.commitContent(span);

        if (dialog.insertMode) {
          editor.insertElement(span);
        }
      }
    };
  });
})();
