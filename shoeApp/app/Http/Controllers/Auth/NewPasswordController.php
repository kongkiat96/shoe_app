<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password as PasswordRule; // Validation rule
use Illuminate\View\View;

class NewPasswordController extends Controller
{
    /**
     * Display the password reset view.
     */
    public function create(Request $request): View
    {
        return view('auth.reset-password', ['request' => $request]);
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => ['required'],
            'email' => ['required', 'email'],
            'password' => [
                'required',
                'confirmed',
                PasswordRule::min(10)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols(),
            ],
        ], [
            'password.required' => 'กรุณากรอกรหัสผ่าน',
            'password.confirmed' => 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน',
            'password.min' => 'รหัสผ่านต้องมีความยาวอย่างน้อย :min ตัวอักษร',
            'password.mixed' => 'รหัสผ่านต้องมีตัวอักษรทั้งพิมพ์เล็กและพิมพ์ใหญ่',
            'password.letters' => 'รหัสผ่านต้องมีตัวอักษรอย่างน้อยหนึ่งตัว',
            'password.numbers' => 'รหัสผ่านต้องมีตัวเลขอย่างน้อยหนึ่งตัว',
            'password.symbols' => 'รหัสผ่านต้องมีอักขระพิเศษอย่างน้อยหนึ่งตัว',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        return $status == Password::PASSWORD_RESET
            ? redirect()->route('login')->with('status', __($status))
            : back()->withInput($request->only('email'))
            ->withErrors(['email' => __($status)]);
    }
}
