@extends('layouts.register')
@section('content')
    <div class="col-md-12">
        <div class="row">
            <div class="col-md-4">

                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">สมัครสมาชิก</h4>
                        <hr>
                    </div>
                    <div class="card-body">
                        <form id="formRegister" class="form-block">
                            <div class="mb-3">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label class="form-label-md" for="fullname">ชื่อ <span
                                                class="text-danger">*</span></label>
                                        <input class="form-control" type="text" id="fullname" name="fullname"
                                            placeholder="ชื่อ" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label-md" for="lastName">นามสกุล </label>
                                        <input class="form-control" type="text" id="lastName" name="lastName"
                                            placeholder="นามสกุล" />
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label-md" for="username">ชื่อผู้ใช้ <span class="text-danger">* (Email
                                        ที่ใช้ในการเข้าสู่ระบบ)</span></label>
                                <input class="form-control" type="email" id="username" name="username"
                                    placeholder="ชื่อผู้ใช้" />
                            </div>
                            <div class="mb-3">
                                <div class="mb-3 col-md-12 form-password-toggle">
                                    <label class="form-label-md" for="newPassword">รหัสผ่าน</label>
                                    <div class="input-group input-group-merge">
                                        <input class="form-control" type="password" id="newPassword" name="newPassword"
                                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" />
                                        <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="mb-3 col-md-12 form-password-toggle">
                                    <label class="form-label-md" for="confirmPassword">ยืนยันรหัสผ่าน</label>
                                    <div class="input-group input-group-merge">
                                        <input class="form-control" type="password" name="confirmPassword"
                                            id="confirmPassword"
                                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" />
                                        <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="alert alert-warning" role="alert">
                                <h6 class="alert-heading fw-bold mb-2">คําแนะนําการตั้งรหัสผ่าน</h6>
                                <span>ความยาวขั้นต่ำ 10 ตัวอักษร มีตัวอักษร เล็ก ใหญ่ ตัวเลข และ อักขระพิเศษ
                                    อย่างละตัว</span>
                            </div>
                            <hr>
                            <div class="col-md-12 mb-3">
                                <label class="form-label-md" for="shoeType">รายการประเภทรองเท้าที่ชอบ (เลือกได้มากกว่า 1
                                    รายการ)</label>
                                <div class="row">

                                    @foreach ($masterShoeType as $key => $value)
                                        <div class="col-6">
                                            <div class="form-check form-check-primary mt-3">
                                                <input class="form-check-input" type="checkbox" value="{{ $value->id }}"
                                                    id="{{ $value->name }}" name="shoeType[]" />
                                                <label class="form-check-label"
                                                    for="{{ $value->name }}">{{ $value->name }}</label>
                                            </div>
                                        </div>
                                    @endforeach

                                </div>

                            </div>
                        </form>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary d-grid w-100" type="submit" id="btnRegister">สมัครสมาชิก</button>
                    </div>
                </div>

            </div>

            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">รายการรองเท้าต่าง ๆ</h4>
                        <hr>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3" style="border-right: 2px solid #e0e0e0">
                                <button class="btn btn-sm btn-outline-warning mt-3" id="btnClearFilter"><i
                                        class="fa fa-search-minus"></i> ล้างที่เลือก</button>
                                @foreach ($masterShoeType as $key => $value)
                                    <div class="form-check form-check-primary mt-3">
                                        <input class="form-check-input filter-checkbox" type="checkbox"
                                            value="{{ $value->id }}" id="{{ $value->id }}" checked />
                                        <label class="form-check-label"
                                            for="{{ $value->id }}">{{ $value->name }}</label>
                                    </div>
                                @endforeach
                            </div>

                            <div class="col-md-9">
                                <div class="row justify-content-center">
                                    @foreach ($dataShoes as $key => $value)
                                        <div class="card mt-3 shoe-card" style="width: 30%;"
                                            data-type-id="{{ $value->shoe_type_id }}">
                                            <div class="card-body ml-2">
                                                <h5 class="card-title">{{ $value->name }}</h5>
                                                <h6 class="card-subtitle text-muted">{{ $value->shoe_type_name }}</h6>
                                                <img class="card-img-top img-fluid w-150 h-150 mt-2"
                                                    src="/storage/shoesIMG/{{ $value->image }}" alt="Card image cap">


                                            </div>
                                            <div class="card-footer">
                                                <p class="card-text">{{ $value->description }}</p>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('script')
    <script src="{{ asset('/assets/custom/Register/func_main.js?v=') }}@php echo date("H:i:s") @endphp"></script>
@endsection
