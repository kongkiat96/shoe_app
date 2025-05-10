{{-- <div class="container-fluid"> --}}
<div class="container-xxl">
    <div class="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4">
        <a href="{{ url('/home') }}" class="app-brand-link gap-2">
            <span class="app-brand-logo demo">
                <x-application-logo class="w-20 h-20 fill-current text-gray-500" />
            </span>
            <span class="demo menu-text fw-bolder">{{ config('aboutApp.name') }}</span>
        </a>

        <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-xl-none">
            <i class="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
    </div>

    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
            <i class="bx bx-menu bx-sm"></i>
        </a>
    </div>

    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
        <ul class="navbar-nav flex-row align-items-center ms-auto">

            <!-- Style Switcher -->
            <li class="nav-item me-2 me-xl-0">
                <a class="nav-link style-switcher-toggle hide-arrow" href="javascript:void(0);">
                    <i class="bx bx-sm"></i>
                </a>
            </li>
            {{-- {{ dd(config('aboutEmployee.gerAll')->group_name) }} --}}
            <!--/ Style Switcher -->
            <li class="nav-item navbar-dropdown dropdown-user dropdown">
                <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                    <div class="avatar avatar-online">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt class="w-px-40 h-auto rounded-circle" />
                        {{-- @if (config('aboutEmployee.getAll')->img_base == null)
                            <div class="svg-top-right">
                                {!! config('aboutEmployee.imageName') !!}
                            </div>
                        @else
                            <img class="w-px-40 h-px-40 rounded-circle"
                                src="{{ config('aboutEmployee.getAll')->img_base }}" alt="Employee Image" />
                        @endif --}}
                        {{-- <i class="fa fa-user fa-2x pt-1"></i> --}}
                    </div>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <a class="dropdown-item" href="#">
                            <div class="d-flex">
                                <div class="flex-shrink-0 me-3">
                                    <div class="avatar avatar-online">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt class="w-px-40 h-auto rounded-circle" />

                                    </div>
                                </div>
                                <div class="flex-grow-1">
                                        <span class="fw-semibold d-block">{{ Auth::user()->name }}</span>
                                        <small class="text-muted">{{ auth::user()->role }}</small>
                                    {{-- <span
                                        class="fw-semibold d-block">{{ config('aboutEmployee.getAll')->prefix_name . ' ' . config('aboutEmployee.getAll')->first_name . ' ' . config('aboutEmployee.getAll')->last_name }}</span>
                                    @if (config('aboutEmployee.getAll')->user_class == 'SuperAdmin')
                                        <span class="badge bg-label-danger">ผู้ดูแลระบบ</span>
                                    @elseif(config('aboutEmployee.getAll')->user_class == 'Admin')
                                        <span class="badge bg-label-warning">เจ้าหน้าที่</span>
                                    @elseif(config('aboutEmployee.getAll')->user_class == 'user')
                                        <span class="badge bg-label-primary">ผู้บันทึกข้อมูล</span>
                                    @else
                                        <span class="badge bg-label-info">ผู้ใช้งานทั่วไป</span>
                                    @endif --}}
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <div class="dropdown-divider"></div>
                    </li>
                    <li>
                        <a class="dropdown-item" href="{{ url('/my-profile') }}">
                            <i class="bx bx-user me-2"></i>
                            <span class="align-middle">My Profile</span>
                        </a>
                    </li>
                    {{-- <li>
                        <a class="dropdown-item" href="">
                            <i class="bx bx-cog me-2"></i>
                            <span class="align-middle">Settings</span>
                        </a>
                    </li> --}}
                    {{-- <li>
                        <a class="dropdown-item" href="pages-account-settings-billing.html">
                            <span class="d-flex align-items-center align-middle">
                                <i class="flex-shrink-0 bx bx-credit-card me-2"></i>
                                <span class="flex-grow-1 align-middle">Billing</span>
                                <span
                                    class="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                            </span>
                        </a>
                    </li> --}}
                    <li>
                        <div class="dropdown-divider"></div>
                    </li>
                    {{-- <li>
                        <a class="dropdown-item" href="pages-help-center-landing.html">
                            <i class="bx bx-support me-2"></i>
                            <span class="align-middle">Help</span>
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="pages-faq.html">
                            <i class="bx bx-help-circle me-2"></i>
                            <span class="align-middle">FAQ</span>
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="pages-pricing.html">
                            <i class="bx bx-dollar me-2"></i>
                            <span class="align-middle">Pricing</span>
                        </a>
                    </li> --}}
                    {{-- <li>
                        <div class="dropdown-divider"></div>
                    </li> --}}
                    <li>
                        <form action="{{ route('logout') }}" method="POST">
                            @csrf
                            <button type="submit" class="dropdown-item">
                                <i class="bx bx-power-off me-2"></i>
                                <span class="align-middle">Log Out</span>
                            </button>
                        </form>

                    </li>
                </ul>
            </li>
        </ul>
    </div>

</div>
