$(document).ready(function () {
    $('#btnResetPassword').on('click', function (e) {
        e.preventDefault();
        const $btn = $(this);
        $btn.prop('disabled', true);
        removeValidationFeedback();
        const form = $("#formResetPassword")[0];
        const fv = setupFormValidationResetPassword(form);
        const formData = new FormData(form);

        fv.validate().then(function (status) {
            if (status === 'Valid') {

                postFormData("/save-reset-password", formData)
                    .done(onSaveRegisterSuccess)
                    .fail(handleAjaxSaveError);
            } else {
                $btn.prop('disabled', false);
            }
        });
    });
});

function onSaveRegisterSuccess(response) {
    if (response.status === 200) {
        Swal.fire({
            icon: 'success',
            text: 'กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันการสมัครสมาชิก',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2800
        }).then(() => {
            window.location.href = "/";
        });
    } else if (response.status === 23000) {
        Swal.fire({
            icon: 'warning',
            text: 'อีเมลนี้ถูกใช้งานแล้ว',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2200,
            didClose: () => {
                $('#btnResetPassword').prop('disabled', false);
            }
        })

    } else {
        Swal.fire({
            icon: 'warning',
            text: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2200,
            didClose: () => {
                $('#btnResetPassword').prop('disabled', false);
            }
        })
    }
}
function setupFormValidationResetPassword(formElement) {
    const validators = {
        notEmpty: message => ({
            validators: {
                notEmpty: { message }
            }
        }),
        stringLength: (min, message) => ({
            validators: {
                stringLength: { min, message }
            }
        }),
        passwordComplexity: message => ({
            validators: {
                regexp: {
                    regexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                    message
                }
            }
        }),
        matchPassword: (message, getValue) => ({
            validators: {
                identical: {
                    compare: getValue,
                    message
                }
            }
        }),
        email: message => ({
            validators: {
                notEmpty: { message },
                emailAddress: {
                    message: 'รูปแบบอีเมลไม่ถูกต้อง'
                }
            }
        }),
        namePattern: message => ({
            validators: {
                notEmpty: { message },
                regexp: {
                    regexp: /^[a-zA-Zก-๏\s]+$/,
                    message: 'ชื่อต้องเป็นตัวอักษรเท่านั้น'
                }
            }
        })
    };

    const validationRules = {
        email: validators.email('กรุณาระบุชื่อผู้ใช้ (Email)'),
        password: {
            ...validators.notEmpty('กรุณากําหนดรหัสผ่านใหม่'),
            ...validators.stringLength(10, 'กรุณาระบุรหัสผ่านอย่างน้อย 10 ตัวอักษร'),
            ...validators.passwordComplexity('รหัสผ่านต้องมีตัวพิมพ์เล็ก, ตัวพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษอย่างน้อยอย่างละ 1 ตัว')
        },
        password_confirmation: {
            ...validators.notEmpty('กรุณายืนยันรหัสผ่านใหม่'),
            ...validators.stringLength(10, 'กรุณาระบุรหัสผ่านอย่างน้อย 10 ตัวอักษร'),
            ...validators.matchPassword('รหัสผ่านไม่ตรงกัน', () => formElement.querySelector('[name="newPassword"]').value)
        }
    };

    return FormValidation.formValidation(formElement, {
        fields: validationRules,
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap5: new FormValidation.plugins.Bootstrap5({
                eleValidClass: '',
                rowSelector: '.mb-3'
            }),
            submitButton: new FormValidation.plugins.SubmitButton(),
            autoFocus: new FormValidation.plugins.AutoFocus()
        }
    });
}
