'use strict';

$(function () {
    $('.dt-shoeType').DataTable({
        processing: true,
        paging: true,
        pageLength: 50,
        deferRender: true,
        ordering: true,
        lengthChange: true,
        bDestroy: true, // เปลี่ยนเป็น true
        scrollX: true,
        fixedColumns: {
            leftColumns: 2
        },
        language: {
            processing:
                '<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden"></span></div></div>',
        },
        ajax: {
            url: 'get-data-shoe-type',
            type: 'POST',
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                    "content"
                ),
            },
        },
        columns: [
            {
                data: null,
                class: "text-center",
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                },
            },
            { data: "name", class: "text-nowrap" },
            { data: "description", class: "text-nowrap" },
            {
                data: 'status',
                class: "text-center",
                render: function (data, type, row) {
                    const isChecked = data === 'active' ? 'checked' : '';
                    return `
                        <label class="switch switch-success">
                            <input type="checkbox" class="switch-input change-status" data-id="${row.id}" ${isChecked} />
                            <span class="switch-toggle-slider">
                            <span class="switch-on">
                                <i class="bx bx-check"></i>
                            </span>
                            <span class="switch-off">
                                <i class="bx bx-x"></i>
                            </span>
                            </span>
                        </label>
                    `;
                }
            },
            { data: "created_at", class: "text-center" },
            { data: "created_user", class: "text-center" },
            { data: "updated_at", class: "text-center" },
            { data: "updated_user", class: "text-center" },
            {
                data: 'id',
                orderable: false,
                searchable: false,
                class: "text-center",
                render: (data, type, row) => renderGroupActionButtons(data, type, row, 'ShoeType')
            }
        ],
        columnDefs: [
            {
                targets: 0,
            },
        ],
    });
})

$(document).ready(function () {
    $('#addShoeType').click(function () {
        showModalWithAjax('#addShoeTypeModal', 'create-shoe-type', []);
    });
});

function funcEditShoeType(shoeTypeID) {
    // alert(shoeTypeID);
    showModalWithAjax('#editShoeTypeModal', 'show-shoe-type/' + shoeTypeID, []);
}

function funcDeleteShoeType(shoeTypeID) {
    // alert(shoeTypeID)
    handleAjaxDeleteResponse(shoeTypeID, "delete-shoe-type/" + shoeTypeID);
}

function setupFormValidationShoeType(formElement) {
    const validators = {
        notEmpty: message => ({
            validators: {
                notEmpty: { message }
            }
        }),
        notEmptyAndRegexp: (message, regexp) => ({
            validators: {
                notEmpty: { message },
                regexp: { regexp, message: 'ข้อมูลไม่ถูกต้อง' }
            }
        }),
    };

    const validationRules = {
        name: validators.notEmptyAndRegexp('ระบุ ประเภทรองเท้า', /^[a-zA-Z0-9ก-๏\s\(\)\[\]\-\''\/]+$/),
        description: validators.notEmptyAndRegexp('ระบุ รายละเอียด', /^[a-zA-Z0-9ก-๏\s\(\)\[\]\-\''\/]+$/),
    };

    return FormValidation.formValidation(formElement, {
        fields: validationRules,
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap5: new FormValidation.plugins.Bootstrap5({
                eleValidClass: '',
                rowSelector: '.col-md-12'
            }),
            submitButton: new FormValidation.plugins.SubmitButton(),
            autoFocus: new FormValidation.plugins.AutoFocus()
        },
    });
}

$(document).on('change', '.change-status', function () {
    const $checkbox = $(this);
    const shoeTypeID = $checkbox.data('id');
    const newStatus = $checkbox.is(':checked') ? 'active' : 'inactive';
    const isChecked = $checkbox.is(':checked');

    // ตั้งค่าข้อความแสดงผล
    const confirmText = isChecked ? 'คุณต้องการเปิดใช้งานใช่หรือไม่' : 'คุณต้องการปิดใช้งานใช่หรือไม่';

    Swal.fire({
        title: 'ยืนยันการเปลี่ยนสถานะ',
        text: confirmText,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            const formData = new FormData();
            formData.append('id', shoeTypeID);
            formData.append('status', newStatus);

            $.ajax({
                url: "shoe-type-update-status",
                method: "POST",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            text: 'เปลี่ยนสถานะสำเร็จ',
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 1500
                        });
                        reTable(); // reload datatable
                    } else {
                        Swal.fire({
                            icon: 'error',
                            text: 'เกิดข้อผิดพลาด กรุณาลองใหม่',
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 2500
                        });
                        // กลับสถานะ checkbox ให้เหมือนเดิม
                        $checkbox.prop('checked', !isChecked);
                    }

                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        text: 'เกิดข้อผิดพลาด กรุณาลองใหม่',
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 2500
                    });
                    // กลับสถานะ checkbox ให้เหมือนเดิม
                    $checkbox.prop('checked', !isChecked);
                }
            });
        } else {
            // ผู้ใช้กดยกเลิก: กลับสถานะ checkbox
            $checkbox.prop('checked', !isChecked);
        }
    });
});


function reTable() {
    $('.dt-shoeType').DataTable().ajax.reload();
}
