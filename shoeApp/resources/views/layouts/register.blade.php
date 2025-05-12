<!DOCTYPE html>
{{-- <html lang="en" class="light-style" dir="ltr" data-theme="theme-default" data-assets-path="assets/" data-template="horizontal-menu-template"> --}}
<html lang="en" class="light-style" dir="ltr" data-theme="theme-default" data-assets-path="{{ url('assets') }}/"
    data-template="horizontal-menu-template">

<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    {{-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> --}}
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
    <title>{{ config('aboutApp.name') }}</title>

    @include('layouts.inc-stylesheet')
</head>

<body>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
        <div class="layout-container">

            <nav class="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme" id="layout-navbar">
                {{-- <div class="container-fluid"> --}}
                <div class="container-xxl">
                    <div class="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4">
                        <a href="{{ url('/') }}" class="app-brand-link gap-2">
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



                </div>

            </nav>

            <div class="layout-page">

                <div class="content-wrapper">


                    <div class="container-fluid flex-grow-1 container-p-y">
                        <div class="container-xxl">
                            @yield('content')
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Footer -->
    <footer class="content-footer footer bg-footer-theme">
        <div class="container-fluid d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
            <div class="mb-2 mb-md-0">
                © 2025 -
                <script>
                    document.write(new Date().getFullYear());
                </script>
                ,
                <a href="#" target="_blank" class="footer-link fw-bolder">{{ config('aboutApp.name') }}</a>
            </div>
        </div>
    </footer>
    <!-- / Footer -->
    @include('layouts.inc-script')
    @yield('script')
</body>

</html>
