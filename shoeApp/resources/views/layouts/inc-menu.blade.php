<aside id="layout-menu" class="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0">
    <div class="container-xxl d-flex h-100">
        <ul class="menu-inner">
            <li class="menu-item {{ $url[0] == 'home' ? 'active' : '' }}">
                <a href="{{ url('/home') }}" class="menu-link">
                    <i class="menu-icon tf-icons bx bx-home-circle"></i>
                    <div data-i18n="หน้าแรก">หน้าแรก</div>
                </a>
            </li>

            {{-- <li class="menu-item {{ $url[0] == 'table' ? 'active' : '' }}">
                <a href="{{ url('/table') }}" class="menu-link">
                    <i class="menu-icon tf-icons bx bx-home-circle"></i>
                    <div data-i18n="ตารางข้อมูล">ตารางข้อมูล</div>
                </a>
            </li> --}}

            {{-- <li class="menu-item {{ $url[0] == 'employee' ? 'active' : '' }}">
                <a href="javascript:void(0)" class="menu-link menu-toggle">
                    <i class='menu-icon tf-icons bx bxs-user-rectangle'></i>
                    <div data-i18n="ข้อมูลพนักงาน">ข้อมูลพนักงาน</div>
                </a>
                <ul class="menu-sub">
                    <li class="menu-item {{ @$urlSubLink == 'list-all-employee' ? 'active' : '' }}">
                        <a href="{{ url('employee/list-all-employee') }}" class="menu-link">
                            <i class='menu-icon tf-icons bx bxs-user-detail'></i>
                            <div data-i18n="รายการข้อมูลพนักงาน">รายการข้อมูลพนักงาน</div>
                        </a>
                    </li>
                    <li class="menu-item {{ @$urlSubLink == 'add-employee' ? 'active' : '' }}">
                        <a href="{{ url('employee/add-employee') }}" class="menu-link">
                            <i class='menu-icon tf-icons bx bxs-user-plus'></i>
                            <div data-i18n="เพิ่มข้อมูลพนักงาน">เพิ่มข้อมูลพนักงาน</div>
                        </a>
                    </li>
                    <li class="menu-item {{ @$urlSubLink == 'search-all-employee' ? 'active' : '' }}">
                        <a href="{{ url('employee/search-employee') }}" class="menu-link">
                            <i class='menu-icon tf-icons bx bxs-file-find'></i>
                            <div data-i18n="ค้นหาข้อมูลพนักงาน">ค้นหาข้อมูลพนักงาน</div>
                        </a>
                    </li>
                </ul>
            </li> --}}

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
                    <li class="menu-item {{ @$urlSubLink == 'add-shoe' ? 'active' : '' }}">
                        <a href="{{ url('settings/add-shoe') }}" class="menu-link">
                            <i class='menu-icon tf-icons bx bx-list-ul'></i>
                            <div data-i18n="เพิ่มรายการรองเท้า">เพิ่มรายการรองเท้า</div>
                        </a>
                    </li>

                    {{-- <li class="menu-item {{ @$urlSubLink == 'about-company' ? 'active' : '' }}">
                        <a href="{{ url('settings-system/about-company') }}" class="menu-link">
                            <i class='menu-icon tf-icons bx bx-buildings'></i>
                            <div data-i18n="กำหนดค่าภายในองค์กร">กำหนดค่าภายในองค์กร</div>
                        </a>
                    </li>

                    <li class="menu-item {{ @$urlSubLink == 'bank-list' ? 'active' : '' }}">
                        <a href="{{ url('settings-system/bank-list') }}" class="menu-link">
                            <i class='menu-icon tf-icons bx bx-buildings'></i>
                            <div data-i18n="กำหนดรายชื่อธนาคาร">กำหนดรายชื่อธนาคาร</div>
                        </a>
                    </li> --}}

                </ul>


            </li>

            <li class="menu-item">
                {{-- <a href="{{ url('/logout') }}" class="menu-link">
                    <i class="menu-icon tf-icons bx bx-log-out"></i>
                    <div data-i18n="ออกจากระบบ"></div>
                </a> --}}
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <a onclick="this.closest('form').submit()" class="menu-link">
                        <i class="menu-icon tf-icons bx bx-log-out"></i>
                        <div data-i18n="ออกจากระบบ"></div>
                    </a>
                </form>
            </li>
        </ul>




        {{-- <ul class="menu-inner"> --}}
            {{-- <li class="menu-item {{ $url[0] == 'home' ? 'active' : '' }}">
                <a href="{{ url('/home') }}" class="menu-link">
                    <i class="menu-icon tf-icons bx bx-home-circle"></i>
                    <div data-i18n="หน้าแรก">หน้าแรก</div>
                </a>
            </li>
            @foreach ($listMenus as $menuLink => $menuData)
                <li class="menu-item {{ $url[0] == $menuData['main']['menu_link'] ? 'active' : '' }}">
                    <a href="javascript:void(0)" class="menu-link menu-toggle">
                        <i class="menu-icon tf-icons bx {{ $menuData['main']['menu_icon'] }}"></i>
                        <div data-i18n="{{ $menuData['main']['menu_name'] }}">{{ $menuData['main']['menu_name'] }}</div>
                    </a>
                    @if (!empty($menuData['subs']))
                        <ul class="menu-sub w-auto">
                            @foreach ($menuData['subs'] as $subMenu)
                                <li class="menu-item {{ @$urlSubLink == $subMenu['menu_sub_link'] ? 'active' : '' }}">
                                    <a href="{{ url($menuData['main']['menu_link'].'/'.$subMenu['menu_sub_link']) }}" class="menu-link">
                                        <i class="menu-icon tf-icons bx {{ $subMenu['menu_sub_icon'] }}"></i>
                                        <div data-i18n="{{ $subMenu['menu_sub_name'] }}">{{ $subMenu['menu_sub_name'] }}</div>
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    @endif
                </li>
            @endforeach --}}

            {{-- <li class="menu-item">
                <a href="{{ url('/logout') }}" class="menu-link">
                    <i class="menu-icon tf-icons bx bx-log-out"></i>
                    <div data-i18n="ออกจากระบบ"></div>
                </a>
            </li> --}}
        {{-- </ul> --}}

    </div>
</aside>
