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
            text = 'พบข้อมูลซ้ำในระบบ';
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
            text = 'พบข้อมูลซ้ำในระบบ';
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

function handleAjaxResetPassword(itemId, deleteUrl) {
    Swal.fire({
        text: "ยืนยันการรีเซ็ตรหัสผ่าน",
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
                            text: "รีเซ็ตรหัสผ่านสำเร็จ (P@ssw0rd#@!)",
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

function showModalViewWithAjax(modalId, url, select2Selectors) {
    // console.log(modalId)
    $.ajax({
        url: url,
        method: 'GET',
        success: function (response) {
            $(modalId + ' .modal-dialog').html(response);
            $(modalId + ' input').attr('readonly', true);
            $(modalId + ' select').attr('disabled', true);
            $(modalId + ' textarea').attr('readonly', true);
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
                    console.log("No textareas found");
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

function initializeDatePickers(pickerIds) {
    pickerIds.forEach(function (pickerId) {
        const pickerElement = document.querySelector('#' + pickerId);
        if (pickerElement) {
            pickerElement.flatpickr({
                monthSelectorType: 'static',
                locale: {
                    firstDayOfWeek: 1,
                    weekdays: {
                        shorthand: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
                        longhand: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
                    },
                    months: {
                        shorthand: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
                        longhand: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
                    },
                    rangeSeparator: ' ถึง ',
                    weekAbbreviation: 'สัปดาห์',
                    scrollTitle: 'เลื่อนเพื่อเพิ่ม',
                    toggleTitle: 'คลิกเพื่อสลับ',
                    yearAriaLabel: 'ปี'
                }
            });
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

function renderStatusBadge(data, type, full, row) {
    const statusMap = {
        1: { title: 'กำลังใช้งาน', className: 'bg-label-success' },
        0: { title: 'ปิดการใช้งาน', className: 'bg-label-danger' }
    };
    const status = statusMap[data] || { title: 'Undefined', className: 'bg-label-secondary' };
    return `<span class="badge ${status.className}">${status.title}</span>`;
}

function renderColorTagBadge(color, data) {
    return `<span class="badge" style="background-color: ${color};">${data}</span>`;
}

function renderDeletedBadge(data, type, full, row) {
    const statusMap = {
        0: { title: 'กำลังใช้งาน', className: 'bg-label-success' },
        1: { title: 'ปิดการใช้งาน', className: 'bg-label-danger' }
    };
    const status = statusMap[data] || { title: 'Undefined', className: 'bg-label-secondary' };
    return `<span class="badge ${status.className}">${status.title}</span>`;
}

function renderStatusWorkBadge(data, type, full, row) {
    // console.log(data);
    const statusMap = {
        all: { title: 'ใช้งานทั้งหมด', className: 'bg-label-success' },
        it: { title: 'ใช้งานฝ่าย IT', className: 'bg-label-primary' },
        mt: { title: 'ใช้งานฝ่ายช่าง', className: 'bg-label-danger' },
        cctv: { title: 'ใช้งานสำหรับอนุมัติ CCTV', className: 'bg-label-info' },
        permission: { title: 'ใช้งานสำหรับอนุมัติสิทธิ์', className: 'bg-label-warning' }
        // hr: { title: 'ใช้งานฝ่าย HR', className: 'bg-label-primary' }
    };
    const status = statusMap[data] || { title: 'Undefined', className: 'bg-label-secondary' };
    return `<span class="badge ${status.className}">${status.title}</span>`;
}

function renderStatusShowBadge(data, type, full, row) {
    const statusMap = {
        all: { title: 'แสดงทั้งหมด', className: 'bg-label-success' },
        admin: { title: 'แสดงสําหรับเจ้าหน้าที่', className: 'bg-label-primary' },
        user: { title: 'แสดงสําหรับผู้แจ้ง', className: 'bg-label-warning' },
        // hr: { title: 'ใช้งานฝ่าย HR', className: 'bg-label-primary' }
    };
    const status = statusMap[data] || { title: 'Undefined', className: 'bg-label-secondary' };
    return `<span class="badge ${status.className}">${status.title}</span>`;
}

function renderUserClassBadge(data, type, full, row) {
    const statusMap = {
        // it: { title: 'สังกัด IT', className: 'bg-label-info' },
        // mt: { title: 'สังกัด ช่าง', className: 'bg-label-warning' },
        // hr: { title: 'สังกัด บุคคล', className: 'bg-label-primary' },
        // userOther: { title: 'ผู้ใช้ทั่วไป', className: 'bg-label-danger' }
        SuperAdmin: { title: 'ผู้ดูแลระบบ', className: 'bg-label-danger' },
        Admin: { title: 'เจ้าหน้าที่', className: 'bg-label-warning' },
        User: { title: 'ผู้ใช้งานทั่วไป', className: 'bg-label-info' },
        // Viewer: { title: 'ผู้ใช้งานทั่วไป', className: 'bg-label-info' }
    };
    const status = statusMap[data] || { title: 'Undefined', className: 'bg-label-secondary' };
    return `<span class="badge ${status.className}">${status.title}</span>`;
}

function renderStatusWorkTypeBadge(data, type, full, row) {
    const statusMap = {
        Complete: { title: 'ดำเนินงานเสร็จสิ้น', className: 'bg-label-success' },
        Wating: { title: 'อยู่ระหว่างดำเนินงาน', className: 'bg-label-warning' },
        Hold: { title: 'ระหว่างรอดำเนินการ', className: 'bg-label-warning' },
        Doing: { title: 'กำลังดำเนินงาน', className: 'bg-label-primary' },
        Cancel: { title: 'ยกเลิกงาน / ยกเลิกการแจ้ง', className: 'bg-label-danger' },
        Other: { title: 'อื่น ๆ', className: 'bg-label-info' },
    };
    const status = statusMap[data] || { title: 'Undefined', className: 'bg-label-secondary' };
    return `<span class="badge ${status.className}">${status.title}</span>`;
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

function renderGroupActionButtonsForEmployee(data, type, row, useFunc, disableButtons = false, buttonAction = 'all') {
    // console.log(useFunc)
    const editFunction = `funcEdit${useFunc}`;
    const restoreFunction = `funcRestore${useFunc}`;
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
    <button type="button" class="btn btn-icon btn-label-warning btn-warning ${classCssEdit}" ${disableEdit} onclick="${editFunction}('${row.ID}')">
        <span class="tf-icons bx bx-edit-alt"></span>
    </button>&nbsp
    <button type="button" class="btn btn-icon btn-label-info btn-info ${classCssDelete}" ${disableDelete} onclick="${restoreFunction}('${row.ID}')">
        <span class="tf-icons bx bx-recycle"></span>
    </button>
`;
}

function renderGroupActionButtonsForSearchEmployee(data, type, row, useFunc, disableButtons = false, buttonAction = 'all') {
    // console.log(useFunc)
    const editFunction = `funcEdit${useFunc}`;
    const deleteFunction = `funcDelete${useFunc}`;
    const resetPasswordFunction = `funcResetPassword${useFunc}`;
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
    <button type="button" class="btn btn-icon btn-label-warning btn-warning ${classCssEdit}" ${disableEdit} onclick="${editFunction}('${row.ID}')">
        <span class="tf-icons bx bx-edit-alt"></span>
    </button>&nbsp
        <button type="button" class="btn btn-icon btn-label-danger btn-danger ${classCssDelete}" ${disableDelete} onclick="${deleteFunction}('${row.ID}')">
        <span class="tf-icons bx bx-trash"></span>
    </button>&nbsp
    <button type="button" class="btn btn-icon btn-label-primary btn-primary ${classCssDelete}" ${disableDelete} onclick="${resetPasswordFunction}('${row.ID}')">
        <span class="tf-icons bx bx-key"></span>
    </button>
`;
}

function renderGroupActionButtonsPermission(data, type, row, useFunc, permission) {
    // console.log(permission)
    const editFunction = `funcEdit${useFunc}`;
    const deleteFunction = `funcDelete${useFunc}`;
    const ViewerFunction = `funcView${useFunc}`;

    let returnButton = '';
    const adminRoles = ['SuperAdmin', 'Admin'];

    /*
    <button type="button" class="btn btn-icon btn-label-info btn-info" onclick="${ViewerFunction}(${row.ID})">
            <span class="tf-icons bx bx-search-alt"></span>
        </button>&nbsp
    */
    if (adminRoles.includes(permission)) {
        returnButton = `
        <button type="button" class="btn btn-icon btn-label-warning btn-warning" onclick="${editFunction}(${row.ID})">
            <span class="tf-icons bx bx-edit-alt"></span>
        </button>&nbsp
        <button type="button" class="btn btn-icon btn-label-danger btn-danger" onclick="${deleteFunction}(${row.ID})">
            <span class="tf-icons bx bx-trash"></span>
        </button>
    `;
    } else if (permission === 'User') {
        returnButton = `
        <button type="button" class="btn btn-icon btn-label-info btn-info" onclick="${ViewerFunction}(${row.ID})">
            <span class="tf-icons bx bx-search-alt"></span>
        </button>&nbsp
        <button type="button" class="btn btn-icon btn-label-warning btn-warning" onclick="${editFunction}(${row.ID})">
            <span class="tf-icons bx bx-edit-alt"></span>
        </button>
    `;
    } else if (permission === 'Viewer') {
        returnButton = `
        <button type="button" class="btn btn-icon btn-label-info btn-info" onclick="${ViewerFunction}(${row.ID})">
            <span class="tf-icons bx bx-search-alt"></span>
        </button>
    `;
    }

    return returnButton;
}

function renderGroupActionButtonsCaseCheck(data, type, row, useFunc) {
    // console.log(permission)
    const functionRender = `func${useFunc}`;

    let returnButton = '';
    // returnButton = `
    //     <button type="button" class="btn btn-icon btn-label-success btn-success" onclick="${functionRender}(${row.ID})">
    //         <span class="tf-icons bx bxs-calendar-check"></span>
    //     </button>
    // `;
    returnButton = `
        <button type="button" class="btn btn-label-info btn-info btn-sm" onclick="${functionRender}(${row.ID})">
            ` + row.ticket + `
        </button>
    `;

    return returnButton;
}

function renderGroupActionButtonsSearchMonth(data, type, row, useFunc, tag_search, color, countTotal) {
    // console.log(row.SearchMonth)
    const ViewerFunction = `funcView${useFunc}`;

    let returnButton = `
        <button type="button" class="btn btn-icon btn-label-${color} btn-${color}" onclick="${ViewerFunction}('${row.SearchMonth}','${tag_search}')">
            ${countTotal}
        </button>
    `;

    return returnButton;
}

function renderGroupActionAccessMenuButtons(data, type, row, useFunc) {
    // console.log(data)
    // console.log(type)
    const accessMenuFunction = `func${useFunc}`;
    return `
    <button type="button" class="btn btn-icon btn-label-danger btn-danger" onclick="${accessMenuFunction}('${row.ID}')">
        <span class="tf-icons bx bx-sitemap"></span>
    </button>
`;
}

function mapSelectedCompanyDepartment(disabledElement, selectElement, disableStatus) {
    var originalContent = $(disabledElement).html();
    $(disabledElement).prop('disabled', disableStatus);
    $(selectElement).on('change', function () {
        var companyID = $(this).val();
        var $departmentSelect = $(disabledElement);
        $departmentSelect.prop('disabled', !companyID);

        if (companyID) {
            $.ajax({
                url: '/getMaster/get-department/' + companyID,
                type: 'GET',
                dataType: 'json',
                success: function (departmentsData) {
                    $departmentSelect.empty().append('<option value="">Select</option>');
                    departmentsData.forEach(function (department) {
                        var optionElement = $('<option>').val(department.ID).text(department.departmentName);
                        $departmentSelect.append(optionElement);
                    });

                    $('#groupOfDepartment').prop('disabled', true);
                    $('#groupOfDepartment').empty().append('<option value="">Select</option>');
                    $('#mapIDGroup').val('');
                },
                error: function () {
                    $departmentSelect.html(originalContent);
                }
            });
        } else {
            $('#groupOfDepartment').prop('disabled', true);
            $('#groupOfDepartment').empty().append('<option value="">Select</option>');
            $('#mapIDGroup').val('');
            $departmentSelect.html(originalContent);
            $departmentSelect.empty().append('<option value="">Select</option>');
        }
    });
}

function mapSelectedDepartmentGroup(disabledElement, selectElement, disableStatus) {
    var originalContent = $(disabledElement).html();
    $(disabledElement).prop('disabled', disableStatus);
    $(selectElement).on('change', function () {
        var departmentID = $(this).val();
        var $groupOfDepartmentSelect = $(disabledElement);
        $groupOfDepartmentSelect.prop('disabled', !departmentID);

        if (departmentID) {
            $.ajax({
                url: '/getMaster/get-group/' + departmentID,
                type: 'GET',
                dataType: 'json',
                success: function (groupOfDepData) {
                    $groupOfDepartmentSelect.empty().append('<option value="">Select</option>');
                    groupOfDepData.forEach(function (group) {
                        var optionElement = $('<option>').val(group.ID).text(group.group_name).data('getID', group.ID);
                        $groupOfDepartmentSelect.append(optionElement);
                    });

                    $groupOfDepartmentSelect.on('change', function () {
                        var getID = $(this).find('option:selected').data('getID');
                        $('#mapIDGroup').val(getID);
                    });
                    $('#mapIDGroup').val('');
                },
                error: function () {
                    $groupOfDepartmentSelect.html(originalContent);
                }
            });
        } else {
            $('#mapIDGroup').val('');
            $groupOfDepartmentSelect.html(originalContent);
            $groupOfDepartmentSelect.empty().append('<option value="">Select</option>');
        }
    });
}

function mapSelectedProvince(disabledAumphoe, selectElement, disableStatus) {
    var originalContent = $(disabledAumphoe).html();
    $(disabledAumphoe).prop('disabled', disableStatus);
    $(selectElement).on('change', function () {
        var provinceCode = $(this).val();
        var $aumphoeSelect = $(disabledAumphoe);
        $aumphoeSelect.prop('disabled', !provinceCode);

        if (provinceCode) {
            $.ajax({
                url: '/getMaster/get-amphoe/' + provinceCode,
                type: 'GET',
                dataType: 'json',
                success: function (amphoeData) {
                    $aumphoeSelect.empty().append('<option value="">Select</option>');

                    $('#tambon').prop('disabled', true);
                    $('#tambon').empty().append('<option value="">Select</option>');
                    $('#zipcode').val('');
                    $('#mapIDProvince').val('');

                    amphoeData.forEach(function (amphoe) {
                        var optionElement = $('<option>').val(amphoe.amphoe_code).text(amphoe.amphoe);
                        $aumphoeSelect.append(optionElement);
                    });
                },
                error: function () {
                    $aumphoeSelect.html(originalContent);
                }
            });
        } else {
            $aumphoeSelect.html(originalContent);
            $('#tambon').prop('disabled', true);
            $('#tambon').empty().append('<option value="">Select</option>');
            $('#zipcode').val('');
            $('#mapIDProvince').val('');

            $aumphoeSelect.empty().append('<option value="">Select</option>');
        }
    });
}

function mapSelectedAumphoe(disabledTambon, selectElement, disableStatus) {
    var originalContent = $(disabledTambon).html();
    $(disabledTambon).prop('disabled', disableStatus);
    $(selectElement).on('change', function () {
        var aumphoeCode = $(this).val();
        var $tambonSelect = $(disabledTambon);
        $tambonSelect.prop('disabled', !aumphoeCode);

        if (aumphoeCode) {
            $.ajax({
                url: '/getMaster/get-tambon/' + aumphoeCode,
                type: 'GET',
                dataType: 'json',
                success: function (tambonData) {
                    $tambonSelect.empty().append('<option value="">Select</option>');
                    $('#zipcode').val('');
                    $('#mapIDProvince').val('');

                    tambonData.forEach(function (tambon) {
                        var optionElement = $('<option>').val(tambon.id).text(tambon.tambon).data('zip', tambon.zipcode).data('id', tambon.id);
                        $tambonSelect.append(optionElement);
                    });

                    $tambonSelect.on('change', function () {
                        var selectedZipCode = $(this).find('option:selected').data('zip');
                        var getID = $(this).find('option:selected').data('id');
                        $('#zipcode').val(selectedZipCode);
                        $('#mapIDProvince').val(getID);
                    });
                },
                error: function () {
                    $tambonSelect.html(originalContent);
                }
            });
        } else {
            $tambonSelect.html(originalContent);
            $tambonSelect.empty().append('<option value="">Select</option>');
            $('#zipcode').val('');
            $('#mapIDProvince').val('');
        }
    });
}

function AddPic(inputPicID) {
    (function () {
        const previewTemplate = `
            <div class="dz-preview dz-file-preview">
                <div class="dz-details">
                    <div class="dz-thumbnail">
                        <img data-dz-thumbnail />
                        <span class="dz-nopreview">No preview</span>
                        <div class="dz-success-mark"></div>
                        <div class="dz-error-mark"></div>
                        <div class="dz-error-message"><span data-dz-errormessage></span></div>
                        <div class="progress">
                            <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
                        </div>
                    </div>
                    <div class="dz-filename" data-dz-name></div>
                    <div class="dz-size" data-dz-size></div>
                </div>
            </div>
        `;

        const myDropzone = new Dropzone(inputPicID, {
            previewTemplate: previewTemplate,
            parallelUploads: 1,
            maxFilesize: 2,
            addRemoveLinks: true,
            maxFiles: 1,
            acceptedFiles: 'image/*'
        });
    })();
}

function AddPicMultiple(inputPicID) {
    (function () {
        const previewTemplate = `
            <div class="dz-preview dz-file-preview">
                <div class="dz-details">
                    <div class="dz-thumbnail">
                        <img data-dz-thumbnail />
                        <span class="dz-nopreview">No preview</span>
                        <div class="dz-success-mark"></div>
                        <div class="dz-error-mark"></div>
                        <div class="dz-error-message"><span data-dz-errormessage></span></div>
                        <div class="progress">
                            <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
                        </div>
                    </div>
                    <div class="dz-filename" data-dz-name></div>
                    <div class="dz-size" data-dz-size></div>
                </div>
            </div>
        `;

        multiplePic = new Dropzone(inputPicID, {
            previewTemplate: previewTemplate,
            parallelUploads: 1,
            maxFilesize: 5,
            maxFiles: 5,
            addRemoveLinks: true,
            acceptedFiles: 'image/*'
        });
    })();
}

function resetDropzone() {
    if (multiplePic) {
        multiplePic.removeAllFiles();  // ลบไฟล์ทั้งหมดใน Dropzone
    }
}

function ViewPicEdit(pathPic, inputEditID, tagStatusPicID) {
    // console.log(inputEditID, tagStatusPicID)
    (function () {
        const existingLogo = pathPic;
        const myDropzone = new Dropzone(inputEditID, {
            previewTemplate: `
                <div class="dz-preview dz-file-preview">
                    <div class="dz-details">
                        <div class="dz-thumbnail">
                            <img data-dz-thumbnail />
                            <span class="dz-nopreview">No preview</span>
                            <div class="dz-success-mark"></div>
                            <div class="dz-error-mark"></div>
                            <div class="dz-error-message"><span data-dz-errormessage></span></div>
                            <div class="progress">
                                <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
                            </div>
                        </div>
                        <div class="dz-filename" data-dz-name></div>
                        <div class="dz-size" data-dz-size></div>
                    </div>
                </div>
            `,
            parallelUploads: 1,
            maxFilesize: 2,
            addRemoveLinks: true,
            maxFiles: 1,
            acceptedFiles: 'image/*',
            init: function () {
                const myDropzone = this;

                myDropzone.on("removedfile", function (file) {
                    // เปลี่ยนค่าของ hidden input
                    $(tagStatusPicID).val(0);
                    // Optionally, display a message or perform any additional actions
                    console.log("File removed: ", file);
                });

                myDropzone.on("success", function (file) {
                    // console.log(response, file['dataURL']);
                    $(tagStatusPicID).val(1);
                });
            }
        });

        // If there's an existing logo, display it in the Dropzone
        if (existingLogo) {
            const mockFile = {
                name: existingLogo.split('/').pop(),
                size: 12345
            }; // Use a mock file object
            myDropzone.emit("addedfile", mockFile);
            myDropzone.emit("thumbnail", mockFile, existingLogo); // Use existingLogo for the thumbnail
            myDropzone.emit("complete"); // Mark the upload as complete
        }


    })();
}

$(document).ready(function () {
    $('#reTabA, #reTabB, #reTabC, #reTabD, #reTabE, #reTabF, #reTabG').click(reTable);
});

function mapSelectedCategory(disabledElement, selectElement, disableStatus) {
    var originalContent = $(disabledElement).html();
    $('#category_detail').prop('disabled', true);
    $('#category_detail_edit').prop('disabled', true);
    $('#category_detail_per').prop('disabled', true);

    $(disabledElement).prop('disabled', disableStatus);
    $(selectElement).on('change', function () {
        var categoryMainID = $(this).val();
        var $categoryTypeSelect = $(disabledElement);
        $categoryTypeSelect.prop('disabled', !categoryMainID);

        if (categoryMainID) {
            $.ajax({
                url: '/getMaster/get-category-type/' + categoryMainID,
                type: 'GET',
                dataType: 'json',
                success: function (categoryTypeData) {
                    $categoryTypeSelect.empty().append('<option value="">Select</option>');
                    $('#category_detail').empty().append('<option value="">Select</option>');
                    $('#category_detail_edit').empty().append('<option value="">Select</option>');
                    $('#category_detail_per').empty().append('<option value="">Select</option>');

                    categoryTypeData.forEach(function (categoryType) {
                        var optionElement = $('<option>').val(categoryType.id).text(categoryType.category_type_name);
                        $categoryTypeSelect.append(optionElement);
                    });
                },
                error: function () {
                    $categoryTypeSelect.html(originalContent);
                }
            });
        } else {
            $categoryTypeSelect.html(originalContent);
            $categoryTypeSelect.empty().append('<option value="">Select</option>');

            $('#category_detail').prop('disabled', true);
            $('#category_detail').empty().append('<option value="">Select</option>');

            $('#category_detail_edit').prop('disabled', true);
            $('#category_detail_edit').empty().append('<option value="">Select</option>');

            $('#category_detail_per').prop('disabled', true);
            $('#category_detail_per').empty().append('<option value="">Select</option>');
        }
    });
}

function mapSelectedCategoryDetail(disabledElement, selectElement, disableStatus) {
    var originalContent = $(disabledElement).html();
    $('#category_detail').prop('disabled', true);
    $('#category_detail_edit').prop('disabled', true);
    $('#category_detail_per').prop('disabled', true);

    $(disabledElement).prop('disabled', disableStatus);
    $(selectElement).on('change', function () {
        var categoryTypeID = $(this).val();
        var $categoryDetailSelect = $(disabledElement);
        $categoryDetailSelect.prop('disabled', !categoryTypeID);

        if (categoryTypeID) {
            $.ajax({
                url: '/getMaster/get-category-detail/' + categoryTypeID,
                type: 'GET',
                dataType: 'json',
                success: function (categoryTypeData) {
                    $categoryDetailSelect.empty().append('<option value="">Select</option>');
                    categoryTypeData.forEach(function (categoryType) {
                        var optionElement = $('<option>').val(categoryType.id).text(categoryType.category_detail_name);
                        $categoryDetailSelect.append(optionElement);
                    });
                },
                error: function () {
                    $categoryDetailSelect.html(originalContent);
                }
            });
        } else {
            $categoryDetailSelect.html(originalContent);
            $categoryDetailSelect.empty().append('<option value="">Select</option>');
        }
    });
}

function mapSelectedCategoryItem(disabledElement, selectElement, disableStatus) {
    var originalContent = $(disabledElement).html();
    $('#case_list').prop('disabled', true);

    $(disabledElement).prop('disabled', disableStatus);
    $(selectElement).on('change', function () {
        var categoryItemID = $(this).val();
        var $categoryDetailSelect = $(disabledElement);
        $categoryDetailSelect.prop('disabled', !categoryItemID);

        if (categoryItemID) {
            $.ajax({
                url: '/getMaster/get-category-list/' + categoryItemID,
                type: 'GET',
                dataType: 'json',
                success: function (categoryListData) {
                    $categoryDetailSelect.empty().append('<option value="">Select</option>');
                    $('#sla').val('');
                    categoryListData.forEach(function (categoryList) {
                        var optionElement = $('<option>')
                            .val(categoryList.id)
                            .text(categoryList.category_list_name)
                            .data('sla', categoryList.sla); // กำหนด data-sla
                        $categoryDetailSelect.append(optionElement);
                    });

                    $categoryDetailSelect.on('change', function () {
                        var sla = $(this).find('option:selected').data('sla'); // ดึงค่า data-sla
                        $('#sla').val(sla);
                    });
                },
                error: function () {
                    $categoryDetailSelect.html(originalContent);
                }
            });
        } else {
            $categoryDetailSelect.html(originalContent);
            $categoryDetailSelect.empty().append('<option value="">Select</option>');

            $('#sla').val('');
        }
    });
}


function mapCategoryUseTag(disabledElement, selectElement, disableStatus) {
    var originalContent = $(disabledElement).html();
    $('#category_type').prop('disabled', true);
    $('#category_detail').prop('disabled', true);

    $(disabledElement).prop('disabled', disableStatus);
    $(selectElement).on('change', function () {
        var useTag = $(this).val();
        var $categoryMainSelect = $(disabledElement);
        $categoryMainSelect.prop('disabled', !useTag);

        if (useTag) {
            $.ajax({
                url: '/getMaster/get-category-tag/' + useTag,
                type: 'GET',
                dataType: 'json',
                success: function (categoryMainData) {
                    $categoryMainSelect.empty().append('<option value="">Select</option>');
                    $('#category_type').prop('disabled', true);
                    $('#category_type').empty().append('<option value="">Select</option>');

                    $('#category_detail').prop('disabled', true);
                    $('#category_detail').empty().append('<option value="">Select</option>');

                    categoryMainData.forEach(function (categoryMain) {
                        var optionElement = $('<option>').val(categoryMain.id).text(categoryMain.category_main_name);
                        $categoryMainSelect.append(optionElement);
                    });
                },
                error: function () {
                    $categoryMainSelect.html(originalContent);
                }
            });
        } else {
            $categoryMainSelect.html(originalContent);
            $categoryMainSelect.empty().append('<option value="">Select</option>');

            $('#category_type').prop('disabled', true);
            $('#category_type').empty().append('<option value="">Select</option>');

            $('#category_detail').prop('disabled', true);
            $('#category_detail').empty().append('<option value="">Select</option>');
        }
    });
}

function badgeStatusTagWork(data, type, full, row) {
    const statusTagWork = {
        wait_manager_approve: { title: 'รอการอนุมัติจากผู้บังคับบัญชา', className: 'bg-label-warning' },
        padding: { title: 'รอดำเนินการแก้ไข', className: 'bg-label-info' },
        wait_manager_mt_approve: { title: 'รอการอนุมัติจากฝ่ายช่าง', className: 'bg-label-primary' },
        openCaseWaitApprove: { title: 'แจ้งปัญหาการใช้งาน / รอการอนุมัติจากผู้บังคับบัญชา', className: 'bg-label-warning' },
        wait_manager_it_approve: { title: 'รอการอนุมัติจากฝ่ายไอที', className: 'bg-label-primary' },
        wait_manager_hr_approve: { title: 'รอการอนุมัติจากฝ่าย HR', className: 'bg-label-warning' },

        manager_approve_MT: { title: 'อนุมัติจากผู้บังคับบัญชา / รอการอนุมัติจากฝ่ายช่าง', className: 'bg-label-primary' },
        manager_approve_IT: { title: 'อนุมัติจากผู้บังคับบัญชา / รอการอนุมัติจากฝ่ายไอที', className: 'bg-label-primary' },
        manager_approve_cctv: { title: 'อนุมัติจากผู้บังคับบัญชา / รอการอนุมัติจากฝ่ายไอที', className: 'bg-label-primary' },
        manager_approve_permission: { title: 'อนุมัติจากผู้บังคับบัญชา / รอการอนุมัติจากฝ่าย Hr', className: 'bg-label-primary' },

        manager_mt_approve: { title: 'อนุมัติจากฝ่ายช่าง / รอดำเนินงาน', className: 'bg-label-primary' },
        manager_it_approve: { title: 'อนุมัติจากฝ่ายไอที / รอดำเนินงาน', className: 'bg-label-primary' },
        manager_cctv_approve: { title: 'อนุมัติจากฝ่ายไอที / รอดำเนินงาน', className: 'bg-label-primary' },
        manager_permission_approve: { title: 'อนุมัติจากฝ่าย Hr / รอดำเนินงาน', className: 'bg-label-primary' },

        reject_manager_approve_MT: { title: 'ไม่อนุมัติจากผู้บังคับบัญชา', className: 'bg-label-danger' },
        reject_manager_approve_IT: { title: 'ไม่อนุมัติจากผู้บังคับบัญชา', className: 'bg-label-danger' },

        reject_manager_approve_permission: { title: 'ไม่อนุมัติจากผู้บังคับบัญชา', className: 'bg-label-danger' },
        reject_manager_approve_cctv: { title: 'ไม่อนุมัติจากผู้บังคับบัญชา', className: 'bg-label-danger' },

        reject_manager_mt_approve: { title: 'ไม่อนุมัติจากฝ่ายช่าง', className: 'bg-label-danger' },
        reject_manager_it_approve: { title: 'ไม่อนุมัติจากฝ่ายไอที', className: 'bg-label-danger' },
        reject_manager_cctv_approve: { title: 'ไม่อนุมัติจากฝ่ายไอที', className: 'bg-label-danger' },
        reject_manager_permission_approve: { title: 'ไม่อนุมัติจากฝ่ายไอที', className: 'bg-label-danger' },

        case_success: { title: 'งานเรียบร้อย / ผ่านการตรวจสอบ', className: 'bg-label-success' },
        case_success_user: { title: 'งานเรียบร้อย / ผ่านการตรวจสอบจากผู้แจ้ง', className: 'bg-label-warning' },
        case_reject: { title: 'งานไม่เรียบร้อย / ไม่ผ่านการตรวจสอบ', className: 'bg-label-danger' },

        auto_close_case: { title: 'ปิดงานอัตโนมัติ', className: 'bg-label-secondary' },
        auto_close_case_wait_recheck: { title: 'ผ่านการตรวจสอบงานอัตโนมัติจากระบบ	', className: 'bg-label-warning' },
    };

    if (!statusTagWork[data]) {
        return `<span class="badge bg-label-primary">${data}</span>`;
        // return `<span class="badge" style="background-color: ${statusColor};">${data}</span>`;
    }

    const status = statusTagWork[data] || { title: 'Undefined', className: 'bg-label-secondary' };
    return `<span class="badge ${status.className}">${status.title}</span>`;
}

function fetchCountAndUpdateBadge(url, badgeId) {
    $.ajax({
        url: url, // URL ที่ใช้เรียกข้อมูล
        type: "GET",
        success: function (response) {
            $(`#${badgeId}`).text(response.count);
        },
        error: function (xhr, status, error) {
            console.error(`Error fetching count from ${url}:`, error);
        }
    });
}
function scheduleFetch(url, badgeId, interval) {
    fetchCountAndUpdateBadge(url, badgeId);
    setInterval(() => fetchCountAndUpdateBadge(url, badgeId), interval);
}
