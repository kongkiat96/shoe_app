/**
 * App User View - Security
 */

'use strict';

(function () {
  const formChangePass = document.querySelector('#formChangePassword');

  if (formChangePass) {
    window.formValidationInstance = FormValidation.formValidation(formChangePass, {
      fields: {
        newPassword: {
          validators: {
            notEmpty: {
              message: 'กําหนดรหัสผ่านใหม่'
            },
            stringLength: {
              min: 6,
              message: 'กรุณาระบุรหัสผ่านเกิน 6 ตัวอักษร'
            }
          }
        },
        confirmPassword: {
          validators: {
            notEmpty: {
              message: 'กรุณายืนยันรหัสผ่านใหม่'
            },
            identical: {
              compare: function () {
                return formChangePass.querySelector('[name="newPassword"]').value;
              },
              message: 'รหัสผ่านไม่ตรงกัน'
            },
            stringLength: {
              min: 6,
              message: 'กรุณาระบุรหัสผ่านเกิน 6 ตัวอักษร'
            }
          }
        }
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          eleValidClass: '',
          rowSelector: '.form-password-toggle'
        }),
        submitButton: new FormValidation.plugins.SubmitButton(),
        autoFocus: new FormValidation.plugins.AutoFocus()
      },
      init: instance => {
        instance.on('plugins.message.placed', function (e) {
          if (e.element.parentElement.classList.contains('input-group')) {
            e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
          }
        });
      }
    });
  }
})();

