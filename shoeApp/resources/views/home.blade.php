@extends('layouts.app')
@section('content')
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active">
                <a href="{{ url('/home') }}">หน้าแรก</a>
            </li>
        </ol>
    </nav>
    <hr>
    {{-- <div class="row"> --}}
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">เลือก : รองเท้าที่ชอบ</h5>
                <hr>
            </div>
            <div class="card-body">
                <!-- Shoes List -->
                <div class="row">
                    <div class="col-md-3" style="border-right: 2px solid #e0e0e0">
                        <button class="btn btn-sm btn-outline-warning mt-3" id="btnClearFilter"><i
                                class="fa fa-search-minus"></i> ล้างที่เลือก</button>
                        @foreach ($masterShoeType as $key => $value)
                            <div class="form-check form-check-primary mt-3">
                                <input class="form-check-input filter-checkbox" type="checkbox" value="{{ $value->id }}"
                                    id="{{ $value->id }}" checked />
                                <label class="form-check-label" for="{{ $value->id }}">{{ $value->name }}</label>
                            </div>
                        @endforeach
                    </div>

                    <div class="col-md-9">
                        <div class="row">
                            @foreach ($dataShoes as $key => $value)
                                <div class="card mt-3 shoe-card" style="width: 20%;"
                                    data-type-id="{{ $value->shoe_type_id }}">
                                    <div class="card-body ml-2">
                                        <h5 class="card-title">{{ $value->name }}</h5>
                                        <h6 class="card-subtitle text-muted">{{ $value->shoe_type_name }}</h6>
                                        <img class="card-img-top img-fluid w-150 h-150 mt-2"
                                            src="/storage/shoesIMG/{{ $value->image }}" alt="Card image cap">
                                        <p class="card-text">{{ $value->description }}</p>

                                    </div>
                                    <div class="card-footer">
                                        <button class="btn btn-outline-danger btn-sm btn-fav"
                                            data-id="{{ $value->id }}"><i class="fa fa-heart"></i>
                                            เพิ่มรายการที่ชอบ</button>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <hr class="mt-4">
    @if(COUNT($shoeTypeFav) >= 1)
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <div class="row d-flex align-items-center">
                    <div class="col-2">
                        <h5 class="card-title mb-0 text-danger">ประเภทรองเท้าที่ชอบ : </h5>
                    </div>

                    <div class="col-10 text-start">
                        @foreach ($shoeTypeFav as $key => $value)
                        <button type="button" class="btn btn-outline-dribbble btn-sm">{{ $value->shoe_type_name }} </button>
                        @endforeach
                    </div>

                </div>

            </div>
        </div>
    </div>
    @endif
    <div class="col-md-12 mt-2">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="card-title mb-0">รายการ : รองเท้าที่ชอบ</h5>

                <div>
                    <button type="button" class="btn btn-warning me-2" id="btnExportMe" name="btnCancelAddShoe">
                        <i class="fa fa-file-download"></i> Export รายการที่ชอบ
                    </button>
                    @if (Auth::user()->role == 'admin')
                        <button id="btnExportAll" class="btn btn-danger">
                            <i class="fa fa-file-download"></i> Export รายการทั้งหมด (สำหรับเจ้าหน้าที่)
                        </button>
                    @endif
                </div>
            </div>

            <div class="card-body">
                <hr>
                <div id="favouriteContainer">
                    @include('favourite')
                </div>



            </div>
        </div>
    </div>
    {{-- </div> --}}
@endsection
@section('script')
    <script type="text/javascript" src="{{ asset('/assets/custom/home/func_main.js?v=') }}@php echo date("H:i:s") @endphp">
    </script>
@endsection
