@if (COUNT($dataFavourites) >= 1)
    <div class="row">
        @foreach ($dataFavourites as $key => $value)
            <div class="card mt-3" style="width: 15%;">
                <div class="card-body">
                    <h5 class="card-title">{{ $value->shoe_name }}</h5>
                    <h6 class="card-subtitle text-muted">{{ $value->shoe_type_name }}</h6>
                    <img class="card-img-top img-fluid w-150 h-150 mt-2" src="/storage/shoesIMG/{{ $value->shoe_image }}"
                        alt="Card image cap">
                    <p class="card-text">{{ $value->description }}</p>

                </div>
                <div class="card-footer">
                    <button class="btn btn-outline-warning btn-sm btn-remove-fav" data-id="{{ $value->id }}"><i
                            class="fa fa-trash"></i>
                        ลบรายการที่ชอบ</button>
                </div>
            </div>
        @endforeach
    </div>
@else
<div class="alert alert-warning" role="alert">ยังไม่มีรายการที่ชอบ</div>
@endif
