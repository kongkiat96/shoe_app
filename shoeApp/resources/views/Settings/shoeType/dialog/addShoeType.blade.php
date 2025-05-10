<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title">เพิ่มข้อมูลรายการประเภทรองเท้า</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <hr>
    <div class="modal-body pt-0">
        <div class="row g-1">
            <form id="formAddShoeType" class="form-block">
                <div class="row">

                    <div class="col-md-12 mb-3">
                        <label class="form-label-md mb-2" for="name">ประเภทรองเท้า</label>
                        <input type="text" id="name" class="form-control" name="name"
                            autocomplete="off" value=""/>
                    </div>

                    <div class="col-md-12 mb-3">
                        <label class="form-label-md mb-2" for="description">รายละเอียดประเภทรองเท้า</label>
                        <textarea id="description" name="description" rows="3" class="form-control" autocomplete="off"></textarea>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-label-danger" data-bs-dismiss="modal"><i
                class='menu-icon tf-icons bx bx-window-close'></i> ปิด</button>
        <button type="submit" name="saveAddShoeType" id="saveAddShoeType" class="btn btn-success btn-form-block-overlay"><i
                class='menu-icon tf-icons bx bxs-save'></i> บันทึกข้อมูล</button>
    </div>

    <script type="text/javascript" src="{{ asset('/assets/custom/settings/shoeType/func_save.js?v=') }}@php echo date("H:i:s") @endphp"></script>

