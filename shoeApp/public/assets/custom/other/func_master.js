var multiplePic;

function handleAjaxSaveResponse(response) {
    let icon, text, timer;
    switch (response.status) {
        case 200:
            icon = 'success';
            text = 'บันทึกข้อมูลสำเร็จ';
            timer = 2500;
            break;
        case '23000':
            icon = 'warning';
            text = 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
            timer = undefined;
            break;
        default:
            icon = 'error';
            text = 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
            timer = undefined;
    }
    Swal.fire({
        icon: icon,
        text: text,
        showConfirmButton: false,
        timer: timer
    });
    if (response.status === 200) {
        reTable();
    }
}

function handleAjaxEditResponse(response) {
    let icon, text, timer;
    switch (response.status) {
        case 200:
            icon = 'success';
            text = 'แก้ไขข้อมูลสำเร็จ';
            timer = 2500;
            break;
        case '23000':
            icon = 'warning';
            text = 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล';
            timer = undefined;
            break;
        default:
            icon = 'error';
            text = 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล';
            timer = undefined;
    }
    Swal.fire({
        icon: icon,
        text: text,
        showConfirmButton: false,
        timer: timer
    });
    if (response.status === 200) {
        reTable();
    }
}

function handleAjaxDeleteResponse(itemId, deleteUrl) {
    Swal.fire({
        text: "ยืนยันการลบข้อมูล",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return postFormData(deleteUrl, itemId)
                .then(response => {
                    if (response.status === 200) {
                        Swal.fire({
                            text: "ลบข้อมูลสำเร็จ",
                            icon: "success",
                            confirmButtonText: "ตกลง",
                        });
                        reTable();
                    } else {
                        throw new Error(response.message);
                    }
                })
                .catch(() => {
                    handleAjaxSaveError();
                });
        },
    });
}

function handleAjaxRestoreResponse(itemId, deleteUrl) {
    Swal.fire({
        text: "ยืนยันการกู้ข้อมูล",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return postFormData(deleteUrl, itemId)
                .then(response => {
                    if (response.status === 200) {
                        Swal.fire({
                            text: "กู้ข้อมูลสำเร็จ",
                            icon: "success",
                            confirmButtonText: "ตกลง",
                        });
                        reTable();
                    } else {
                        throw new Error(response.message);
                    }
                })
                .catch(() => {
                    handleAjaxSaveError();
                });
        },
    });
}

function handleAjaxSaveError(xhr, textStatus, errorThrown) {
    Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
        text: 'โปรดลองอีกครั้งหรือติดต่อผู้ดูแลระบบ',
    });
}

function closeAndResetModal(modalSelector, formSelector, delay = 3000) {
    setTimeout(function () {
        $(modalSelector).modal('hide');

        $(modalSelector).on('hidden.bs.modal', function () {
            $(formSelector).find('input, select').val('').trigger('change');
            $(modalSelector).off('hidden.bs.modal');
        });
    }, delay);
}


function applyBlockUI(selector, options) {
    $(selector).block(options);
}

$(document).on('click', '.btn-form-block-overlay', function () {
    var defaultOptions = {
        message: '<div class="spinner-border text-primary" role="status"></div>',
        timeout: 1000,
        css: {
            backgroundColor: 'transparent',
            border: '0'
        },
        overlayCSS: {
            backgroundColor: '#fff',
            opacity: 0.8
        }
    };

    var formSection = $('.form-block');
    if (formSection.length) {
        applyBlockUI(formSection, defaultOptions);
    }
});

function applyBlockUIOnload(element, show = true) {
    var options = {
        message: '<div class="spinner-border text-primary" role="status"></div>',
        css: {
            backgroundColor: 'transparent',
            border: '0'
        },
        overlayCSS: {
            backgroundColor: '#fff',
            opacity: 0.8
        }
    };

    if (element.length) {
        if (show) {
            element.block(options); // แสดง Block UI
        } else {
            element.unblock(); // ซ่อน Block UI
        }
    }
}


