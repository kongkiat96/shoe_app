$(document).ready(function () {
    $('#btnRegister').on('click', function (e) {
        e.preventDefault();
        const $btn = $(this);
        $btn.prop('disabled', true);
        removeValidationFeedback();
        const form = $("#formRegister")[0];
        const fv = setupFormValidationRegister(form);
        const formData = new FormData(form);

        fv.validate().then(function (status) {
            if (status === 'Valid') {

                postFormData("save-register", formData)
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
                $('#btnRegister').prop('disabled', false);
            }
        })

    } else {
        Swal.fire({
            icon: 'warning',
            text: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2200
        })
    }
}
function setupFormValidationRegister(formElement) {
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
        username: validators.email('กรุณาระบุชื่อผู้ใช้ (Email)'),
        fullname: validators.namePattern('กรุณาระบุชื่อ'),
        newPassword: {
            ...validators.notEmpty('กรุณากําหนดรหัสผ่านใหม่'),
            ...validators.stringLength(10, 'กรุณาระบุรหัสผ่านอย่างน้อย 10 ตัวอักษร'),
            ...validators.passwordComplexity('รหัสผ่านต้องมีตัวพิมพ์เล็ก, ตัวพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษอย่างน้อยอย่างละ 1 ตัว')
        },
        confirmPassword: {
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

const selectedTypeIDs = new Set();

// Filter logic
document.querySelectorAll('.filter-checkbox').forEach(cb => {
    selectedTypeIDs.add(cb.value);

    cb.addEventListener('change', () => {
        if (cb.checked) {
            selectedTypeIDs.add(cb.value);
        } else {
            selectedTypeIDs.delete(cb.value);
        }
        filterShoes();
    });
});

function filterShoes() {
    document.querySelectorAll('.shoe-card').forEach(card => {
        const typeID = card.getAttribute('data-type-id');
        card.style.display = selectedTypeIDs.has(typeID) ? '' : 'none';
    });
}

const btnClearFilter = document.getElementById('btnClearFilter');
let isCleared = false;

btnClearFilter.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.filter-checkbox');

    if (!isCleared) {
        // ล้างทั้งหมด
        selectedTypeIDs.clear();
        checkboxes.forEach(cb => cb.checked = false);
        btnClearFilter.innerHTML = '<i class="fa fa-search-plus"></i> เลือกทั้งหมด';
        btnClearFilter.classList.remove('btn-outline-warning');
        btnClearFilter.classList.add('btn-primary');
        isCleared = true;
    } else {
        // เลือกทั้งหมด
        checkboxes.forEach(cb => {
            cb.checked = true;
            selectedTypeIDs.add(cb.value);
        });
        btnClearFilter.innerHTML = '<i class="fa fa-search-minus"></i> ล้างที่เลือก';
        btnClearFilter.classList.remove('btn-primary');
        btnClearFilter.classList.add('btn-outline-warning');
        isCleared = false;
    }

    filterShoes();
});

function reTable() {

}
