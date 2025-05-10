@extends('layouts.app')

@section('content')
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="{{ url('/home') }}">หน้าแรก</a>
            </li>
            <li class="breadcrumb-item active">{{ $urlName }}</li>
        </ol>
    </nav>
    <hr>
    <div class="modal fade" id="addShoeTypeModal" tabindex="-1" role="dialog" aria-modal="true">
        <div class="modal-dialog modal-lg" role="document">

        </div>
    </div>
    <div class="modal fade" id="editShoeTypeModal" tabindex="-1" role="dialog" aria-modal="true">
        <div class="modal-dialog modal-lg" role="document">

        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="nav-align-top mb-4">
                <ul class="nav nav-pills mb-3" role="tablist">
                    <li class="nav-item">
                        <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab"
                            data-bs-target="#shoeType" aria-controls="#shoeType" aria-selected="true" id="reTabA">
                            ข้อมูลรายการประเภทรองเท้า
                        </button>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="shoeType" role="tabpanel">
                        <div class="inline-spacing text-end">
                            @if (Auth::user()->role == 'admin')
                                <button type="button" class="btn btn-info" id="addShoeType">
                                    <i class='menu-icon tf-icons bx bx-git-repo-forked'></i> เพิ่มข้อมูลรายการประเภทรองเท้า
                                </button>
                            @endif
                        </div>
                        <div class="text-nowrap">
                            <table class="dt-shoeType table table-hover">
                                <thead>
                                    <tr class="text-center">
                                        <th>#</th>
                                        <th>ประเภทรองเท้า</th>
                                        <th>รายละเอียด</th>
                                        <th>สถานะการใช้งาน</th>
                                        <th>วันที่สร้าง</th>
                                        <th>ผู้สร้าง</th>
                                        <th>วันที่แก้ไข</th>
                                        <th>ผู้แก้ไข</th>
                                        <th>จัดการ</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
@section('script')
    <script type="text/javascript"
        src="{{ asset('/assets/custom/settings/shoeType/func_main.js?v=') }}@php echo date("H:i:s") @endphp"></script>
@endsection