function removeValidationFeedback() {
    $('.fv-plugins-message-container.invalid-feedback').remove();
    $('.is-invalid').removeClass('is-invalid');
}

function postFormData(url, formData) {
    return $.ajax({
        url: url,
        method: "POST",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: formData,
        contentType: false,
        processData: false
    });
}

function showModalWithAjax(modalId, url, select2Selectors) {
    $.ajax({
        url: url,
        method: 'GET',
        success: function (response) {
            $(modalId + ' .modal-dialog').html(response);
            initializeSelectWithModal(select2Selectors, modalId);
            $(modalId).modal('show');

            // ใช้ event เมื่อ modal ถูกแสดง
            $(modalId).on('shown.bs.modal', function () {
                const textareas = document.querySelectorAll(modalId + ' textarea');
                if (textareas.length) {
                    textareas.forEach(textarea => {
                        // กำหนดให้ textarea ขยายตัวตามเนื้อหาที่มีอยู่
                        textarea.style.height = 'auto'; // รีเซ็ตความสูงก่อน
                        textarea.style.height = textarea.scrollHeight + 'px'; // ตั้งความสูงให้เท่ากับ scrollHeight
                        autosize(textarea); // เรียกใช้ autosize
                    });
                } else {
                    // console.log("No textareas found");
                }
            });
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}

function initializeSelectWithModal(selectors, modalId) {
    if (!Array.isArray(selectors)) {
        console.error('initializeSelect2 expects the first argument to be an array of selectors.');
        return;
    }
    if (!modalId || !$(modalId).length) {
        console.error('initializeSelect2 expects a valid modalId as the second argument.');
        return;
    }

    selectors.forEach(function (selector) {
        var $selectElement = $(selector, modalId);
        if ($selectElement.length) {
            $selectElement.select2({
                dropdownParent: $(modalId),
                allowClear: true,
                placeholder: "เลือกข้อมูล"
            });
        } else {
            console.warn('Selector not found:', selector);
        }
    });
}

function clearInputDateModal(modalID, datePickers) {
    const modalElement = document.querySelector(modalID);
    modalElement.addEventListener('show.bs.modal', function () {
        initializeDatePickers(datePickers);
    });

    modalElement.addEventListener('hide.bs.modal', function () {
        datePickers.forEach(function (pickerId) {
            const pickerElement = document.querySelector('#' + pickerId);
            if (pickerElement && pickerElement._flatpickr) {
                pickerElement._flatpickr.destroy();
            }
        });
    });
}

function renderGroupActionButtons(data, type, row, useFunc, disableButtons = false, buttonAction = 'all') {
    // console.log(useFunc)
    const editFunction = `funcEdit${useFunc}`;
    const deleteFunction = `funcDelete${useFunc}`;
    let disableEdit = '';
    let disableDelete = '';
    let classCssEdit = '';
    let classCssDelete = '';

    if (disableButtons) {
        if (buttonAction === 'all' || buttonAction === 'edit') {
            disableEdit = 'disabled';
            classCssEdit = 'd-none';
        }
        if (buttonAction === 'all' || buttonAction === 'delete') {
            disableDelete = 'disabled';
            classCssDelete = 'd-none';
        }
    }

    // if (disableButtons) {
    //     disable = 'disabled';
    // }

    return `
    <button type="button" class="btn btn-icon btn-label-warning btn-warning ${classCssEdit}" ${disableEdit} onclick="${editFunction}('${row.id}')">
        <span class="tf-icons bx bx-edit-alt"></span>
    </button>&nbsp
    <button type="button" class="btn btn-icon btn-label-danger btn-danger ${classCssDelete}" ${disableDelete} onclick="${deleteFunction}('${row.id}')">
        <span class="tf-icons bx bx-trash"></span>
    </button>
`;
}
$(document).ready(function () {
    $('#reTabA, #reTabB, #reTabC, #reTabD, #reTabE, #reTabF, #reTabG').click(reTable);
});
