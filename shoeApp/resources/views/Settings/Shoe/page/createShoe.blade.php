@extends('layouts.app')

@section('content')
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="{{ url('/home') }}">หน้าแรก</a>
            </li>
            <li class="breadcrumb-item">
                <a href="{{ route('shoeBrand') }}">รายการข้อมูลรองเท้า</a>
            </li>
            <li class="breadcrumb-item active">{{ $urlName }}</li>
        </ol>
    </nav>
    <hr>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header text-end">
                    <div class="row justify-content-end">
                        <div class="col-4">
                            <button type="button" class="btn btn-secondary" id="btnCancelAddShoe"
                                name="btnCancelAddShoe"><i class="fa fa-arrow-left"></i> ย้อนกลับ</button>
                            <!-- ปุ่มเพิ่ม card -->
                            <button id="add-card" class="btn btn-primary"><i class="fa fa-plus"></i>
                                เพิ่มข้อมูลรายการรองเท้า</button>
                        </div>

                    </div>
                </div>

                <div class="card-body">
                    <div id="card-container"></div>
                    <div class="card-template d-none">
                        <div class="card mb-3 p-3 border rounded card-block">
                            <div class="row">
                                <div class="col-12">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label-md mb-2" for="selectShoeType">ประเภทรองเท้า <span class="text-danger">*</span></label>
                                        <select class="form-control kt-select2" name="selectShoeType[]" data-required="true"
                                            data-error="#shoe_type_error_message"
                                            data-message="*** กรุณาเลือกประเภทรองเท้า">
                                            <option value=""></option>
                                            @foreach ($masterShoeType as $key => $value)
                                                <option value="{{ $value->id }}">{{ $value->name }}</option>
                                            @endforeach
                                        </select>
                                        <span class="shoe_type_error_message error-message text-sm text-danger"
                                            style="display: none;"></span>
                                    </div>

                                    <div class="col-md-3 mb-3">
                                        <button class="btn btn-md btn-info add-record">
                                            <i class="fas fa-plus"></i> เพิ่มรายการ
                                        </button>
                                        <button class="btn btn-danger remove-card btn-md"><i class="fa fa-trash"></i>
                                            ลบประเภทรองเท้า</button>
                                    </div>
                                </div>

                            </div>

                            <!-- container สำหรับ list รายการบันทึก -->
                            <div class="record-list"></div>

                        </div>

                    </div>
                </div>
                <div class="card-footer text-center">
                    <button type="submit" name="saveAddShoe" id="saveAddShoe"
                        class="btn btn-success btn-form-block-overlay"><i class='menu-icon tf-icons bx bxs-save'></i>
                        บันทึกข้อมูล</button>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('script')
    <script type="text/javascript"
        src="{{ asset('/assets/custom/settings/shoe/func_save.js?v=') }}@php echo date("H:i:s") @endphp"></script>
@endsection
