<aside id="layout-menu" class="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0">
    <div class="container-xxl d-flex h-100">
        <ul class="menu-inner">
            <li class="menu-item {{ $url[0] == 'home' ? 'active' : '' }}">
                <a href="{{ url('/home') }}" class="menu-link">
                    <i class="menu-icon tf-icons bx bx-home-circle"></i>
                    <div data-i18n="หน้าแรก">หน้าแรก</div>
                </a>
            </li>
            @if (Auth::user()->role == 'admin')
                <li class="menu-item {{ $url[0] == 'settings' ? 'active' : '' }}">
                    <a href="javascript:void(0)" class="menu-link menu-toggle">
                        <i class="menu-icon tf-icons bx bxs-cog"></i>
                        <div data-i18n="ตั้งค่า">ตั้งค่า</div>
                    </a>
                    <ul class="menu-sub">
                        <li class="menu-item {{ @$urlSubLink == 'add-shoe-type' ? 'active' : '' }}">
                            <a href="{{ route('shoeType') }}" class="menu-link">
                                <i class='menu-icon tf-icons bx bxs-purchase-tag'></i>
                                <div data-i18n="เพิ่มประเภทรองเท้า">เพิ่มประเภทรองเท้า</div>
                            </a>
                        </li>
                        <li class="menu-item {{ @$urlSubLink == 'add-shoe-brand' ? 'active' : '' }}">
                            <a href="{{ route('shoeBrand') }}" class="menu-link">
                                <i class='menu-icon tf-icons bx bx-list-ul'></i>
                                <div data-i18n="เพิ่มรายการรองเท้า">เพิ่มรายการรองเท้า</div>
                            </a>
                        </li>

                    </ul>
                </li>
            @endif

            <li class="menu-item">
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <a onclick="this.closest('form').submit()" class="menu-link">
                        <i class="menu-icon tf-icons bx bx-log-out"></i>
                        <div data-i18n="ออกจากระบบ"></div>
                    </a>
                </form>
            </li>
        </ul>

    </div>
</aside>
