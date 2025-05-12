<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title">แก้ไขข้อมูลรายการชื่อรองเท้า</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <hr>
    <div class="modal-body pt-0">
        <div class="row g-1">
            <form id="formEditShoe" class="form-block">
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <label class="form-label-md mb-2" for="shoe_type_id">ประเภทรองเท้า <span class="text-danger">*</span></label>
                        <select id="shoe_type_id" name="shoe_type_id" class="form-select select2" data-allow-clear="true">
                            <option value="">Select</option>
                            @foreach ($masterShoeType as $key => $value)
                                <option value="{{ $value->id }}" @if($dataShoe->shoe_type_id == $value->id) selected @endif>{{ $value->name }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="col-md-12 mb-3">
                        <label class="form-label-md mb-2" for="name">ชื่อรองเท้า <span class="text-danger">*</span></label>
                        <input type="text" id="name" class="form-control" name="name"
                            autocomplete="off" value="{{ $dataShoe->name }}"/>
                    </div>

                    <div class="col-md-12 mb-3">
                        <label class="form-label-md mb-2" for="description">รายละเอียดรองเท้า</label>
                        <textarea id="description" name="description" rows="3" class="form-control" autocomplete="off">{{ $dataShoe->description }}</textarea>
                    </div>

                    <div class="col-md-12 mb-3">
                        <label class="form-label-md mb-2" for="image">รูปภาพรองเท้า <span class="text-danger">*</span></label>
                        <input type="file" id="image" class="form-control" name="image" autocomplete="off" value="" accept="image/*"/>
                    </div>
                </div>
            </form>
        </div>
        <div class="card">
            <div class="row">
                <div class="col-12 text-center">
                    <img class="card-img-top" src="/storage/shoesIMG/{{ $dataShoe->image }}" alt="Card image cap" style="max-width: 50%; height: auto;">
                </div>
            </div>

          </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-label-danger" data-bs-dismiss="modal"><i
                class='menu-icon tf-icons bx bx-window-close'></i> ปิด</button>
            <input type="text" name="shoeID" id="shoeID" value="{{ $decryptID }}" hidden>
        <button type="submit" name="saveEditShoe" id="saveEditShoe" class="btn btn-warning btn-form-block-overlay"><i
                class='menu-icon tf-icons bx bxs-save'></i> บันทึกข้อมูล</button>
    </div>

    <script type="text/javascript" src="{{ asset('/assets/custom/settings/shoe/func_edit.js?v=') }}@php echo date("H:i:s") @endphp"></script>

