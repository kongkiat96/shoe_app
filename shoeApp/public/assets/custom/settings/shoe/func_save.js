$(function () {
    // เมื่อคลิกเพิ่ม card
    $('#add-card').on('click', function () {
        const newCard = $('.card-template .card-block').clone();
        $('#card-container').append(newCard);
        // ใช้ select2 กับ select ที่อยู่ใน card ใหม่
        newCard.find(".kt-select2").select2({
            placeholder: "เลือกข้อมูล",
            allowClear: true,
            width: '100%'
        });
    });

    // เมื่อคลิกลบ card
    $(document).on('click', '.remove-card', function () {
        const card = $(this).closest('.card-block'); // เก็บ element card ที่จะลบ

        Swal.fire({
            text: 'ต้องการลบข้อมูลนี้ใช่หรือไม่',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                card.remove();

                Swal.fire({
                    icon: 'success',
                    text: 'ลบข้อมูลเรียบร้อย',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    });


    // เมื่อคลิกเพิ่มรายการบันทึก
    $(document).on('click', '.add-record', function (e) {
        e.preventDefault();

        const container = $(this).closest('.card, .container, .row'); // Card ปัจจุบัน
        const selectShoeType = container.find('select[name="selectShoeType[]"]').val();
        const errorSpan = container.find('.shoe_type_error_message');

        errorSpan.hide(); // ซ่อน error ก่อน

        if (!selectShoeType) {
            errorSpan.text('*** กรุณาเลือกประเภทรองเท้า').show();
            return;
        }
        const input = `
            <div class="row dynamic-record align-items-end mb-2">

                <div class="col-md-3">
                    <label for="name">ชื่อรองเท้า <span class="text-danger">*</span></label>
                    <input type="text" class="form-control mt-2" name="name[]" placeholder="ชื่อรองเท้า">
                </div>
                <div class="col-md-3">
                    <label for="description">รายละเอียด</label>
                    <textarea name="description[]" rows="1" class="form-control mt-2" autocomplete="off"></textarea>
                </div>
                <div class="col-md-4">
                    <label for="image">image <span class="text-danger">*</span></label>
                    <input type="file" class="form-control mt-2" name="image[]" placeholder="image" accept="image/*">
                </div>

                <div class="col-md-2 text-center">
                    <button type="button" class="btn btn-warning remove-record">
                        <i class="fa fa-trash text-white"></i> ลบรายการ
                    </button>
                </div>
            </div>
        `;
        $(this).closest('.card').find('.record-list').append(input);
    });



    // ลบรายการบันทึก
    $(document).on('click', '.remove-record', function () {
        $(this).closest('.dynamic-record').remove();
    });


    $("#saveAddShoe").on("click", function (e) {
        e.preventDefault();

        let hasError = false;
        $('.error-message').hide();

        const formData = new FormData();

        // วนทุก card-block เพื่อเก็บข้อมูล
        $('.card-block').each(function (index) {
            const card = $(this);
            const shoeTypeID = card.find('select[name="selectShoeType[]"]').val();

            if (!shoeTypeID) {
                card.find('.shoe_type_error_message').text('*** กรุณาเลือกประเภทรองเท้า').show();
                hasError = true;
                return; // ข้าม card นี้
            }

            formData.append(`shoeType[${index}][shoe_type_id]`, shoeTypeID);

            card.find('.dynamic-record').each(function (useIndex) {
                const row = $(this);

                const name = row.find('input[name="name[]"]').val();
                const description = row.find('textarea[name="description[]"]').val();
                // const image = row.find('input[name="image[]"]').val();
                const imageInput = row.find('input[name="image[]"]')[0];
                const imageFile = imageInput?.files?.[0]; // ดึงไฟล์จาก input


                formData.append(`shoeType[${index}][shoe][${useIndex}][name]`, name);
                formData.append(`shoeType[${index}][shoe][${useIndex}][description]`, description);
                formData.append(`shoeType[${index}][shoe][${useIndex}][image]`, imageFile);

            });
        });

        // if (hasError) return;

        // ส่งข้อมูลไปยัง server
        postFormData("save-shoe", formData)
            .done(onSaveShoeSuccess)
            .fail(handleAjaxSaveError);
    });

    $("#btnCancelAddShoe").on("click", function (e) {
        e.preventDefault();

        const hasCards = $('#card-container .card-block').length > 0;

        if (hasCards) {
            Swal.fire({
                text: 'มีข้อมูลที่เพิ่มไว้แล้ว ต้องการย้อนกลับหรือไม่?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก',
                // reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "add-shoe-brand";
                }
            });
        } else {
            window.location.href = "add-shoe-brand";
        }
    });
});

function onSaveShoeSuccess(response) {
    if (response.status === 200) {
        Swal.fire({
            icon: 'success',
            text: 'บันทึกข้อมูลสำเร็จ',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1800
        }).then(() => {
            window.location.href = "add-shoe-brand";
        });
    } else {
        Swal.fire({
            icon: 'warning',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2200
        })
    }
}
